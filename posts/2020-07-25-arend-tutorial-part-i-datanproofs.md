---
title: Arend 教程，第一部分：3. 索引数据类型
date: Sat Jul 25 2020 07:19:19 GMT+0800 (中国标准时间)
category:
  - 编程语言
  - 形式化
  - Arend
  - 翻译
---

在本章里，我们将会通过一系列定义和证明的例子来解释先前我们讨论过的一些概念。

我们将定义函数 `sort`，他通过插入排序来排序列表；我们还将定义函数 `reverse` 来翻转列表。

我们还会讨论两个证明。我们将证明，`reverse` 是一个对合，并且 `+ : Nat -> Nat -> Nat` 是结合的。

接下来，我们会举出几个数据类型的例子。对于给定的类型 `A`，我们会给出两种 `A` 的定长向量的定义，其中一种基于*带构造器模式的数据类型*。最后，我们会讨论如何定义「所有有限集合」的类型。

# 插入排序和翻转

在依赖类型语言中，定义起来最简单的排序算法是插入排序。插入排序所使用的递归方法跟 `List` 的归纳定义是相对应的。

如果我们的列表是 `nil`，那么我们只需要返回 `nil`。如果列表是 `cons x xs`，那么我们在 `xs` 上递归地调用排序并使用（同样基于 `List` 上的递归而定义的）函数 `insert` 将 `x` 插入排序结果。

```arend
\func if {A : \Type} (b : Bool) (t e : A) : A \elim b
  | true => t
  | false => e

\func sort {A : \Type} (less : A -> A -> Bool) (xs : List A) : List A \elim xs
  | nil => nil
  | cons x xs => insert less x (sort less xs)
  \where
    \func insert {A : \Type} (less : A -> A -> Bool) (x : A) (xs : List A) : List A \elim xs
      | nil => cons x nil
      | cons x' xs => if (less x x') (cons x (cons x' xs)) (cons x' (insert less x xs))
```

如果谓词 `less` 定义了一个线性序，那么 `sort` 函数的结果就会是参数 `xs` 的排序后的排列。我们可以在 Arend 里这样描述 `sort` 的正确性：

```arend
\func isLinOrder {A : \Type} (lessOrEq : A -> A -> Bool) : \Type => {?}
\func isSorted {A : \Type} (lessOrEq : A -> A -> Bool) (xs : List A) : \Type => {?}
-- isPerm 表明 xs' 是 xs 的一个排列
\func isPerm {A : \Type} (xs xs' : List A) : \Type => {?}
\func sort-isCorrect {A : \Type} (lessOrEq : A -> A -> Bool) (p : isLinOrder lessOrEq) (xs : List A)
       : \Sigma (isSorted lessOrEq (sort lessOrEq xs)) (isPerm xs (sort lessOrEq xs)) => {?}
```

利用我们到现在为止介绍的语言工具来书写这些谓词的定义和 `sort-isCorrect` 的证明是可能的。但是，在接下来几章中我们会看到有更好的方法，所以现在我们先省略这些细节。[之后](univserses)会给出一个明确的证明。

我们现在考虑一个更简单的列表操作——翻转。我们在这里定义函数 `reverse`，他使用一个附加的函数来翻转列表 `xs`，这个附加的函数将翻转后的子列表累加在额外的参数 `acc` 上：

```arend
\func reverse {A : \Type} (xs : List A) : List A => rev nil xs
  \where
    \func rev {A : \Type} (acc xs : List A) : List A \elim xs
      | nil => acc
      | cons x xs => rev (cons x acc) xs

-- reverse (cons x xs) => rev nil (cons x xs) => rev (cons x nil) xs
-- reverse (reverse (cons x xs)) => reverse (rev (cons x nil) xs) => rev nil (rev (cons x nil) xs)
```

下面我们证明 `reverse` 是一个对合。

# 证明的例子：`+-assoc` 和 `reverse-isInvolutive`

如果你尝试直接通过归纳来证明 `reverse (reverse xs) = xs`，那么你会在证明 `rev nil (rev (cons x nil) xs) = cons x xs` 时卡住；这是因为归纳假设太弱了。于是，我们应该增强命题，以此来增强归纳假设。这里，我们证明 `reverse.rev` 的一个更加推广的属性，接着推导出 `reverse` 为一个对合的结论：

