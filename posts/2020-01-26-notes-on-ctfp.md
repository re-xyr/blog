---
title: 学范畴论（或许吧）
description: 学不会的
author: t532
date: Sun Jan 26 2020 19:38:09 GMT+0800 (GMT+08:00)
category:
    - FP
    - 数学
    - 新知
---

# 学范畴论（或许吧）

不是非常严谨，不是形式化表述。刚开始学，持续更新。

我的抽象思维非常差，所以例子基本上都举在 $\bf Set$ 上。

前置知识：集合论基本概念、群论基本概念、基础 Haskell、小学数学。

函数应用不加括号，即 $fx = f(x)$。有时候通过问号 $?$ 标记 Holes。

> **参考**
> 
> 1. [*Category Theory for Programmers*, Bartosz Milewski](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)
> 2. [Wikipedia](https://wikipedia.org)
> 3. [*Grokking Monad*, 欧阳继超](https://blog.oyanglul.us/grokking-monad/part1)
> 4. [*Categories for the Working Mathematician*, Saunders Mac Lane](https://www.maths.ed.ac.uk/~aar/papers/maclanecat.pdf)

## 范畴（Category）$\mathcal C, ...$

范畴是由物件和态射组成的数学结构。

范畴可以通过交换图表表示，它看上去像一张有向图，但箭头走向遵循范畴的规则。

范畴一般通过手写大写字母或粗斜体大写字母表示，一些熟知（well-known）的范畴用粗体大写单词（缩写）表示。

## 物件（Object）$A, B, ...$ 及其集合（ob- 集合） ${\rm ob}\mathcal C$

物件...就是物件。它是一个抽象的概念。

物件一般通过斜体大写字母表示。

记号 ${\rm ob}\mathcal C$ 表示了范畴 $\mathcal C$ 的物件的集合（其实是类；这里为了简略省去）。

## 态射（Morphism）$f: A \to B, ...$ 及其集合（hom- 集合） ${\rm hom}\mathcal C$

态射代表了一种关系。它也是一个抽象的概念。

态射又被叫做箭头（Arrow）。

记号 $f : A \to B$ 表达了从物件 $A$ 到物件 $B$ 的态射 $f$，表述中称为 $f$。态射一般通过斜体小写字母表示。

记号 $\rm hom\mathcal C$ 表示了范畴 $\mathcal C$ 的态射的集合。

## 两个物件之间的态射集合（hom- 集合） $\mathcal CAB, ...$

记号 $\mathcal CAB$（有时表示为 ${\rm hom}_{\mathcal C}AB$）是范畴 $\mathcal C$ 内从 $A$ 至 $B$ 的态射类。

## 集合范畴 $\bf Set$

熟知的 ${\bf Set}$ 是所有集合组成的范畴。物件就是集合，态射就是函数（必定是全射）。

## 元范畴 ${\bf Cat}$

熟知的 ${\bf Cat}$ 是所有小范畴（小范畴是这样一类范畴，它们的态射类和物件类都是集合）组成的范畴。物件就是范畴，态射就是函子（后面会详细提到）。

## 伪范畴 ${\bf Hask}$

${\bf Hask}$ 不是一个真正的范畴，但在许多情况下可以当作真正的范畴对待。它与 ${\bf Set}$ 在许多方面相似。它是 Haskell 语言的类型系统所在的伪范畴。这也就是说，Haskell 语言中不存在比 ${\bf Hask}$ 更“大”的（伪）范畴。它的物件是某种类型的所有值的集合，态射就是函数。

## 组合（Composition）$g \circ f$

一个范畴内，若存在态射 $f : A \to B$ 以及态射 $g: B \to C$ ，则必定存在态射 $g \circ f: A \to C$。

代入 ${\bf Set}$ 去理解，存在 $(g \circ f) x = g (f x)$。

## 恒等（Identity）态射 ${\rm id}_B$

一个范畴内，对于任何一个物件 $B$ 存在一个态射 ${\rm id}_B: B \to B$ 使得任何态射与它组合的结果仍是那个态射。

即对于任何 $f: A \to B$ 存在 ${\rm id}_B \circ f = f$，且对于任何 $g: B \to C$ 存在 $g \circ {\rm id}_B = g$。

代入 ${\bf Set}$ 去理解，这个态射就是一个函数 $x \mapsto x$。

恒等态射是一个平凡的自同构（后面会看到）。

## 同构（Isomorphism）

同构（Isomorphism）是一组态射 $\lang f: X \to Y, g: Y \to X \rang$，满足 $g \circ f = {\rm id}_X$ 且 $f \circ g = {\rm id}_Y$。

两个物件是同构的（Isomorphic），当它们之间通过一组同构连接。

代入 ${\bf Set}$ 去理解，一组同构是一组对偶的双射。

同构是相等关系的推广。

## 泛构造（Universal Construction）

泛构造是一类同构下唯一（但不一定存在）的构造，它们拥有的性质叫做泛性质。

### 始物件（Initial Object）和终物件（Terminal Object）

一个范畴内的始物件 $S$ 可以近似理解为图的一个超级源点。定义上，从 $S$ 到范畴的所有物件有且仅有一个态射。一个范畴内的始物件是唯一的，但不一定存在（为什么）。

一个范畴内的终物件 $T$ 可以近似理解为图的一个超级汇点。定义上，从范畴的所有物件到 $T$ 有且仅有一个态射。一个范畴内的终物件是唯一的，但不一定存在。

这两个概念互为对偶，也就是（不严谨地）它们在同构意义上相等。

### 积（Product）与余积（Coproduct）

一个范畴里，任意两个物件 $A$、$B$ 的积是这样一个物件 $A \times B$，存在 $f: A \times B \to A$、$g: A \times B \to B$ 使得对于其他任何物件 $C$ 存在 $p: C \to A$、$q: C\to B$，总有态射 $m: C \to A \times B$ 使得 $p = m \circ f$、$q = m \circ g$。

代入 ${\bf Set}$ 去理解，任意两个集合 $A$、$B$ 的积是它们的笛卡尔积（Cartesian product） $A \times B$（想一想，为什么），它包含了所有有序对 $\lang A, B \rang$ 当 $a \in A$、$b \in B$。

一个范畴里，任意两个物件 $A$、$B$ 的余积（或称作范畴意义下的和，categorical sum）是这样一个物件 $A \oplus B$（或记作 $A \coprod B$)，存在 $f: A \to A \oplus B$、$g: B \to A \oplus B$ 使得对于其他任何物件 $C$ 存在 $p: A \to C$、$q: B \to C$，总有态射 $n: A \oplus B \to C$ 使得 $p = f \circ n$、$q = g \circ n$。

代入 ${\bf Set}$ 去理解，任意两个集合 $A$、$B$ 的余积是它们的并 $A \cup B$（想一想，为什么）。

### 幂（Exponential Object）

> 注意：Milewski 在 CTfP 里把这个泛构造叫做函数物件（Function Object），我不知道这不是不是一个广泛应用的名字。

两个物件 $A$、$B$ 的幂是这样一个物件 $B^A$ ，它有一个态射 ${\rm eval}: B^A \times A \to B$ 使得对于其他形如 $f: F \times A \to B$ 的态射，均有态射 $m: F \to B ^ A$，使得 $f = {\rm eval} \circ (m \times {\rm id}_A)$。

在 $\bf Set$ 里，这个物件总是存在，它就是 ${\bf Set}AB$（为什么？尝试把 $\bf Hask$ 代入到 $\bf Set$ 想一想）。

## 幺半范畴（Monoidal Category）

一些范畴是幺半范畴，也就是说它们的物件与某个运算 $*$ 构成一个幺半群（不严谨）。

举个例子，${\bf Set}$ 就是一个幺半范畴：

- $\lang {\rm ob}{\bf Set}, \times \rang$ 构成一个幺半群，其中幺元为仅有一个元素的集合 $\mathbb{S}$。它还有一个零元，即空集 $\varnothing$（想一想，为什么）。
- $\lang {\rm ob}{\bf Set}, \oplus \rang$ 构成一个幺半群，其中幺元为空集 $\varnothing$。

## 对偶范畴（Dual/Opposite Category）

每个范畴 $\mathcal C$ 都有一个对偶范畴 $\mathcal C^{op}$，这个范畴拥有与原范畴完全相同的物件集合，而它的态射集合与原态射集合同构；更详细地说，对于原范畴的每个态射 $f: A \to B$，在这个态射集合中有对应的 $f^{op}: B \to A$。

注意，对偶范畴完全是抽象的概念：对于一个范畴，它的对偶范畴中，态射都还是相同的含义；只不过方向倒转了。

## 函子（Functor）

函子是范畴之间的态射。它通常用斜体大写字母表示。

函子是范畴的态射也就是说，它既是物件的态射也是元态射。对于一个函子 $F: \mathcal C \to \mathcal D$：

- 对于所有态射 $f: A \to B$，有 $Ff: FA \to FB$，其中 $A, B \in {\rm ob}\mathcal C$、$FA, FB \in {\rm ob}\mathcal D$（对应）；
- 对于所有态射 $f: A \to B$、$g: B \to C$，有 $F(g \circ f) = Fg \circ Ff$（分配)；
- 对于所有恒等态射 ${\rm id}_A$，$F{\rm id}_A = {\rm id}_{FA}$（恒等）。

对于一个物件 $C$ 有一个特殊的函子 ${\rm \Delta}_C$ 将某范畴下的所有物件映射到该物件上，并将所有态射映射到 ${\rm id}_C$ 上。

记住，函子也是态射。它们可以被组合，并且存在恒等态射。

### 双函子（Bifunctor）

双函子是函子的一个特殊情况。它是这样一个函子 $G: \mathcal A \times \mathcal B \to \mathcal C$，也就是说它将两个范畴的笛卡尔积映射到一个范畴。

双函子将**一对**物件或态射映射到一个物件或态射。

还可以推广到三函子（Trifunctor）、四函子、五函子...这些函子也统称作多函子（Multifunctor）。

### 自函子（Endofunctor）

自函子是函子的一个特殊情况，它是形如 $F: \mathcal C \to \mathcal A$ 的态射，即它指向同一个范畴。

### 协变（Covariant）函子与逆变（Contravariant）函子

普通的函子有时候又叫协变函子，这时是为了与另一种不同的逆变（或称反变）函子相区分。

对于范畴 $\mathcal C$、$\mathcal D$，一个逆变函子是这样一个函子 $G: \mathcal C^{op} \to \mathcal D$，即它从一个范畴的对偶范畴射向另一个范畴。也就是说，一个范畴的逆变函子是它的对偶范畴的协变函子。

### Profunctor

Profunctor 是这样一个双函子 $F: \mathcal C^{op} \times \mathcal D \to {\bf Set}$，即它对于第一个范畴 $\mathcal C$ 是逆变的，而另一个 $\mathcal D$ 是协变的，并且射向集合范畴。

### Hom- 函子

对于范畴 $\mathcal C$，${\rm hom}_{\mathcal C}$ 其实是一个 $\mathcal C \times \mathcal C$ 上的 profunctor（即函子 $F: \mathcal C^{op} \times \mathcal C \to \bf Set$）。

对于一对对象 $\lang A, B \rang$，我们已经看到，$\mathcal C\lang A, B \rang$ 射向 $\bf Set$ 中所有 $f: A \to B$ 的集合。

对于一对态射 $\lang f: A \to B, g: C \to D \rang$，我们需要将一对态射映射到一个态射 $h: \mathcal CBC \to \mathcal CAD$（为什么）。这也就是说这个态射对于每个态射 $m: B \to C$ 需要映射到一个 $n: A \to D$。这个过程是 $m \mapsto g \circ m \circ f$。

### Haskell 下的讨论

如果你学过 Haskell 中的 Functor，一些概念应该可以很容易地找到 Haskell 中的对应。在 Haskell 中若存在 Functor `f`，则 `f a` 是对物件 `a` 的映射，而 `fmap n` 是对态射 `n` 的映射。`Maybe`、`Either a`、`[a]`、`(a, )` 等一大票你熟知的类型都是函子。而且，它们都是 ${\bf Hask}$ 下的自函子（为什么）。

特别地，我们可以注意到 `(->) a` 也是函子（想一想，为什么）：

```Haskell
class Functor f where 
    fmap :: (a -> b) -> (f a -> f b)
instance Functor ((->) a) where
    fmap f g = f . g
```

并且我们有一个 `Const a` 函子，所有对它的 `fmap` 均不会产生更改：

```Haskell
data Const a b = Const a
instance Functor (Const a) where
    fmap _ = id
```

这其实就是上边提到的函子 ${\rm \Delta}_A$ 在 ${\bf Hask}$ 下的自函子（为什么）。

在 Haskell 中，`(->)` 就是一个 Profunctor（想一想，为什么）。

双函子、逆变函子和 profunctor 在 `base` 库中有实现，它们分别位于 `Data.Bifunctor`、`Data.Functor.Contravariant` 与 `Data.Profunctor`。

## 笛卡尔闭范畴（Cartesian Closed Category）

笛卡尔闭范畴是简单类型（Simply typed）λ- 演算的重要基础。

一个笛卡尔闭范畴：

- 有终物件；
- 对任何两个物件 $X$、$Y$，它们的积 $X \times Y$ 也在范畴内；
- 对任何两个物件 $X$、$Y$，它们的幂 $Y^X$ 也在范畴内。

$\bf Set$ 就是一个笛卡尔闭范畴。我们可以看到：

- 它的终物件就是仅有一个元素的集合 $\mathbb S$；
- 对任何两个物件 $X$、$Y$，它们的积就是笛卡尔积。
- 对任何两个物件 $X$、$Y$，它们的幂就是 ${\bf Set}XY$。

### 双笛卡尔（Bicartesian）闭范畴

一些笛卡尔闭范畴是双笛卡尔闭范畴，它们支持类似乘法分配律和交换律的运算，乘法是求积，加法是求余积，即，对于任何物件 $A$、$B$、$C$，有 $A \times (B \oplus C) = A \times B \oplus A \times C$。$\bf Set$ 就是一个双笛卡尔闭范畴。

双笛卡尔闭范畴在幂上有一些很有趣的性质，我们一会会看到。

## 对 Algebraic Data Types 的理解

### 加法 `(? a | ? b)`

```haskell
data Add a b = First a | Second b
```

这个类型里面存的值的类型要么是 `a` 要么是 `b`，也就是说是它们俩的并。这是加法。

### 乘法 `(? a b)`

```haskell
newtype Mult a b = Mult a b
```

这个类型里面存的是一个 `a` 和一个 `b`。可以看出来它是两个集合的笛卡尔积。这是乘法。

### 幂 `(a -> b)`

```haskell
type Exp a b = a -> b
```

这样想：一个（纯）函数又是一张从 `a` 映射到 `b` 的表。它的长度是 `a` 的集合大小，每个取值可以取 `b` 的任何值。算一下就知道，一共有 $b^a$ 张表。这是幂。

下面有一些性质，它们不仅应用到 $\bf Hask$（或 $\bf Set$），也应用到所有双笛卡尔闭范畴。

#### 0 为指数

考虑算术中的 $a^0 = 1$，其中 $a$ 为任意值。

在 $\bf Set$ 中，我们已经看到，$0$ 代表 $\varnothing$，$1$ 代表 $\mathbb S$。这说明了，`Void -> a` 与 `()` 同构，也就是说只能有一个，就是 `absurd`。

#### 1 为底数

考虑算术中的 $1^a = 1$，其中 $a$ 为任意值。这说明了，`a -> ()` 与 `()` 同构，也就是说该函数只有一个，就是 `const ()`。

#### 1 为指数

考虑算术中的 $a^1 = a$，其中 $a$ 为任意值。这说明了 `() -> a` 与 `a` 同构。要构建前者，可以使用  `const ?value_of_type_a`。

#### 指数为和

考虑算术中的 $a^{b+c} = a^b \times a^c$，其中 $a$、$b$ 和 $c$ 为任意值。这说明了，`Either b c -> a` 与 `(b -> a, c -> a)` 同构（因为对于前者要处理两种情况，所以在某种意义上相当于两个函数）。

#### 幂的幂

考虑算术中的 $(a^b)^c = a^{b \times c}$。这说明 `c -> b -> a` 与 `(c, b) -> a` 同构；这是柯里化。

#### 分配律

考虑 $(a \times b)^c = a^c \times b^c$。这说明 `c -> (a, b)` 与 `(c -> b, c -> a)` 同构，这很好理解。

## 柯里-霍华德同构（Curry-Howard Isomorphism）

柯里-霍华德同构（或称对应），是指“命题即类型，程序即证明”；更准确地说：

- `Void` 与 $\bot$ 同构，
- `()` 与 $\top$ 同构，
- `(,)` 与 $\land$ 同构，
- `Either` 与 $\lor$ 同构，
- `(->)` 与 $\to$ 同构。

而组合出的一个类型就相当于一个命题。若这个类型有一个值（即与 `()` 同构）则命题为真，否则（与 `Void` 同构）则为假。

考虑一个类型的例子：`(a -> b, a) -> b`（这就是没有柯里化的 $\rm eval$）。转换成逻辑符号，就是 $((A \to B) \land A) \to B$，这是很显然的。这个命题的拉丁文名称是 *modus ponens（真命题模式）*。

接下来是一个假命题的例子：$A \lor B \to A$。转换成类型，它就是 `Either a b -> a`，显然这个函数不可能是全域函数。

我们之前看到了一个函数 `absurd :: Void -> a`，它转换为命题就是 $\bot \to A$。这个命题就是 *ex falso quodlibet（从错误的结论什么都能推出）*。它是一个真命题，所以存在 `absurd`。

## 自然变换（Natural Transformation）

先来从另外一个方面理解一下函子。一个函子没法把一个范畴映射到多个，也就是说函子没法“拆分”范畴。但是多个射向同一范畴的函子可以看作能够“组合”范畴。

自然变换是从任意范畴 $\mathcal C$ 射向另一范畴 $\mathcal D$ 的任意两个函子（注意，两个函子均从相同的一个范畴射向相同的另一个范畴） $F$、$G$ 上的若干态射 $\eta: F \Rightarrow G$。也就是说，对于每个物件或态射 $A$，它的自然变换（这里指的是**一个**态射）是 $\eta_A: FA \to GA$。

可以看到，在某种意义上，自然变换其实是一个比函子还“小”的概念；它是在范畴 $D$ 内的一些态射而非范畴之间的态射（为什么）。我们并不是凭空新建了几个态射，而只是从原本范畴 $\mathcal D$ 的态射中挑了符合要求的。这就是自然变换中“自然”的含义。

对于每个 $f: A \to B$，自然变换必须遵循

$$ \eta_B \circ Ff = Gf \circ \eta_A; $$

这从类型上理解比较容易。假设我们有一个范畴 $\mathcal C$，它有物件 $A$、$B$，态射 $f: A \to B$，函子 $F, G: \mathcal C \to \mathcal D$ 和自然变换 $\eta: F \Rightarrow G$。审视一下类型：

$$ Ff : FA \to FB $$
$$ Gf : GA \to GB $$
$$ \eta_A : FA \to GA $$
$$ \eta_B : FB \to GB. $$

可以看到，它们是能够组合的。

这个限制是很严格的，但也带来了许多有用的属性。再拿刚才的例子，如果其中的 $Ff$ 与另一个态射 $(Ff)^{-1}: FB \to FA$ 组成一个同构，那么：

$$ \eta_B = Gf \circ \eta_A \circ (Ff)^{-1}. $$

（画个图大概会更有助于理解，但这里就不画了。）

### Haskell 下的讨论

要在 Haskell 下实现自然变换 $\eta_A : FA \to GA$，我们的函数签名是：

```haskell
eta :: F a -> G a
```

在 Haskell 中，任何签名是这样的函数都自动满足自然变换的条件。也就是说，任何一个这样的函数都是一个自然变换 $\eta: F \Rightarrow G$。这是由于 Haskell 的泛型函数是“参数多态（parametric polymorphism）”而非“特定多态（ad hoc polymorphism）”（typeclass 中定义的除外，它们是特定多态；C++函数同时支持两种，其中特定多态可以通过函数重载或模板特化实现）而带来的；它们对于所有类型都应用同一个表达式。

> 来感性理解一下。在 Haskell 中，自然变换条件
> 
> $$ Gf \circ \eta_A =  \eta_B \circ Ff $$
> 
> 表述为
> 
> ```haskell
> fmap f . eta == eta . fmap f
> ```
> 
> 在你很久之前看过的“图解 Monad”（那篇文章很带有误解性，但是某种意义上能帮助理解）中，它提到了 Functor 是一种“容器”；那么在这里，我们“先更改容器里的东西，再更换容器”和“先更换容器，再更改容器里的东西”是一个意思。——它们理应是一个意思，不然 $F$ 和 $G$ 就不配叫函子。

### 米田<span style="color: black; background-color: black;">共</span>引理（よねだのほだい、Yoneda Lemma）

米田引理显示，对于任何物件 $A$，自然变换（即态射集合） $\alpha:\ ?^A \Rightarrow F$ 与 $FA$ （一个物件，在 $\bf Hask$ 下也是个集合）同构。

来看一个 Haskell 例子。我们先定义一个 `Reader a` 函子：

```haskell
newtype Reader a b = Reader (a -> b)
instance Functor Reader a where
    fmap f g = f . g
```

那么，`Reader () a` 和 `a` 是同构的。

接下来我们定义这样一个自然变换：

```haskell
alpha :: Reader () a -> Maybe a
```

它只有两个可能的实现：

```haskell
alpha = const Nothing
alpha = Just . (() &)
```

我们这里有两个自然变换，刚好 `Maybe ()` 的两个可能的值对应：`Just ()` 和 `Nothing`。

## 单子（Monad）

## Kleisli 范畴
