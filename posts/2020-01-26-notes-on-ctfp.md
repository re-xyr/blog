---
title: 学范畴论（或许吧）
description: 学不会的
author: t532
date: Sun Jan 26 2020 19:38:09 GMT+0800 (GMT+08:00)
category: FP
---

# 学范畴论（或许吧）

不是非常严谨，不是形式化表述。刚开始学，持续更新。

> 前置知识：集合论基本概念、群论基本概念、基础 Haskell、小学数学
> 
> 函数应用不加括号，即 $fx = f(x)$。
> 有时候通过问号 $?$ 标记 Holes。

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

记号 ${\rm ob}\mathcal C$ 表示了范畴 $\mathcal C$ 的物件的集合（其实是类——这里为了简略省去）。

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

## 始物件（Initial Object）和终物件（Terminal Object）

一个范畴内的始物件 $S$ 可以近似理解为图的一个超级源点。定义上，从 $S$ 到范畴的所有物件有且仅有一个态射。一个范畴内的始物件是唯一的，但不一定存在（为什么）。

一个范畴内的终物件 $T$ 可以近似理解为图的一个超级汇点。定义上，从范畴的所有物件到 $T$ 有且仅有一个态射。一个范畴内的终物件是唯一的，但不一定存在。

这两个概念互为对偶，也就是（不严谨地）它们在同构意义上相等。

## 同构（Isomorphism）

同构（Isomorphism）是一组态射 $\lang f: X \to Y, g: Y \to X \rang$，满足 $g \circ f = {\rm id}_X$ 且 $f \circ g = {\rm id}_Y$。

两个物件是同构的（Isomorphic），当它们之间通过一组同构连接。

代入 ${\bf Set}$ 去理解，一组同构是一组对偶的双射。

同构是相等关系的推广。

## 积（Product）与余积（Coproduct）

一个范畴里，任意两个物件 $A$、$B$ 的积是这样一个物件 $A \times B$，存在 $f: A \times B \to A$、$g: A \times B \to B$ 使得对于其他任何物件 $C$ 存在 $p: C \to A$、$q: C\to B$，总有态射 $m: C \to A \times B$ 使得 $p = m \circ f$、$q = m \circ g$。

代入 ${\bf Set}$ 去理解，任意两个集合 $A$、$B$ 的积是它们的 Cartesian 积 $A \times B$（想一想，为什么），它包含了所有有序对 $\lang A, B \rang$ 当 $a \in A$、$b \in B$。

一个范畴里，任意两个物件 $A$、$B$ 的余积（或称作范畴意义下的和，categorical sum）是这样一个物件 $A \oplus B$（或记作 $A \coprod B$)，存在 $f: A \to A \oplus B$、$g: B \to A \oplus B$ 使得对于其他任何物件 $C$ 存在 $p: A \to C$、$q: B \to C$，总有态射 $n: A \oplus B \to C$ 使得 $p = f \circ n$、$q = g \circ n$。

代入 ${\bf Set}$ 去理解，任意两个集合 $A$、$B$ 的余积是它们的并 $A \cup B$（想一想，为什么）。

## 幺半范畴（Monoidal Category）

一些范畴是幺半范畴，也就是说它们的物件与某个运算 $*$ 构成一个幺半群（不严谨）。

举个例子，${\bf Set}$ 就是一个幺半范畴：

- $\lang {\rm ob}{\bf Set}, \times \rang$ 构成一个幺半群，其中幺元为仅有一个元素的集合 $\mathbb{S}$。它还有一个零元，即空集 $\varnothing$（想一想，为什么）。
- $\lang {\rm ob}{\bf Set}, \oplus \rang$ 构成一个幺半群，其中幺元为空集 $\varnothing$。

## 对偶范畴（Dual/Opposite Category）

每个范畴 $\mathcal C$ 都有一个对偶范畴 $\mathcal C^{op}$，这个范畴拥有与原范畴完全相同的物件集合，而它的态射集合与原态射集合同构；更详细地说，对于原范畴的每个态射 $f: A \to B$，在这个态射集合中有对应的 $f^{op}: B \to A$。

注意，对偶范畴完全是抽象的概念：对于一个范畴，它的对偶范畴中，态射都还是相同的含义——只不过方向倒转了。

## 函子（Functor）

函子是范畴之间的态射。它通常用斜体大写字母表示。

函子是范畴的态射也就是说，它既是物件的态射也是元态射。对于一个函子 $F: \mathcal C \to \mathcal D$：

- 对于所有态射 $f: A \to B$，有 $Ff: FA \to FB$，其中 $A, B \in {\rm ob}\mathcal C$、$FA, FB \in {\rm ob}\mathcal D$（对应）；
- 对于所有态射 $f: A \to B$、$g: B \to C$，有 $F(g \circ f) = Fg \circ Ff$（分配)；
- 对于所有恒等态射 ${\rm id}_A$，$F{\rm id}_A = {\rm id}_{FA}$（恒等）。

对于一个物件 $C$ 有一个特殊的函子 ${\rm \Delta}_C$ 将某范畴下的所有物件映射到该物件上，并将所有态射映射到 ${\rm id}_C$ 上。

记住，函子也是态射。它们可以被组合，并且存在恒等态射。

### 双函子（Bifunctor）

双函子是函子的一个特殊情况。它是这样一个函子 $G: \mathcal A \times \mathcal B \to \mathcal C$，也就是说它将两个范畴的 Cartesian 积映射到一个范畴。

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

对于范畴 $\mathcal C$，${\rm Hom}_{\mathcal C}$ 其实是一个 $\mathcal C \times \mathcal C$ 上的 profunctor（即函子 $F: \mathcal C^{op} \times \mathcal C \to \bf Set$）。

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

## 自然变换（Natural Transformation）

## 单子（Monad）

## Kleisli 范畴