```arend
\func reverse-isInvolutive {A : \Type} (xs : List A) : reverse (reverse xs) = xs => rev-isInv nil xs
  \where
    \func rev-isInv {A : \Type} (acc xs : List A) : reverse (reverse.rev acc xs) = reverse.rev xs acc \elim xs
      | nil => idp
      | cons x xs => rev-isInv (cons x acc) xs
```

要证明 `+` 的结合性，我们需要 `=` 的合同性，即对于所有 `f : A -> B`、`x, y : A`，如果存在证明 `p : x = y`，那么存在证明 `pmap f p : f x = f y`。要证明 `(x + y) + z = x + (y + z)` 当然需要归纳法，但是我们应该谨慎选择在哪个参数上归纳。这里，因为我们定义了 `+` 是在右手边的参数上进行递归，所以我们应该选择 `z`：

```arend
\func +-assoc (x y z : Nat) : (x + y) + z = x + (y + z) \elim z
  | 0 => idp
  | suc z => pmap suc (+-assoc x y z)
-- 这里我们可以应用 pmap，因为表达式会这样归约：
-- (x + y) + suc z => suc ((x + y) + z)
-- x + (y + suc z) => x + suc (y + z) => suc (x + (y + z))
```

# 定长列表

假定我们现在要实现这样一个函数，他接受一个列表和一个代表索引的自然数，并且返回这个列表中此索引代表的元素。这基本上是不可能的，因为当我们给出一个大于列表长度的索引时我们没法给出结果。解决这个问题的一个方法是，我们传给函数一个「索引小于列表长度」的证明：

> 练习 1：实现函数 `lookup`，他接受一个列表 `xs` 和一个自然数 `n`，并返回列表的第 `n` 个元素。这个函数还应该接受一个 `n` 在正确范围内的证明，即 `T (n < length xs)`。

另外一个解决方法是，我们使用一种*向量*类型，也就是一种固定长度的列表，他的长度由一个参数 `n : Nat` 指定。实现向量的一个方法是定义一个值域为 `\Type` 的递归函数：

```arend
\func vec (A : \Type) (n : Nat) : \Type \elim n
  | 0 => \Sigma
  | suc n => \Sigma A (vec A n)

\func head {A : \Type} (n : Nat) (xs : vec A (suc n)) => xs.1

\func tail {A : \Type} (n : Nat) (xs : vec A (suc n)) => xs.2
```

我们也可以通过实现一个数据类型来定义向量。这有一些难度，因为当 `n` 为某个 `suc m` 时，数据类型 `Vec (A : \Type) (n : Nat)` 有构造器 `fcons A (Vec A m)`，但如果 `n` 为 `0`，那么构造器为 `fnil`。我们可以用*带模式的构造器*来定义这种数据类型：

```arend
\data Vec (A : \Type) (n : Nat) \elim n
  | 0 => fnil
  | suc n => fcons A (Vec A n)

\func Head {A : \Type} {n : Nat} (xs : Vec A (suc n)) : A \elim xs
  | fcons x _ => x

\func Tail {A : \Type} {n : Nat} (xs : Vec A (suc n)) : Vec A n \elim xs
  | fcons _ xs => xs
```

由于多种原因，我们最好用后面这种使用数据类型的定义方法。首先，`Vec` 在这种定义中有具名的构造器，所以我们可以明确看到各种情况下我们在跟哪种构造器打交道。其次，我们可以在模式匹配中用名字来进行匹配，而不是通过 `.1`、`.2` 之类的射影。所以，使用定义 `Vec` 比 `vec` 要方便许多。

下面我们定义两个函数，他们在 `n` 和 `xs` 上均进行递归。函数 `first` 返回一个向量的第一个元素，而 `append` 将一个向量追加到另一个向量。需要注意的是，`first` 的输出在空向量上是没有定义的。通常，我们通过将数据类型 `Maybe` 作为值域来解决这个问题：

