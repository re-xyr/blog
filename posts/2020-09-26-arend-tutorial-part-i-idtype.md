---
title: Arend 教程，第一部分：4. 相等性
date: Sat Sep 26 2020 10:29:41 GMT+0800 (中国标准时间)
category:
  - 编程语言
  - 类型论
  - Arend
  - 翻译
---

*本文翻译自* [Arend Tutorial, Part I, Equality](https://arend-lang.github.io/documentation/tutorial/PartI/idtype) *，原作者为 [JetBrains Research HoTT and Dependent Types Group (F. Part, V. Isaev and S. Sinchuk)](https://github.com/arend-lang)。原作品在 Apache 2.0 协议下发表。*

在上一章中我们以一种相当粗略的方式对待相等类型，因为我们基本上只用到了自反性 `idp {A : \Type} {a : A} : a = a`。本章中我们会更加深入地讨论相等类型的定义细节，进而解释一些书写更高级的证明所必需的关键概念。具体来讲，我们将会介绍*区间类型* `I`；它的本质是被函数 `coe` （这是 `I` 的*析构器*）决定的。为了描述得清楚一点，我们还会简短介绍一下什么是析构器。

# 对称、传递和 Leibniz 原理

首先我们来证明，相等类型满足相等性的一些基本性质：
- 它是一个等价关系；
- 它满足 Leibniz 原理。

Leibniz 原理就是说，如果 `a` 和 `a'` 满足相同的性质，那么它们就相等。我们可以很容易地证明 `=` 满足这个原理：

```arend
\func Leibniz {A : \Type} {a a' : A}
  (f : \Pi (P : A -> \Type) -> \Sigma (P a -> P a') (P a' -> P a)) : a = a'
  => (f (\lam x => a = x)).1 idp
```

逆 Leibniz 原理（也可以只叫成 Leibniz 原理）是说，如果 `a = a'`，那么 `a` 和 `a'` 必定满足相同的性质。也就是说，如果 `P a` 是真的，那么 `P a'` 也是真的。证明这个东西很简单，但是会用到我们一会儿才会介绍的一些构造：

```arend
\func transport {A : \Type} (B : A -> \Type) {a a' : A} (p : a = a') (b : B a) : B a'
    => coe (\lam i => B (p @ i)) b right
```

通过逆 Leibniz 原理，我们可以很容易地证明 `=` 满足几乎所有相等性的性质。比如说，我们可以证明：

```arend
-- symmetry
\func inv {A : \Type} {a a' : A} (p : a = a') : a' = a
    => transport (\lam x => x = a) p idp

-- transitivity
\func trans {A : \Type} {a a' a'' : A} (p : a = a') (q : a' = a'') : a = a''
    => transport (\lam x => a = x) q p

-- congruence
\func pmap {A B : \Type} (f : A -> B) {a a' : A} (p : a = a') : f a = f a'
    => transport (\lam x => f a = f x) p idp
```

> 练习 1：用 `transport` 定义接受两个参数的函数的合同性。你也可以利用其他任何通过 `transport` 定义出的函数。

> 练习 2：证明用 `pmap` 和 `repl` 可以定义出 `transport`，反之亦然。函数 `repl` 就是说，如果两个类型相等，那么它们之间有一个函数。

# `=` 的定义

相等类型的一个重要部分是 Prelude 里的*区间类型* `I`。你可能会觉得 `I` 看起来像个只有两个元素 `left` 和 `right` 的数据类型，但是你错了。这些构造器通过 `coe` 被定义成了相等的。而且我们（理所应当地）禁止在 `I` 上进行模式匹配，不然的话我们就可以证明 `Empty = Unit` 了。

`left = right` 这个相等性蕴涵了这样一个事实：某个 `a : A` 和 `a' : A` 相等，当且仅当存在一个函数 `f : I -> A` 使得 `f left ==> a` 而且 `f right ==> a'`（`==>` 代表计算相等性）。

> （译注：这是因为，我们可以把 `pmap f` 应用到 `left = right` 上，进而得到 `a = a'`。）

类型 `a = {A} a'` 事实上就是所有这种函数的类型。构造器 `path (f : I -> A) : f left = f right` 可以用来从这种函数中构造相等性的证明，而函数 `@ (p : a = a') (i : I) : A` 可以做相反的事情：

```arend
path f @ i ==> f i -- beta 等价性
path (\lam i => p @ i) ==> p -- eta 等价性
```

要证明自反性 `idp` 的话我们只需要常量函数 `\lam _ => a : I -> A`：

```arend
\func idp {A : \Type} {a : A} : a = a => path (\lam _ => a)
```

> 练习 3：不用 `transport` 和 `coe` 来证明 `left = right`。

如果 `f : A -> B` 并且 `g : I -> A`，那么 `g` 就是相等性 `g left = g right` 的证明，而 `pmap` 可以理解成 `f` 和 `g` 的复合函数。注意到这两点之后，我们就可以用另一种方法定义 `pmap`：

```arend
\func pmap {A B : \Type} (f : A -> B) {a a' : A} (p : a = a') : f a = f a'
    => path (\lam i => f (p @ i))
```

这种 `pmap` 在计算的性质上比其他 `pmap` 表现更好。比如说，`pmap id` 可以直接被计算成 `id`，而 `pmap (f . g)` 会直接被计算成 `pmap f . pmap g`（`.` 是函数复合）：

```arend
\func pmap-idp {A : \Type} {a a' : A} (p : a = a') : pmap {A} (\lam x => x) p = p
    => idp
```

> 练习 4：不用 `transport` 证明 `a = {A} a'` 与 `b = {B} b'` 蕴涵了 `(a, b) = {\Sigma A B} (a', b')`。

> 练习 5：不用 `transport` 证明 `p = {\Sigma (x : A) (B x)} p'` 蕴涵了 `p.1 = {A} p'.1`。

# 函数外延性

函数外延性就是说，如果对于任何值，`f` 和 `g` 应用后的结果都相同，那么它们就是相等的函数。用我们定义的相等性来证明这条原理非常简单：

```arend
\func funExt {A : \Type} (B : A -> \Type) {f g : \Pi (a : A) -> B a}
    (p : \Pi (a : A) -> f a = g a) : f = g
    => path (\lam i => \lam a => p a @ i)
```

这条原理在其他很多内涵类型论里都没法证明。那些理论中函数的外延性是作为一条公理引入的，而公理是一个没有具体实现的函数。然而，向理论里添加公理会损害它的计算性质。比如说，如果我们添加排中律 `lem` 作为一条公理，那么我们就可以定义一个没法归约到任何自然数的常数 `ugly_num`：

```arend
\func lem : \Pi (X : \Type) -> Either X (X -> Empty) => {?}
\func ugly_num : Nat => \case lem Nat \with { | Left => 0 | Right => 1 }
```

> 练习 6：证明 `(\lam x => not (not x)) = (\lam x => x)`。
>
# 析构器

对于一个数据类型 `D`，它的消去原理定义了我们在构造一个从 `D` 到其他依赖或不依赖于 `D` 的类型的函数时需要提供哪种数据。更重要的是，这些原理表明了，如果我们可以说明如何把 `D` 的『生成器』（也就是构造器）映射到类型 `A`，那么我们就可以唯一确定一个函数 `D -> A`。比方说，`Nat` 和 `Bool` 的析构器：

```arend
-- Nat 的依赖析构器（归纳法）。
\func Nat-elim (P : Nat -> \Type)
               (z : P zero)
               (s : \Pi (n : Nat) -> P n -> P (suc n))
               (x : Nat) : P x \elim x
  | zero => z
  | suc n => s n (Nat-elim P z s n)

-- Nat 的非依赖析构器（递归）。
\func Nat-rec (P : \Type)
              (z : P)
              (s : Nat -> P -> P)
              (x : Nat) : P \elim x
  | zero => z
  | suc n => s n (Nat-rec P z s n)

-- Bool 的依赖析构器（也就是 `if`）。
\func Bool-elim (P : Bool -> \Type)
                (t : P true)
                (f : P false)
                (x : Bool) : P x \elim x
  | true => t
  | false => f
```

> 练习 7：不用递归和模式匹配，而用 `Nat-rec` 定义阶乘。

> 练习 8：不用递归和模式匹配，而用 `Nat-elim` 证明 `Nat.+` 的结合律。

> 练习 9：定义 `\data D | con1 Nat | con2 D D | con3 (Nat -> D)` 的递归器和析构器。（译注：『析构器』指的是依赖析构器，『递归器』指的是非依赖的析构器。）

> 练习 10：定义 `List` 的递归器和析构器。

而 `coe` 就定义了 `I` 的依赖析构器，也就是说对于某个 `P : I -> \Type`，如果我们要定义 `f : \Pi (i : I) -> P i` 的话，给出 `f left` 就足够了：

```arend
\func coe (P : I -> \Type)
          (a : P left)
          (i : I) : P i \elim i
  | left => a
```

> 练习 11：我们用 `coe` 定义了 `transport`。我们还可以用 `transport` 定义 `coe` 的一个特殊情况。用 `transport` 定义 `coe0 (A : I -> \Type) (a : A left) : A right`，并思考是否反之亦然。

> 练习 12：定义一个函数 `B right -> B left`。

# `left = right`

通过 `coe` 我们可以证明，`I` 只有一个元素：

```arend
\func left=i (i : I) : left = i
  -- | left => idp
  => coe (\lam i => left = i) idp i

-- 特别地，left = right。
\func left=right : left = right => left=i right
```

# `coe` 和 `transport`

函数 `coe` 和 `transport` 紧密相关。回忆一下，本章中 `transport` 的定义是：

```arend
\func transport {A : \Type} (B : A -> \Type) {a a' : A} (p : a = a') (b : B a) : B a'
     => coe (\lam i => B (p @ i)) b right
```

令 `B'` 表示 `\lam i => B (p @ i)`。于是 `B' : I -> \Type`，`B' left ==> B a`，`B' right ==> B a'` 并且 `\lam x => coe B' x right : B' left -> B' right`。

# 不等性的证明

要证明 `true` 不等于 `false`，我们可以定义一个函数 `T : Bool -> \Type` 使得 `T true` 是单元类型而 `T false` 是空类型。接着我们可以很容易通过 `true = false` 用 `transport` 推导出矛盾：

```arend
\func true/=false (p : true = false) : Empty => transport T p unit
```

注意我们不可能通过这个证明 `left` 不等于 `right`，因为我们不能对 `I` 归纳定义 `T`：

```arend
-- 这个函数没法通过类型检查
\func TI (b : I)
  | left => \Sigma
  | right => Empty
```

> 练习 13：证明 `0` 不等于 `suc x`。

> 练习 14：证明 `fac` 不等于 `suc`。
