---
title: Arend 教程，第一部分：2. 命题与证明
date: Fri Jul 24 2020 09:04:29 GMT+0800 (GMT+08:00)
category:
  - 编程语言
  - 形式化
  - Arend
  - 翻译
---

*本文翻译自* [Arend Tutorial, Part I, Propositions and Proofs](https://arend-lang.github.io/documentation/tutorial/PartI/propsnproofs) *，原作者为 [JetBrains Research HoTT and Dependent Types Group (V. Isaev, F. Part and S. Sinchuk)](https://github.com/arend-lang)。原作品在 Apache 2.0 协议下发表。*

在本章中，我们将介绍如何在 Arend 中表述并证明命题。我们会展示表达若干逻辑连接词的方法，并说明他们是如何满足特定的性质的。

# 柯里-霍华德对应

Arend 是基于 Martin-Lof 类型论的一个变种而开发的。这类理论中并不存在一种专门用来表达命题和证明的逻辑语言。相反地，他们通过柯里-霍华德对应来将命题编码为类型。假命题对应的是空类型，而真命题对应的是单元类型。一个类型的不同元素可以被认为是证明一个命题的不同方法。举个例子，自然数类型就对应了“自然数存在”这个命题，而这个类型的每个元素就是这个命题的一个证明。

> 注意：这个对应关系会在本教程的[第二部分]()被更为精确地阐述，到时候我们会看到并不是每个类型都应该被看作一个命题。

我们现在来展示空类型 `Empty` 如何对应到逻辑假。因为我们可以从 `Empty` 的一个元素构造出任何类型的元素，所以我们可以证明逻辑假蕴涵了任何命题：

```arend
\func absurd {A : \Type} (e : Empty) : A
-- 这个定义里没有任何模式，因为 Empty 没有构造器。

-- 我们也可以通过荒谬模式来更加显式地表达这个定义。
-- 荒谬模式表明了某个变量所属的数据类型并没有任何构造器。
-- 如果使用了这个模式，那么这个子句的右手边应该被省略掉。
\func absurd' {A : \Type} (e : Empty) : A \elim e
  | () -- 荒谬模式
```

当然，我们也可以证明 `Unit` 类型对应到了逻辑真。这只需要我们构造这个类型的一个值：

```arend
\func Unit-isTrue : Unit => Unit
```

要表述更加复杂的命题，我们需要定义若干种逻辑连接词，比如合取 `&&`、析取 `||`、蕴涵 `->` 和否定 `Not`。我们先从蕴涵开始。如果 `P -> Q` 为真，那么 `P` 为真就蕴涵了（或表明了） `Q` 为真。那么，我们可以把 `P -> Q` 的证明看作一个将 `P` 的证明转换为 `Q` 的证明的函数。换言说，对应到逻辑蕴涵的类型就是函数类型 `P -> Q`。

现在，我们已经可以证明许多重言式的命题了。举个例子，恒等函数证明了对于所有命题 `P`，`P -> P` 成立；常量函数 `\lam x y => x` 证明了 `P -> Q -> P`；组合函数 `\lam g f x => g (f x)` 证明了 `(Q -> S) -> (P -> Q) -> P -> S`。

> 练习 1：证明 `(P -> Q -> R) -> (P -> Q) -> P -> R`。

> 练习 2：证明 `((P -> Q -> R) -> P) -> (P -> R) -> R`。

因为 `P && Q` 为真当且仅当 `P` 为真且 `Q` 为真，所以我们可以把 `P && Q` 的一个证明看作一个对，其中包含一个 `P` 的证明和一个 `Q` 的证明。换言说，对应到 `P && Q` 的类型就是对类型：

```arend
\func \infixr 3 && (P Q : \Type) => \Sigma P Q
```

证明合取公理很简单：

```arend
-- 这个函数证明了 P -> Q -> (P && Q)
\func &&-intro {P Q : \Type} (p : P) (q : Q) : \Sigma P Q => (p, q)

-- 这个函数证明了 (P && Q) -> P
\func &&-elim1 {P Q : \Type} (t : \Sigma P Q) : P => t.1

-- 这个函数证明了 (P && Q) -> Q
\func &&-elim2 {P Q : \Type} (t : \Sigma P Q) : Q => t.2
```

`P || Q` 的一个证明要么是 `P` 的证明，要么是 `Q` 的证明。所以，这个连接词对应到的类型是和类型：

```arend
\data \infixr 2 || (P Q : \Type)
  | inl P
  | inr Q
```

证明析取公理也很简单：

```arend
-- 这个函数证明了 P -> (P || Q)
\func ||-intro1 {P Q : \Type} (p : P) : P || Q => inl p

-- 这个函数证明了 Q -> (P || Q)
\func ||-intro2 {P Q : \Type} (q : Q) : P || Q => inr q

-- 这个函数证明了 (P -> R) -> (Q -> R) -> (P || Q) -> R
\func ||-elim {P Q R : \Type} (l : P -> R) (r : Q -> R) (x : P || Q) : R \elim x
  | inl p => l p
  | inr q => r q
```

> 练习 5：证明 `(P -> R) -> (Q -> R) -> P || Q -> R`。

> 练习 6：证明 `((P || Q) -> (P && Q)) -> ((P -> Q) && (Q -> P))`。

否定类型 `Not P` 可以用逻辑蕴涵定义为 `P -> Empty`。

> 注意：Arend 使用的逻辑是直觉逻辑。也就是说，排中律、双重否定的消去以及其他在经典逻辑中有效的定律在 Arend 中是无法证明的。这是因为在直觉逻辑中，合取 `P && Q` 并不能表达成 `Not (Not P || Not Q)`，析取 `P || Q` 不能表达成 `Not (Not P && Not Q)`，蕴涵 `P -> Q` 也不能表达成 `Not P || Q`。

> 练习 7：罗素悖论表明了不存在“所有集合”的集合。如果这个集合存在，那么我们就可以构造集合 `B`，其中包含“所有不包含自身的集合”。于是，`B` 属于 `B` 当且仅当他不属于 `B`，而这显然蕴涵了矛盾。康托尔定理表明不存在从集合 `X` 到其幂集的满射。他的证明同样构造了一个命题，这个命题为真当且仅当他为假。试证明任意一个这种命题都蕴涵了矛盾。

我们现在来讨论量词。命题 `forall (x : A). P(x)` 的证明应该对于 `A` 类型的任意元素 `a` 都能给出 `P(a)` 的证明。因此，这个命题对应到了依赖函数类型 `\Pi (x : A) -> P x`。命题 `exists (x : A). P(x)` 应当能够给出 `A` 的某个元素 `a` 和一个 `P(a)` 成立的证明。因此，这个命题对应到了依赖对类型 `\Sigma (x : A) (P x)`。

> 练习 8：证明如果对于所有 `x : Nat` 有 `P x` 成立，那么存在某个 `x : Nat` 使得 `P x` 为真。

> 练习 9：证明如果不存在 `x : Nat` 使得 `P x` 为真，那么 `P 3` 为假。

> 练习 10：证明如果对于所有 `x : Nat`，`P x` 都蕴涵了 `Q x`，那么命题“存在某个 `x : Nat` 使得 `P x` 为真”蕴涵了“存在某个 `x : Nat` 使得 `Q x` 为真”。

> 练习 11：证明如果对于所有 `x : Nat` 要么 `P x` 为假要么 `Q x` 为假，那么 `P 3` 蕴涵了 `Q 3` 为假。

# 命题和证明的几个例子

下面是使用我们刚才谈到的内容进行命题和证明的几个例子。为了方便表达命题，我们定义一个函数 `T` 来将 `true : Bool` 映射到真命题（即 `Unit` 类型）并将 `false : Bool` 映射到假命题（即 `Empty` 类型）：

```arend
\func T (b : Bool) : \Type
  | true => Unit
  | false => Empty
```

接着我们来证明关于之前定义的 `Bool` 类型的一些命题。要表达这些命题，我们需要先定义一个谓词来判定 `Bool` 的相等关系：

```arend
\func \infix 4 == (x y : Bool) : Bool
  | true, true => true
  | false, false => true
  | _ , _ => false
```

接下来可以看到，命题 `T (x == x)` 和 `T (not (not x) == x)` 可以通过分类讨论来证明：

```arend
\func not-isInvolution (x : Bool) : T (not (not x) == x)
  | true => unit -- 如果 x 是 true，那么 T (not (not true) == true) 被计算为 Unit
  | false => unit -- 如果 x 是 false，那么 T (not (not false) == false) 被计算为 Unit

-- 相似地，证明 == 的自反性
\func ==-refl (x : Bool) : T (x == x)
  | true => unit
  | false => unit
```

这两个证明中我们在任何一种情况下都直接返回了 `unit`。注意，我们不能去掉分类讨论而直接返回 `unit`，因为 `T (not (not x) == x)` 和 `T (x == x)` 不会被计算为 `Unit`。下面这段代码就不会通过类型检查：

```arend
\func not-isInvolution' (x : Bool) : T (not (not x) == x) => unit
```

用这种方式也不可能证明假命题：

```arend
\func not-isIdempotent (x : Bool) : T (not (not x) == not x)
  | true => {?} -- 这个目标表达式需要一个 Empty 类型的值
  | false => {?} -- 这个目标表达式需要一个 Empty 类型的值

-- 但我们可以证明 not-isIdempotent 的反命题
\func not-isIdempotent' (x : Bool) : T (not (not x) == not x) -> Empty
  | true => \lam x => x -- Empty -> Empty 的证明
  | false => \lam x => x -- Empty -> Empty 的证明
```

我们也可以证明带有量词的命题。比如说，命题“对于所有 `x : Bool` 都存在某个 `y : Bool` 使得 x == y”：

```arend
-- Sigma- 类型在这里用来表示存在量词
\func lemma (x : Bool) : \Sigma (y : Bool) (T (x == y)) => (x, ==-refl x)
```

下面是一个有点拗口的命题的证明：“如果所有 `x : Bool` 都等于自身，那么 `true : Bool` 等于 `true : Bool`。”

```arend
\func higherOrderFunc (f : \Pi (x : Bool) -> T (x == x)) : T (true == true) => f true
```

# 相等类型

我们为 `Bool` 定义的相等性 `==` 并不能令人满意。这个定义只能作用于 `Bool`，而对于其他所有类型我们都要做出类似的定义，然后证明这是相等关系。

所以，我们并不这么做，而是定义一个对于所有类型的相等类型。这个定义已经包含在 Prelude 里了（即 `Path` 类型和他的中缀表达 `=`）。我们不会马上深入讨论这个话题，因为现在我们只需要自反性的证明 `idp : a = a`，他同样也被包含在 Prelude 里了。

现在，所有通过 `==` 证明的相等性也可以类似地通过 `=` 证明。比如，等式 `not (not x) = x`：

```arend
\func not-isInvolution'' (x : Bool) : not (not x) = x
  | true => idp
  | false => idp
```

并且我们仍然不能证明假命题：

```arend
\func not-isIdempotent'' (x : Bool) : not (not x) = not x
  | true => {?} -- 这个目标表达式需要一个 true = false 的证明，这是不可能构造出来的
  | false => {?} -- 这个目标表达式需要一个 false = true 的证明，这是不可能构造出来的
```

> 练习 12：证明 `and` 和 `or` 的结合性。

> 练习 13：证明 2 * 2 等于 4。

> 练习 14：证明列表串接的结合性。

# 附. 术语表

本翻译版本所使用的术语表。一些不确定是否该如此翻译的术语标*号，等待后续改正。

- Curry-Howard correspondence：柯里-霍华德对应
- connective：连接词
- absurd：荒谬
- imply：蕴涵
- conjunction：合取
- disjunction：析取
- sum type：和类型
- intuitionistic：直觉（的）
- law of excluded middle：排中律
- double negation：双重否定
- eliminate：消去
- Russell's paradox：罗素悖论
- contradiction：矛盾
- Cantor's theorem：康托尔定理
- quantifier：量词
- predicate：谓词
- reflexivity：自反（性）
- negation：否定、反命题
- *identity type：相等类型
- goal：目标
- assocative：结合（的）
- concatenate：串接
