---
title: Akyuu's Untouched Score
date: Sun Dec 13 2020 19:19:22 GMT+0800 (GMT+08:00)
category:
  - 编程语言
---

我记得我在某个地方说过，如果我更新了我的博客，那么要么那是一篇翻译，要么我正在犯中二。这篇博客讲的是我在实现依赖类型语言时的一些碎片。按照前文，这也是一种中二。我莫名地感觉标题很切合「Implementation Notes」这个主题，因此就用了它。

需要注意的是，本文讲的不是「实现依赖类型的通用方法」，而是包含了我自己的意见在里面。

我计划按照这个顺序进行实现，实现完成的会被划掉。

- 基本的依赖类型：Pi 和 Sigma。
- 归纳类型，包括 GADT。
- 余归纳类型，也就是 records。
- Cubical type theory。
- Typeclass。
- 模块系统。
- 编译到后端。
- 添加「不安全的」部分：IO、ST，诸如此类。

# Concrete Terms

Concrete terms 就是还没有被 tyck 的 terms。在 tyck 之前，这些 terms 会被 desugar 然后 resolve names。

我们有 concrete 的语句，也有 concrete 的表达式。

```haskell
data Stmt param
  = Def (Def param) 
  deriving (Show, Eq)

data Def param
  = Fn Ref param Ex Ex
  deriving (Show, Eq)

data Ex
  = Telescopic DtKind [Tele] Ex -- sugar, prec 0
  | Arr Ex Ex -- sugar, prec 1
  | App Ex Ex -- prec 2
  | Proj Ex Integer -- prec 3
  | Tup Ex Ex -- self-bracketed
  | Var Ref -- unitary
  | Infer -- unitary
  | Parametric DtKind Param Ex -- not appearing in parsing
  deriving (Show, Eq)
```

# Desugar

Syntactic sugar 指的是一些能够直接 syntactically 地检测出来并转回基本格式的语法 shortcuts。这个检测并转回去的过程叫做 Desugar。

## Tele to Param

不知道为什么，依赖类型语言似乎有一个统一的表达「参数」的方法，叫做 telescope。它的格式大概像这样：

```
(a b c : A) or (a b c) -- 显式参数
{a b c : A} or {a b c} -- 隐式参数
```

用最为接近语法的表达方式，就是下面这样：

```haskell
data Tele
  = Tele Explicity [Ref] Ex
  deriving (Show, Eq)
```

但是这样并不如下面这种「一个变量占一个」的定义好用：

```haskell
data Param
  = Param Explicity Ex Ref
  deriving (Show, Eq)
```

因此我们需要写一个 desugar pass 将所有表达式里的 `Tele` 拆成 `Param` 并展开：`\Sigma (a b : A) ** B ==> \Sigma (a : A) ** \Sigma (b : A) ** B`。这是一个很 trivial 的 pass，不展开讨论。

```haskell
-- Transfrom [Tele] to Param chain
desugarEx (Telescopic kind [] x) = desugarEx x
desugarEx (Telescopic kind (Tele ex [] ty : ts) x) = desugarEx (Telescopic kind ts x)
desugarEx (Telescopic kind (Tele ex (nm : ns) ty : ts) x) = Parametric kind (Param ex (desugarEx ty) nm) (desugarEx (Telescopic kind (Tele ex ns ty : ts) x))
```

这样拆还有一个好处，就是我们不会有**真正的** n 元组（n > 2），因为「三元组」 `\Sigma (a b : A) ** B` 被转换为了「第二个元素是二元组的二元组」 `\Sigma (a : A) ** \Sigma (b : A) ** B`。

## Flat Tuples

我们又遇到了另一个问题，那就是需要将 `(a, b, c)` 翻译成 `(a, (b, c))`。这个 pass 也比较 trivial，我倾向于在 parse 时直接解决掉。

```haskell
tup <- rule \$ parens tupInner
tupInner <- rule \$ Tup
  <\$> ex0 <* (token Comma) <*> (tupInner <|> ex0)
```

## Arrow to Pi

最后还需要将 `A -> B` 翻译成 `\Pi (_ : A) -> B`。这个也很 trivial。

```haskell
-- Translate Arr to Pi
desugarEx (Arr a b) = desugarEx (Parametric Pi (Param Explicit a Ignore) b)
```

# Resolve Names

Resolve names 是这样一个过程：它确保 term 里相同的变量用相同的东西表示，不同的变量用不同的东西表示。

```haskell
type Ident = T.Text
type Uid = Int

data Ref
  = Res Uid
  | Unres Ident
  | Ignore
  deriving (Show, Eq)
```

`Unres Ident` 就是 resolve 前的变量，它就是用户在代码里所写的名字。`Res Uid` 是 resolve 后的变量。你可能以为他是 de Bruijn indices，但你错了。这是一个 UID，在全局下都不会有其他的变量与它重复。这样处理是最为简单的。举个例子，

```
\lam a => \lam b => \lam a => a b
```

会被 resolve 为下面这样。

```
\lam 0 => \lam 1 => \lam 2 => 2 1
```

Local names 和 global names 在 resolve 中是分开存储在两张表里面的：

```haskell
data ResolveTable = ResolveTable
  { locals :: Map.HashMap Ident [Uid]
  , globals :: Map.HashMap Ident (Uid, Def [Param])
  }
```

因为 locals 并没有实际的身体，但是 globals 有；所以一个是 `Uid` 而一个是 `(Uid, Def)`。更重要的是，globals 不能重名，而 locals 可以互相覆盖（shadow）；所以一个是 list 而另一个不是。

```haskell
resolveEx :: Ex -> Resolve Ex
resolveEx (App f x) = App <\$> resolveEx f <*> resolveEx x
resolveEx (Tup x y) = Tup <\$> resolveEx x <*> resolveEx y
resolveEx (Parametric kind (Param ex ty (Unres nm)) x) =
  (\ty i x -> Parametric kind (Param ex ty (Res i)) x)
    <\$> resolveEx ty <*> putLocal nm <*> resolveEx x <* dropLocal nm
resolveEx (Proj x ix) = flip Proj ix <\$> resolveEx x
resolveEx (Var (Unres nm)) = Var . Res <\$> getEnt nm
resolveEx Infer = pure Infer
resolveEx _ = error "Impossible: Sugared expression. Should not happen"
```

Applicative 风格总是那么精炼。

# Tyck Order

在 Haskell 中，函数可以忽略定义的顺序任意互相引用。这不难，因为 Haskell 没有 terck。

在 Agda 中，函数只能引用之前定义过的函数。这是因为 Agda 有 terck，是按定义顺序一个一个检查的，我们只敢引用 terck 过的函数。

**但是**，我们事实上也可以在有 terck 的语言中允许函数任意互相引用；我们只需要应用一点 trick 并且排除一些情况。

<SectionUnfinished />

<ArticleUnfinished />