```arend
\data Maybe (A : \Type) | nothing | just A

\func first {A : \Type} {n : Nat} (xs : Vec A n) : Maybe A \elim n, xs
  | 0, fnil => nothing
  | suc n, fcons x xs => just x

\func append {A : \Type} {n m : Nat} (xs : Vec A n) (ys : Vec A m) : Vec A (m + n) \elim n, xs
  | 0, fnil => ys
  | suc _ , fcons x xs => fcons x (append xs ys)
```

> 练习 2：对于 `Vec` 与 `vec` 都实现函数 `replicate`（这个函数创建一个给定长度的向量，其中所有元素都是某个给定的值）。

> 练习 3：对于 `Vec` 与 `vec` 都实现函数 `map`。

> 练习 4：对于 `Vec` 与 `vec` 都实现函数 `zipWith`，这个函数必须接受两个长度相等的向量。

# 有限集合与 `lookup`

有许多种方法能够定义一个有限集合类型。比如，我们可以将它定义为 `Nat` 的子类型：

```arend
\func fin (n : Nat) => \Sigma (x : Nat) (T (x < n))
```

或者一个递归函数：

```arend
\func Fin' (n : Nat) : \Set0
  | 0 => Empty
  | suc n => Maybe (Fin' n)
```

或者一个数据类型：

```arend
\data Fin (n : Nat) \with
  | suc n => { fzero | fsuc (Fin n) }
```

考虑几个例子：

```arend
-- Fin 0——空类型
\func absurd {A : \Type} (x : Fin 0) : A

\func fin0 : Fin 3 => fzero
\func fin1 : Fin 3 => fsuc fzero
\func fin2 : Fin 3 => fsuc (fsuc fzero)
-- 下面这行没法通过类型检查
-- \func fin3 : Fin 3 => fsuc (fsuc (fsuc fzero))
```

证明 `Fin 3` 有不超过三个元素很简单。比如，我们可以证明 `Fin 3` 的每个元素要么是 `fin0`，要么是 `fin1`，要么是 `fin2`：

```arend
\func atMost3 (x : Fin 3) : Either (x = fin0) (Either (x = fin1) (x = fin2)) \elim x
  | fzero => inl idp
  | fsuc fzero => inr (inl idp)
  | fsuc (fsuc fzero) => inr (inr idp)
  | fsuc (fsuc (fsuc ()))
```

我们可以证明 `Fin` 嵌入到了 `Nat` 中：

```arend
\func toNat {n : Nat} (x : Fin n) : Nat
  | {suc _}, fzero => 0
  | {suc _}, fsuc x => suc (toNat x)
```

类型 `Fin n` 有时候会很有用，比如给向量定义一个安全的索引函数：

```arend
\func lookup {A : \Type} {n : Nat} (xs : Vec A n) (i : Fin n) : A \elim n, xs, i
  | suc _, fcons x _, fzero => x
  | suc _, fcons _ xs, fsuc i => lookup xs i
```

> 练习 5：函数 `Fin n -> A` 对应到了一个长度为 `n`，元素类型为 `A` 的向量。实现一个函数，将 `Fin n -> A` 转换为 `Vec A n`。

> 练习 6：为矩阵定义一个类型，并给这个类型定义以下函数：对角矩阵、转置、矩阵加法和矩阵乘法。

> 练习 7：定义类型 `CTree A n` 为所有高度恰为 `n` 的满二叉树，其中叶子节点的高度为 `0`，所有非叶子节点都存储一个值。

> 练习 8：定义类型 `Tree A n` 为所有高度最多为 `n` 的二叉树，其中叶子节点的高度为 `0`，所有非叶子节点都存储一个值。同时，定义一个函数来计算树的高度。

# 附. 术语表

本翻译版本所使用的术语表。一些不确定是否该如此翻译的术语标*号，等待后续改正。

- insertion sort：插入排序
- involution：对合
- vector：向量
- reverse：翻转
- reduce：归约
- index：索引
- named：具名（的）
- subtype：子类型
- embed：嵌入
- matrix：矩阵
- diagonal：对角
- height：（树的）高度
- binary tree：二叉树
- internal node：非叶子节点
- leaf：叶子（节点）
