---
title: 学范畴论（或许吧）
description: 学不会的
author: t532
date: Sun Jan 26 2020 19:38:09 GMT+0800 (GMT+08:00)
category: FP
---

# 学范畴论（或许吧）

不是非常严谨，不是形式化表述。刚开始学，持续更新。

> **参考**
> 
> 1. [*Category Theory for Programmers*, Bartosz Milewski](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)
> 2. [Wikipedia](https://wikipedia.org)
> 3. [*Grokking Monad*, 欧阳继超](https://blog.oyanglul.us/grokking-monad/part1)
> 4. [*Categories for the Working Mathematician*, Saunders Mac Lane](https://www.maths.ed.ac.uk/~aar/papers/maclanecat.pdf)

## 范畴（Category）$\textbf{\textit{C}}, ...$

范畴是由物件和态射组成的数学结构。

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

## 两个物件之间的态射集合 $\textbf{\textit{C}}(A, B), ...$

记号 $\textbf{\textit{C}}(A, B)$（有时表示为 $\operatorname{hom}_{\textbf{\textit{C}}}(A, B)$）是范畴 $\textbf{\textit{C}}$ 内从 $A$ 至 $B$ 的态射类。

## 集合范畴 $\textbf{Set}$

熟知的 $\textbf{Set}$ 是所有集合组成的范畴。物件就是集合，态射就是函数（必定是全函数）。

## 元范畴 $\textbf{Cat}$

熟知的 $\textbf{Cat}$ 是所有范畴组成的范畴。物件就是范畴，态射就是函子（后面会详细提到）。

## 伪范畴 $\textbf{Hask}$

$\textbf{Hask}$ 不是一个真正的范畴，但在许多情况下可以当作真正的范畴对待。它与 $\textbf{Set}$ 在许多方面相似。它是 Haskell 语言的类型系统所在的伪范畴。这也就是说，Haskell 语言中不存在比 $\textbf{Hask}$ 更“大”的（伪）范畴。它的物件是某种类型的所有值的集合，态射就是函数。

## 组合（Composition）$g \circ f$

一个范畴内，若存在态射 $f : A \to B$ 以及态射 $g: B \to C$ ，则必定存在态射 $g \circ f: A \to C$。

代入 $\textbf{Set}$ 去理解，存在 $(g \circ f) x = g (f x)$。

## 恒等（Identity）态射 $\operatorname{id}_B$

一个范畴内，对于任何一个物件 $B$ 存在一个态射 $\operatorname{id}_B: B \to B$ 使得任何态射与它组合的结果仍是那个态射。

即对于任何 $f: A \to B$ 存在 $\operatorname{id}_B \circ f = f$，且对于任何 $g: B \to C$ 存在 $g \circ \operatorname{id}_B = g$。

代入 $\textbf{Set}$ 去理解，这个态射就是一个函数 $x \mapsto x$。

恒等态射是一个平凡的与自身的同构（后面会看到）。

## 始物件和终物件

一个范畴内的始物件 $S$ 可以近似理解为图的一个超级源点。定义上，从 $S$ 到范畴的所有物件有且仅有一个态射。一个范畴内的始物件是唯一的，但不一定存在。

一个范畴内的终物件 $T$ 可以近似理解为图的一个超级汇点。定义上，从范畴的所有物件到 $T$ 有且仅有一个态射。一个范畴内的终物件是唯一的，但不一定存在。

这两个概念互为对偶，也就是（不严谨地）它们在同构意义上相等。

## 同构（Isomorphism）

同构（Isomorphism）是一组态射 $\langle f: X \to Y, g: Y \to X \rangle$，满足 $g \circ f = \operatorname{id}_X$ 且 $f \circ g = \operatorname{id}_Y$。

两个物件是同构的（Isomorphic），当它们之间通过一组同构连接。

同构是相等关系的推广。

## 积（Product）

## 余积（Coproduct）

## 函子（Functor）

## 自然变换（Natural Transformation）

## 单子（Monad）

## Kleisli 范畴
