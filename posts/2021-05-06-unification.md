---
title: Terms of the universe, unify!
date: Thu May 06 2021 18:10:16 GMT+0800 (中国标准时间)
category:
  - 编程语言
  - 类型论
---

这是一篇关于**统合**（unification，有人叫做「合一」，但是我不是很喜欢这个名字）的文章，有人想让我写因此我就写了。

统合在不同语境下的意思有一些微妙的区别。基本上，它涉及两个项之间的比较。最基本的比较的方法是确认两个项是否在定义上相等，这种方式有时候也被称为**转换检查**（conversion check）；在复杂一些的系统中，统合会顺便尝试求解**元变量**（metavariable）；更为推广的方法中，即使两个项并非在定义上相等，也可能会得出某个**一般统合子**（most general unifier）。

# 转换检查

## 类型规则

转换检查可以用于确定两个项是否在定义上相等。这听起来是平凡的，例如，Pi 类型只可能与 Pi 类型相等。

$$
\cfrac{
  \Gamma \vdash A \approx A' \qquad
  \Gamma, x : A \vdash B \approx B'[x/y]
}{
  \Gamma \vdash \Pi (x : A). B \approx \Pi (y : A'). B'
}
$$

那么，如果我们对于每个语法构造都写一条关于 $\approx$ 的规则，是否就解决了？若我们定义环境内包含某个常量 $\Gamma = \{k = \Pi (x : A). B\}$，那么 $\Gamma \vdash k \approx \Pi (x : A). B$ 还是无解的，因为 $k$ 的构造是「常量」而 $\Pi (x : A). B$ 的构造是「Pi 类型」。这提示我们应该添加一个新的定义。

$$
\cfrac{
  A \to_{\rm whnf} A' \qquad
  B \to_{\rm whnf} B' \qquad
  \Gamma \vdash A \approx B
}{
  \Gamma \vdash A \approx_\to B
}
$$

并转而使用 $\approx_\to$，将 $\approx$ 留作内部使用。为下文行文方便，从现在开始我们把 $\approx$ 称作 $\approx'$，而把 $\approx_\to$ 称作 $\approx$。

到此我们可以相似地定义 Sigma 类型的 $\approx'$ 规则（怎么做？）。

## 变量规则

变量的规则同样很平凡。

$$
\cfrac{
  a = b
}{
  \Gamma \vdash a \approx' b
}
$$

## 析构规则

我们来看应用的规则。注意到两边的项都是 WHNF，因此应用只可能是**中性的**（neutral），也就是说它的头部是不可化简的。这也就是说，它的头部是一个变量，或者是另一个中性的项。此时我们也只有确保它们结构相等的情况下才能说它们定义上相等。

$$
\cfrac{
  \Gamma \vdash f \approx' f' \qquad
  \Gamma \vdash x \approx x'
}{
  \Gamma \vdash f \, x \approx' f' \, x'
}
$$

根据上面提到的原则，我们可以相似地定义投影的 $\approx'$ 规则（怎么做？）。

## 构造规则

在这里东西变得稍微有趣了一些。对于 lambda 表达式，我们尝试这样做。

$$
\cfrac{
  \Gamma \vdash x \approx y[a/b]
}{
  \Gamma \vdash \lambda a. x \approx' \lambda b. y
}
$$

**不行哦。**$\Gamma \vdash x \approx y[a/b]$ 里面，$\Gamma$ 并不包含 $a$；如果我们想加入 $a$，则必须要得知它的类型；而我们不知道。更糟糕的是，这样一条规则也没办法处理 eta 转换：$f \approx \lambda x. f \, x$ 是无解的！

## 类型导向

在非类型层面上，我们需要引入**类型导向**的转换检查。我们定义关系 $A \approx'_* B : T$ 意为「在知晓 WHNF $A$ 和 $B$ 都有类型 $T$ 的情况下，对 $A$ 和 $B$ 进行转换检查」，并定义 $A \approx_* B : T$ 为将 $A$ 与 $B$ 化简到 WHNF 后进行 $\approx'_*$。另外，我们将 $A \approx' B$ 关系增强为 $A \approx' B : T$，意味着「对 $A$ 和 $B$ 进行转换检查并推导出它们共有的类型 $T$」，并相应地更新 $\approx$ 的定义。这也就是说，$\approx$ 中的类型是**返回**的，而 $\approx_*$ 的类型是**传入**的。

重新定义 $\approx'$ 的过程比较无聊，例如 Pi 类型的规则被重写为这样。

$$
\cfrac{
  \Gamma \vdash A \approx A' : \mathcal U_m \qquad
  \Gamma, x : A \vdash B \approx B'[x/y] : \mathcal U_n
}{
  \Gamma \vdash \Pi (x : A). B \approx' \Pi (y : A'). B' : \mathcal U_{m \sqcup n}
}
$$

变量的规则被重写为这样。

$$
\cfrac{
  a = b \qquad
  \Gamma \ni a : A
}{
  \Gamma \vdash a \approx' b : A
}
$$

而应用的规则稍微有趣一些，它被重写为下面这样。

$$
\cfrac{
  \Gamma \vdash f \approx' f' : \Pi (y : A). B \qquad
  \Gamma \vdash x \approx_* x' : A
}{
  \Gamma \vdash f \, x \approx' f' \, x' : B[x/y]
}
$$

注意到：$\approx$ 与 $\approx_*$ 的交互就发生在对析构规则的处理中。现在我们来看更有趣的部分，即我们到底如何使用 $\approx_*$ 处理构造规则。

$$
\cfrac{
  \Gamma, a : A \vdash f \, a \approx_* g \, a : B[a/x]
}{
  \Gamma \vdash f \approx'_* g : \Pi (x : A). B
}
$$

我们没有直接检查 lambda 这一构造；我们只是利用了 $f$ 与 $g$ 均有 Pi 类型这一事实。我们应用一个新的变量作为参数，这直接处理了 eta 变换；一个变量 $f$ 应用参数后变成了 $f \, a$，一个带有若干层 lambda 的等价项 $\lambda x. (\lambda y. (\lambda z. f \, z) \, y) \, x$ 应用参数后也变成了 $f \, a$，问题解决。我们最后提供如何从 $\approx$ 降级到 $\approx_*$，即从**推断**降级为**检查**。

$$
\cfrac{
  \Gamma \vdash A \approx B : T'
}{
  \Gamma \vdash A \approx_* B : T
}
$$

> 注：这条规则还有另外一个版本。

$$
\cfrac{
  \Gamma \vdash A \approx B : T' \qquad
  \Gamma \vdash T \approx T' : N
}{
  \Gamma \vdash A \approx_* B : T
}
$$

> 其中第二条前提理论上是冗余的，但我不知道这能不能更方便地解出类型中的元变量。

# 元变量

# 一般统合子

<ArticleUnfinished />
