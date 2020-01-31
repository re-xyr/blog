---
title: Church 编码
description: Church 编码是一种基于 λ- 演算的抽象方法。
author: t532
date: Tue Jan 21 2020 18:38:32 GMT+0800 (GMT+08:00)
category:
    - FP
    - 数学
    - 新知
---

# Church 编码

> 自言自语：博客三个月没更新对不起呜呜呜（但是反正没人看也就没关系了对吧（

> 前置知识：[λ- 演算](https://en.wikipedia.org/wiki/Lambda_calculus)，基础 Haskell，[布尔代数](https://en.wikipedia.org/wiki/Boolean_algebra)，小学数学

Church 编码是一种基于 λ- 演算的抽象方法。它将物件（布尔值、自然数、列表、etc）抽象为 abstractions，并通过将公理的基本元素作为参数应用于其上来获得（依基本元素不同而不同的）值。

## Church 布尔代数
Church 布尔代数通过 Church 编码抽象了标准布尔代数，我们可以通过它来理解 Church 编码。

### 布尔值
考虑布尔代数的基本元素，即布尔值：

**公理 a1. 布尔值的集合**
$$ \mathbb{B} = \{ \top , \bot \} $$

其中 $\top$ 为逻辑真，$\bot$ 为逻辑假。

在 Church 布尔代数中，它们将会如此表示：

**定义 a1. Church 布尔代数中的布尔值**
$$ \operatorname{true} = \lambda tf.t $$
$$ \operatorname{false} = \lambda tf.f $$

可以认为 $t$ 与 $f$ 分别代表了抽象的逻辑真与逻辑假。

令 $t := \top , f := \bot$，即将标准布尔代数的基本单位应用于 Church 布尔值后，其归约为（我们所想得到的）标准布尔代数值 - 这展示了标准布尔值和 Church 布尔值之间的关系：

$$ \operatorname{true} \top \bot = \top $$
$$ \operatorname{false} \top \bot = \bot $$

在 Church 布尔代数中，`if-then-else`（或 3- 元算子 `?:`）变得极其显然，乃至不需要：
$$ \operatorname{if-then-else} = \lambda ite.ite = \lambda i.i = \operatorname{id} $$

**代码 a1.**
```haskell
   type Cbool a = a    -> a     -> a
--                True -> False -> Boolean

true :: Cbool a
true t f = t

false :: Cbool a
false t f = f

ifThenElse :: Cbool a -> a -> a
ifThenElse i t e = i t e
```

### 取反

接下来考虑在标准布尔代数中的逻辑取反：

**公理 a2. 布尔值的取反**
$$ \neg \top = \bot $$
$$ \neg \bot = \top $$

不难想到，在 Church 布尔代数中，逻辑取反的定义：

**定义 a2. Church 布尔代数中的取反**
$$ \operatorname{neg} = \lambda x. \lambda tf. xft $$

我们颠倒了逻辑真与逻辑假，这就令原值归约为相反的值。

**代码 a2.**
```haskell
cnot :: Cbool a -> Cbool a
cnot x t f = x f t
```

### 逻辑与
逻辑与/或/异或可以互推，这里省略证明。

**公理（定理）a3. 布尔代数中的逻辑与**
$$ \top \land \top = \top $$
$$ \top \land \bot = \bot $$
$$ \bot \land \top = \bot $$
$$ \bot \land \bot = \bot $$

**定义 a3. Church 布尔代数中的逻辑与**
有两种理解方式：

$$ \operatorname{and} = \lambda xy. xyx $$
如果第一个值为假，那就直接得到结果，否则再判断第二个值是否为假。

$$ \operatorname{and} = \lambda xy. \lambda tf. x(ytf)f $$
将其中一个值（$x$）作为另一个值（$y$）的真值，若$x$为假，则$y$即使为真，最后仍归约为假。

**代码 a3.**
```haskell
cand :: Cbool a -> Cbool a -> Cbool a
cand x y = x y x
```

### 逻辑或

**公理（定理）a4. 布尔代数中的逻辑或**
$$ \top \lor \top = \top $$
$$ \top \lor \bot = \top $$
$$ \bot \lor \top = \top $$
$$ \bot \lor \bot = \bot $$

**定义 a4. Church 布尔代数中的逻辑或**
有两种理解方式：

$$ \operatorname{or} = \lambda xy. xxy $$
如果第一个值为真，那就直接得到结果，否则再判断第二个值是否为真。

$$ \operatorname{or} = \lambda xy. \lambda tf. xt(ytf)$$
将其中一个值（$x$）作为另一个值（$y$）的假值，若$x$为真，则$y$即使为假，最后仍归约为真。

**代码 a4.**
```haskell
cor :: Cbool a -> Cbool a -> Cbool a
cor x y = x x y
```

### 逻辑异或

**公理（定理）a5. 布尔代数中的逻辑异或**
$$ \top \oplus \top = \bot $$
$$ \top \oplus \bot = \top $$
$$ \bot \oplus \top = \top $$
$$ \bot \oplus \bot = \bot $$

**定义 a5. Church 布尔代数中的逻辑异或**
有两种理解方式：

$$\operatorname{xor} = \lambda xy. x(\operatorname{not} y)y = \lambda xy. x(\lambda tf. yft)y $$
如果 $x$ 那么判断是否 $\neg y$，如果 $\neg x$ 那么判断是否 $y$。

$$\operatorname{xor} = \lambda xy. \operatorname{and}(\operatorname{not}(\operatorname{and} xy))(\operatorname{or} xy) = \lambda xy. xyx(\lambda tf. xyxft)(xxy) $$
如果并非 $x \land y$ 且存在 $x \lor y$，那么存在 $x$ 异或 $y$。

**代码 a5.**
```haskell
cxor :: Cbool a -> Cbool a -> Cbool a
cxor x y = x (cnot y) y
```

## Church Number
Church Number 编码了自然数及它的运算。

### Peano 公理
Peano 公理定义了自然数。其他自然数之上的运算与关系都可由其推出。

**公理 b1. Peano 公理**

2- 元组 $(\mathbb{N}, x^+)$ 是一个 Dedekind-Peano 结构，仅当其满足如下条件：
$$ \forall n \in \mathbb{N}, n^+ \in \mathbb{N}; (1)$$
$$ \forall m, n \in \mathbb{N}, m^+ = n^+ \to m = n; (2)$$
$$ \exists e \in \mathbb{N}, \forall n \in \mathbb{N}, n^+ \neq e; (3) $$
$$ \forall S \subseteq \mathbb{N}, e \in S \land (\forall s \in S \to s^+ \in S) \to S = \mathbb{N}. (4) $$
并且我们称 $\mathbb{N}$ 为自然数集，$x^+$ 为后继关系，$e = 0, e^+ = 1, (e^+)^+ = 2, ...$

### 将自然数编码
可以看到，自然数定义中的基本元素是自然数 $e$（即 $0$） 与后继运算 $x^+$。

**定义 b2. 自然数集元素的 Church Number**

很容易得到 $0$ 的 Church Number：
$$ \operatorname{zero} = \lambda sz.z $$

可以认为 $z$ 是 $0$，$s$ 是后继运算。

同样地，$1, 2, ...$ 的 Church Number 是：
$$ \operatorname{one} = \lambda sz.sz $$
$$ \operatorname{two} = \lambda sz.s(sz) $$
$$ ... $$

**代码 b2.**
```haskell
   type Cnum a = (a -> a)   -> a    -> a
--               Successor  -> Zero -> Number

zero :: Cnum a
zero s z = z

one :: Cnum a
one s z = s z

two :: Cnum a
two s z = s (s z)

-- ...
```

### 加法
自然数加法及证明略。

**定义 b3. Church Number 的加法**

$$ \operatorname{add} = \lambda xy. \lambda sz. xs(ysz) $$
这里，$x$ 的 “$0$” 是 $y$，即 $x$ 内部所应用的后继关系并非对于 $0$ 而是对于 $y$，最后结果就是 $x + y$ 而非 $x + 0$。

**代码 b3.**
```haskell
cadd :: Cnum a -> Cnum a -> Cnum a
cadd x y s z = x s (y s z)
```

### 乘法
自然数乘法及证明略。

**定义 b4. Church Number 的乘法**

$$ \operatorname{mul} = \lambda xy. \lambda sz. x(\lambda n. ysn)z = \lambda xy. \lambda s. x(ys)z $$
这里，$x$ 的“后继关系”从“加 $1$”变为了“加 $y$”，应用了 $x$ 遍，结果是 $y \cdot x$ 而非 $1 \cdot x$。

**代码 b4.**
```haskell
cmul :: Cnum a -> Cnum a -> Cnum a
cmul x y s = x (y s)
```

### 幂
自然数幂及证明略。

回顾一下，Church Number 的类型是：

```haskell
   type Cnum a = (a -> a)   -> a    -> a
--               Successor  -> Zero -> Number
```

`(->)` 是右结合的，加对括号也无妨：
```haskell
   type Cnum a = (a -> a) -> (a -> a)
```

这说明了，Church Number 可以看作“接受一个函数，并返回该函数的若干次幂的高阶函数”。这里“幂”的“乘法”是 function compose，即 Haskell 中的 `(.)`，范畴论中的 $\circ$。

Church Number 的幂是这样的：

**定义 b5. Church Number 的幂**

$$ \operatorname{exp} = \lambda xe. ex $$
其中 $x$ 为底数，$e$ 为指数。

可以想见，此函数的类型需要是这样才能工作：

**代码 b5.**
```haskell
cexp :: Cnum a -> (Cnum a -> Cnum a) -> Cnum a
cexp x e = e x
```

第一眼看上去很难懂，我们回到刚才的话题：

> Church Number 可以看作接受一个函数，并返回该函数的若干次幂的高阶函数。

再看一下那个指数的类型：

```haskell
            e :: Cnum a -> Cnum a
{- 展开为 -} e :: ((a -> a) -> (a -> a)) -> ((a -> a) -> (a -> a))
{- 也就是 -} e :: Cnum (a -> a)
```

也就是说，这个指数是一个“高阶 Church Number”，也是一个“函数的 Church Number”。

理解了这个概念，我们再回来看 Church Number 的幂。举一个例子，$2^3 = 2 \cdot 2 \cdot 2$ 在 Church Number 中就变为了将一个 Church Number，也是一个函数，组合 3 次：

$$ C_2 \circ C_2 \circ C_2 $$

其中 $C_2$ 为 $2$ 的 Church Number。这也就是说，那个“高阶 Church Number”其实就是 $C_3$，$3$ 的 Church Number。

归约一下看看，就会发现我们的思路是正确的：

$$ C_2 ^ {C_3} (\lambda z. z^+)0 $$
$$ = C_3 C_2 (\lambda z. z^+)0 $$
$$ = (C_2 \circ C_2 \circ C_2)(\lambda z. z^+)0 $$
$$ = (C_2(C_2(C_2(\lambda z. z^+))))0 $$
$$ = (C_2(C_2(\lambda z. z^{++})))0 $$
$$ = (C_2(\lambda z. z^{++++}) ))0 $$
$$ = (\lambda z.z^{++++++++})0 $$
$$ = 8. $$

### 减法
等有时间再填.jpg

## 可以做的 Codewars 题
- [Church Booleans (5 kyu)](https://www.codewars.com/kata/5ac739ed3fdf73d3f0000048)
- [Church Numbers - Add, Multiply, Exponents (3 kyu)](https://www.codewars.com/kata/55c0c452de0056d7d800004d)
