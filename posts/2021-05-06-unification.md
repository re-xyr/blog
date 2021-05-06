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

那么，如果我们对于每个语法构造都写一条关于 $\approx$ 的规则，是否就解决了？若我们定义环境内包含某个常量 $\Gamma = \{k = \Pi (x : A). B\}$，那么 $\Gamma \vdash k \approx \Pi (x : A). B$ 还是无解的，因为 $k$ 的构造是「常量」而 $\Pi (x : A). B$ 的构造是「Pi 类型」。这提示我们应该定义：

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
}{
  \Gamma \vdash a \approx' a
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

在这里东西变得稍微有趣了一些。对于 lambda 表达式，我们尝试这样做：

$$
\cfrac{
  \Gamma \vdash x \approx' y[a/b]
}{
  \Gamma \vdash \lambda a. x \approx' \lambda b. y
}
$$

**不行哦。**$\Gamma \vdash x \approx' y[a/b]$ 里面，$\Gamma$ 并不包含 $a$；如果我们想加入 $a$，则必须要得知它的类型；而我们不知道。更糟糕的是，这样一条规则也没办法处理 eta 转换：$f \approx \lambda x. f \, x$ 是无解的！

在非类型层面上，我们需要引入**类型导向**的转换检查。我们定义关系 $A \approx'_* B : T$ 意为「在知晓 WHNF $A$ 和 $B$ 都有类型 $T$ 的情况下，对 $A$ 和 $B$ 进行转换检查」，并定义 $A \approx_* B : T$ 为将 $A$ 与 $B$ 化简到 WHNF 后进行 $\approx'_*$。另外，我们将 $A \approx' B$ 关系增强为 $A \approx' B : T$，意味着「对 $A$ 和 $B$ 进行转换检查并推导出它们共有的类型 $T$」，并相应地更新 $\approx$ 的定义。

<ArticleUnfinished />
