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
type Prog param var = [Stmt param var]

data Stmt param var
  = DefFn var (param var) (Ex param var) (Ex param var)
  deriving (Show, Eq)

data Ex param var
  = Arr (Ex param var) (Ex param var)
  | App (Ex param var) (Ex param var)
  | Tup [Ex param var]
  | Lam (param var) (Ex param var)
  | Sigma (param var) (Ex param var)
  | Pi (param var) (Ex param var)
  | Proj (Ex param var) Integer
  | Var var
  | Infer
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
data Tele var
  = Tele Explicity [var] (Ex Teles var)
  deriving (Show, Eq)
```

但是这样并不如下面这种定义好用：

```haskell
data Param var
  = Param Explicity (Ex Params var) var
  deriving (Show, Eq)
```

因此我们需要写一个 desugar pass 将所有的 `Tele` 拆成 `Param`：`Prog Teles Ident -> Prog Params Ident`。这是一个很 trivial 的 pass，不展开讨论。

# Resolve Names

Resolve names 是这样一个过程：它确保 term 里相同的变量用相同的东西表示，不同的变量用不同的东西表示。

```haskell
type Ident = Text
type Ref = Int
```

`Ident` 就是 resolve 前的变量，它就是用户在代码里所写的名字。`Ref` 是 resolve 后的变量。你可能以为他是 de Bruijn indices，但你错了。这是一个 UID，在全局下都不会有其他的变量与它重复。这样处理是最为简单的。在我们当前的语言下，这个过程的签名是 `Prog Params Ident -> Prog Params Ref`。举个例子，

```
\lam a => \lam b => \lam a => a b
```

会被 resolve 为下面这样。

```
\lam 0 => \lam 1 => \lam 2 => 2 1
```

<ArticleUnfinished />
