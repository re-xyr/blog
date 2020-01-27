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

> **参考**
> 
> 1. [*Category Theory for Programmers*, Bartosz Milewski](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)
> 2. [Wikipedia](https://wikipedia.org)
> 3. [*Grokking Monad*, 欧阳继超](https://blog.oyanglul.us/grokking-monad/part1)
> 4. [*Categories for the Working Mathematician*, Saunders Mac Lane](https://www.maths.ed.ac.uk/~aar/papers/maclanecat.pdf)

## 范畴（Category）$\textbf{\textit{C}}, ...$

范畴是由物件和态射组成的数学结构。

范畴可以通过交换图表表示，它看上去像一张有向图，但箭头走向遵循范畴的规则。

范畴一般通过粗斜体大写字母表示，一些熟知（well-known）的范畴用粗体大写单词（缩写）表示。

## 类（Class）

类是一组集合，并且这组集合的元素可以被无歧义地通过它们共享的属性指定；类在一些情况下就是一个集合。

## 物件（Object）$A, B, ...$ 及其类 $\operatorname{ob}(\textbf{\textit{C}})$

物件...就是物件。它是一个抽象的概念。

物件一般通过斜体大写字母表示。

记号 $\operatorname{ob}(\textbf{\textit{C}})$ 表示了范畴 $\textbf{\textit{C}}$ 的物件的类。

## 态射（Morphism）$f: A \to B, ...$ 及其类 $\operatorname{hom}(\textbf{\textit{C}})$

态射代表了一种关系。它也是一个抽象的概念。

态射又被叫做箭头（Arrow）。

记号 $f : A \to B$ 表达了从物件 $A$ 到物件 $B$ 的态射 $f$，表述中称为 $f$。态射一般通过斜体小写字母表示。

记号 $\operatorname{hom}(\textbf{\textit{C}})$ 表示了范畴 $\textbf{\textit{C}}$ 的态射的类。

## 两个物件之间的态射类 $\textbf{\textit{C}}(A, B), ...$

记号 $\textbf{\textit{C}}(A, B)$（有时表示为 $\operatorname{hom}_{\textbf{\textit{C}}}(A, B)$）是范畴 $\textbf{\textit{C}}$ 内从 $A$ 至 $B$ 的态射类。

## 集合范畴 $\textbf{Set}$

熟知的 $\textbf{Set}$ 是所有集合组成的范畴。物件就是集合，态射就是函数（必定是全射）。

## 元范畴 $\textbf{Cat}$

熟知的 $\textbf{Cat}$ 是所有小范畴（小范畴是这样一类范畴，它们的态射类和物件类都是集合）组成的范畴。物件就是范畴，态射就是函子（后面会详细提到）。

## 伪范畴 $\textbf{Hask}$

$\textbf{Hask}$ 不是一个真正的范畴，但在许多情况下可以当作真正的范畴对待。它与 $\textbf{Set}$ 在许多方面相似。它是 Haskell 语言的类型系统所在的伪范畴。这也就是说，Haskell 语言中不存在比 $\textbf{Hask}$ 更“大”的（伪）范畴。它的物件是某种类型的所有值的集合，态射就是函数。

## 组合（Composition）$g \circ f$

一个范畴内，若存在态射 $f : A \to B$ 以及态射 $g: B \to C$ ，则必定存在态射 $g \circ f: A \to C$。

代入 $\textbf{Set}$ 去理解，存在 $(g \circ f) x = g (f x)$。

## 恒等（Identity）态射 $\operatorname{id}_B$

一个范畴内，对于任何一个物件 $B$ 存在一个态射 $\operatorname{id}_B: B \to B$ 使得任何态射与它组合的结果仍是那个态射。

即对于任何 $f: A \to B$ 存在 $\operatorname{id}_B \circ f = f$，且对于任何 $g: B \to C$ 存在 $g \circ \operatorname{id}_B = g$。

代入 $\textbf{Set}$ 去理解，这个态射就是一个函数 $x \mapsto x$。

恒等态射是一个平凡的自同构（后面会看到）。

## 始物件（Initial Object）和终物件（Terminal Object）

一个范畴内的始物件 $S$ 可以近似理解为图的一个超级源点。定义上，从 $S$ 到范畴的所有物件有且仅有一个态射。一个范畴内的始物件是唯一的，但不一定存在（为什么）。

一个范畴内的终物件 $T$ 可以近似理解为图的一个超级汇点。定义上，从范畴的所有物件到 $T$ 有且仅有一个态射。一个范畴内的终物件是唯一的，但不一定存在。

这两个概念互为对偶，也就是（不严谨地）它们在同构意义上相等。

## 同构（Isomorphism）

同构（Isomorphism）是一组态射 $\langle f: X \to Y, g: Y \to X \rangle$，满足 $g \circ f = \operatorname{id}_X$ 且 $f \circ g = \operatorname{id}_Y$。

两个物件是同构的（Isomorphic），当它们之间通过一组同构连接。

代入 $\textbf{Set}$ 去理解，一组同构是一组对偶的双射。

同构是相等关系的推广。

## 积（Product）与余积（Coproduct）

一个范畴里，任意两个物件 $A$、$B$ 的积是这样一个物件 $A \times B$，存在 $f: A \times B \to A$、$g: A \times B \to B$ 使得对于其他任何物件 $C$ 存在 $p: C \to A$、$q: C\to B$，总有态射 $m: C \to A \times B$ 使得 $p = m \circ f$、$q = m \circ g$。

代入 $\textbf{Set}$ 去理解，任意两个集合 $A$、$B$ 的积是它们的 Cartesian 积 $A \times B$（想一想，为什么），它包含了所有有序对 $\langle A, B \rangle$ 当 $a \in A$、$b \in B$。

一个范畴里，任意两个物件 $A$、$B$ 的余积（或称作范畴意义下的和，categorical sum）是这样一个物件 $A \oplus B$（或记作 $A \coprod B$)，存在 $f: A \to A \oplus B$、$g: B \to A \oplus B$ 使得对于其他任何物件 $C$ 存在 $p: A \to C$、$q: B \to C$，总有态射 $n: A \oplus B \to C$ 使得 $p = f \circ n$、$q = g \circ n$。

代入 $\textbf{Set}$ 去理解，任意两个集合 $A$、$B$ 的余积是它们的并 $A \cup B$（想一想，为什么）。

## 幺半范畴（Monoidal Category）

一些范畴是幺半范畴，也就是说它们的物件与某个运算 $*$ 构成一个幺半群（不严谨）。

举个例子，$\textbf{Set}$ 就是一个幺半范畴：

- $\langle \operatorname{ob}(\textbf{Set}), \times \rangle$ 构成一个幺半群，其中幺元为仅有一个元素的集合 $\mathbb{S}$。它还有一个零元，即空集 $\varnothing$（想一想，为什么）。
- $\langle \operatorname{ob}(\textbf{Set}), \oplus \rangle$ 构成一个幺半群，其中幺元为空集 $\varnothing$。

## 函子（Functor）

函子是范畴之间的态射。它通常用斜体大写字母表示。

函子是范畴的态射也就是说，它既是物件的态射也是元态射。对于一个函子 $F: \textbf{\textit{C}} \to \textbf{\textit{D}}$：

- 对于所有态射 $f: A \to B$，有 $Ff: FA \to FB$，其中 $A, B \in \operatorname{ob}(\textbf{\textit{C}})$、$FA, FB \in \operatorname{ob}(\textbf{\textit{D}})$（对应）；
- 对于所有态射 $f: A \to B$、$g: B \to C$，有 $F(g \circ f) = Fg \circ Ff$（分配)；
- 对于所有恒等态射 $\operatorname{id}_A$，$F\operatorname{id}_A = \operatorname{id}_{FA}$（恒等）。

对于一个物件 $C$ 有一个特殊的函子 $\operatorname{\Delta}_C$ 将某范畴下的所有物件映射到该物件上，并将所有态射映射到 $\operatorname{id}_C$ 上。

记住，函子也是态射。它们可以被组合，并且存在恒等态射。

### 双函子（Bifunctor）

双函子是函子的一个推广。它是这样一个态射 $G: \langle \textbf{\textit{A}}, \textbf{\textit{B}} \rangle \to \textbf{\textit{C}}$，也就是说它将两个范畴的 Cartesian 积映射到一个范畴。

双函子将**一对**物件或态射映射到一个物件或态射。

### 自函子（Endofunctor）

自函子是函子的一个特殊情况，它是形如 $F: \textbf{\textit{A}} \to \textbf{\textit{A}}$ 的态射，即它指向同一个范畴。

### Haskell 下的讨论

如果你学过 Haskell 中的 Functor，这些概念应该可以很容易地找到 Haskell 中的对应。在 Haskell 中若存在 Functor `f`，则 `f a` 是对物件 `a` 的映射，而 `fmap n` 是对态射的映射。`Maybe`、`Either a`、`[a]`、`(a, )` 等一大票你熟知的类型都是函子。而且，它们都是 $\textbf{Hask}$ 下的自函子（为什么）。

特别地，我们可以注意到 `(->) a` 也是函子（想一想，为什么）：

```Haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
instance Functor ((->) a) where
    fmap f g = f . g
```

并且我们有一个 `Const a` 函子，所有对它的 `fmap` 均不会产生更改：

```Haskell
data Const a b = Const a
instance Functor (Const a) where
    fmap _ = id
```

这其实就是上边提到的函子 $\operatorname{\Delta}_A$ 在 $\textbf{Hask}$ 下的自函子（为什么）。

双函子在 `base` 库中有实现，它在 `Data.Bifunctor` 中。

## 自然变换（Natural Transformation）

## 单子（Monad）

## Kleisli 范畴
