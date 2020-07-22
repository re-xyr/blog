---
title: Arend 教程 Part I：1. 基础
date: Wed Jul 22 2020 19:48:19 GMT+0800 (GMT+08:00)
category:
  - 编程语言
  - 形式化
  - Arend
  - 翻译
---
*本文翻译自* [Arend Tutorial, Part I, Basics](https://arend-lang.github.io/documentation/tutorial/PartI/synndef) *，原作者为 [JetBrains Research (Valis and Part-xx)](https://github.com/arend-lang)。原作品在 Apache 2.0 协议下发表。*

在本章里，我们将介绍 Arend 语言的语法和一些基本结构，以便接下来学习书写定义、命题和证明。

Arend 有这几种定义：函数、数据、类和记录。现在我们先考滤函数和数据定义；关于类和记录的详细讲解留到[记录和类](records.md)一章。

Arend 本身内置了一些最最基础的定义，并且把他们放在了 Prelude 模块中。比如，Prelude 包含了 `Nat` 和 `Int` 类型——分别用来存储自然数和整数——以及相等性类型 `=`。

# 词法结构

Arend 里的所有关键字都由反斜线 `\` 打头。比如说，函数和数据定义分别由 `\func` 和 `\data` 开头。

如果数字字面量在项中出现，那么他们总是被解释为 `Nat` 或 `Int` 类型的值；非负的数字字面量是 `Nat` 类型的，而负的数字字面量是 `Int` 类型的。

Arend 在标识符的选择中提供了相当大的自由度。除了一小部分例外，Arend 中定义、变量等的名字可以包含大小写字母、数字以及 `~!@#$%^&*-+=<>?/|[]:_` 中的任意字符。

# 函数

函数定义由 `\func` 关键字打头。Arend 中的函数是数学意义上的函数。这也就是说，他们是*纯粹*的，而且不会和环境进行 I/O 交互。

一个函数的定义至少要包含函数的名字和函数体。比如说，值为 0 且没有参数的常量函数 `f` 可以如此定义：

```arend
\func f => 0 -- 常量函数
{- Haskell:
   f = 0
-}
```

`f` 的函数体只包括一个数字 `0`（它的类型是 `Nat`）。类型检查器推断出来 `f` 的结果类型也为 `Nat`，但是我们也可以显式指定这个类型：

```arend
\func f' : Nat => 0 -- 常量，带有显式指定的类型
{- Haskell:
   f :: Nat
   f = 0
-}
```

如果要定义一个有参数的函数，我们可以在函数的名字后面指定它的参数和参数的类型，就像下面这样：

```arend
\func id (x : Nat) => x -- 自然数的恒等函数
\func id' (x : Nat) : Nat => x -- 跟上一个一样，但是有显式指定的结果类型
{- Haskell:
   id :: Nat -> Nat
   id x = x
-}
\func foo (x _ : Nat) (_ : Int) => x -- 返回第一个参数
{- Haskell:
   foo :: Nat -> Nat -> Int -> Nat
   foo x y z = x
-}
```

在 `foo` 的定义中可以看到，我们可以忽略掉没用到的参数的名字，用一个占位符 `_` 作替代。如果有几个相邻的参数有相同的类型，那么就可以把他们合并起来：`(x _ : Nat)` 和 `(x : Nat) (_ : Nat)` 是等价的。

注意在 Arend 里，参数的类型必须指定，这跟 Haskell 是不一样的：

```arend
-- \func id'' x => x -- 这个定义是错的！
{- Haskell:
   id'' x = x
-}
```

函数的参数也可以通过 lambda 表达式被等价地从签名上移到函数体里：

```arend
-- 参数的类型不能被推断出来，和前面提到的相同
\func foo' => \lam (x _ : Nat) (_ : Int) => x
-- 但是如果结果类型被显式指定了，那么参数的类型就可以省略掉
\func foo'' : Nat -> Nat -> Int -> Nat => \lam x _ _ => x  
{- Haskell:
   foo'' :: Nat -> Nat -> Int -> Nat
   foo'' = \x y z -> x
-}
```

在这个例子里，我们直接通过在 `=>` 后书写一个项就定义了函数体。当然，定义函数也有更加复杂的方法，这种方法在定义递归函数之类的函数时会派上用场。这种方法叫做*模式匹配*，我们[马上](#数据定义)就会学习这种函数。

# 中缀运算符

所有的二元运算符默认是前缀的，就跟普通函数一样。如果要定义一个中缀运算符，则应该在运算符的名字前加上关键字 `\infix`、`\infixl` 或 `\infixr` 的其中一个，再加上一个正整数表明它的优先级：

```arend
\func \infixl 6 $$ (x y : Nat) => x
\func test => 3 $$ 7 -- test 返回 3
{- Haskell:
   infixl 6 $$
   ($$) x y = x
   test = 3 $$ 7
-}
```

优先级可以是 1 到 9 之间的任何正整数。

任何二元运算符，即使没被定义成中缀的，也可以在两边加上 `` ` ` `` 后以中缀方式使用。

```arend
\func ff (x y : Nat) => x
\func ff_test => 0 `ff` 1
{- Haskell:
   ff x y = x
   ff_test = 3 `ff` 7
-}
```

中缀运算符也可以以前缀方式使用：

```arend
\func \infix 6 %% (x y : Nat) => x
\func %%-test => %% 3 7 -- 不需要写 (%%)
{- Haskell:
   infix 5 %%
   (%%) x y = x
   pp_test = (%%) 3 7
-}
```

> 练习 1：定义函数 `f1`、`f2`、`f3`、`f4`、`f5` 和 `f6` 的优先级，使得函数 `test` 通过类型检查。

```arend
\func f1 (x y : Nat) => x
\func f2 : Nat => 0
\func f3 (f : Nat -> Nat) (z : Nat) : Int => 0
\func f4 : Nat => 0
\func f5 => f1
\func f6 => f4

\func test => f1 f2 f3 f4 f5 f6
```

# 数据定义

数据定义允许我们通过指定「生成元素」来定义定义新的*归纳类型*和*高阶归纳类型*，这些「生成元素」叫做*构造器*。

最简单的情况是构造器没有任何参数，此时一个归纳类型只是它的构造器构成的有限集合。例如，空类型 `Empty`、有一个元素的单元类型 `Unit` 和有两个元素 `true`、`false` 的布尔类型 `Bool` 可以如下定义：

```arend
\data Empty
{- Haskell:
   data Empty
-}

\data Unit | unit
{- Haskell:
   data Unit = Unit
-}

\data Bool | false | true
{- Haskell:
   data Bool = False | True
-}
```

定义一个 `Bool` 的函数基本上就是通过称为*模式匹配*的方法，分别定义它在 `true` 和 `false` 时的值。比如，函数 `not` 和 `if` 可以这样定义：

```arend
\func not (x : Bool) : Bool \with -- 可以省略关键词 \with
  | true => false
  | false => true
{- Haskell:
   not :: Bool -> Bool
   not True = False
   not False = True
-}

\func if (x : Bool) (t e : Nat) : Nat \elim x
  | true => t
  | false => e
{- Haskell:
   if :: Bool -> Nat -> Nat -> Nat
   if True t e = t
   if False t e = e
-}
```

许多时候，归纳类型有一些有参数的构造器。和函数的参数不同的是，我们可以省略参数名称，写 `cons T` 而非 `cons (_ : T)`。

这些参数的类型可能是正在定义的这个归纳类型本身，一会我们就会在定义自然数时看到这种情况。然而有一个重要的限制：所有归纳类型在它的构造器的参数类型中必须是*严格为正*的，也就是说，这个类型不能出现在 `->` 的左边。一旦没有这个限制，那么我们就可以定义「无类型 lambda 演算的所有项」的类型 `K`。更进一步地，不会停机的项就可以是 `K` 的元素。

```arend
\data K | k (K -> K)
\func I => k (\lam x => x)
\func Kc => k (\lam x => k (\lam _ => x))
\func app (f a : K) : K \elim f
  | k f' => f' a
\func omega => k (\lam x => app x x)
```

看另一个例子——表示自然数的类型。Prelude 中的 `Nat` 类型和 `+`、`*` 运算符可以定义如下：

```arend
\data Nat | zero | suc Nat

-- 这两个函数是等价的
\func three => suc (suc (suc zero))
\func three' => 3

-- 数字没有大小限制
\func bigNumber => 1000000000000000000000000

\func \infixl 6 + (x y : Nat) : Nat \elim y
  | 0 => x
  | suc y => suc (x + y)
{- Haskell:
   (+) :: Nat -> Nat -> Nat
   x + Zero = x
   x + Suc y = Suc (x + y)
-}

-- 设 n 是一个变量，那么 n + 2 就会被展开成 suc (suc n)，
-- 但是 2 + n 不会，因为它已经是标准形式了。
-- 这个行为视 + 的定义而定，更精确地说，
-- 是视选择哪一个参数进行模式匹配而定。

\func \infixl 7 * (x y : Nat) : Nat \elim y
  | 0 => 0
  | suc y => x * y + x
{- Haskell:
   (*) :: Nat -> Nat -> Nat
   x * Zero = 0
   x * Suc y = x * y + x
-}
```

这并不是定义自然数的唯一方式。刚才这个例子对应的是一元（一进制）的自然数表示。二元（二进制）的自然数可以像下面这样定义：

```arend
\data BinNat
    | zero'
    | sh+1 BinNat -- x*2+1
    | sh+2 BinNat -- x*2+2
```

从效率上看，这种定义很明显更优秀。然而，和上面 `Nat` 的定义相比，在利用归纳法的证明中使用 `BinNat` 这种定义非常不方便。事实上，Prelude 中的 `Nat` 类型也很有效率，因为它的算术运算的实现是单独硬编码的。

> 练习 2：定义函数 `if`，使其接受一个布尔值 `b` 和两个任意类型 `A` 的值，并当 `b` 等于 `true` 时返回第一个值，否则返回第二个。

> 练习 3：用 `if` 定义 `||`。

> 练习 4：定义自然数的幂和阶乘函数。

```arend
\func \infixr 8 ^ (x y : Nat) => {?}

\func fac (x : Nat) => {?}
```

> 练习 5：定义取模函数 `mod` 和最大公约数函数 `gcd`。

# 停机，div

函数可以是递归的，但是他们不能随意地调用自己。如果对递归不加以限制，那么任何一个命题都可以被平凡地证明：

```arend
\func theorem : 0 = 1 => theorem
```

在依赖类型语言中，类型检查需要检查函数是否停机。这也就是说，语言不能是图灵完全的，因为在这种情况下停机问题是不可判定的。

内涵的 Martin-Lof 类型论可以避免这种问题，因为它确保了所有可以定义的函数都是*完全的*，也就是在任何输入上都会停机。因此，许多定理证明器都在他们类型系统的核心中包含 Martin-Lof 类型论，以此来确保所有函数都停机，并且所有递归函数都是通过*结构化递归*定义的。Arend 也是如此。

举个例子，考虑一下自然数的整除函数 `div`。一个显然（但不正确）的定义可能像下面这样：

```arend
\func div (x y : Nat) : Nat => if (x < y) 0 (suc (div (x - y) y))
```

这个定义有两个问题。1）`div x 0` 不会停机；2）这个递归不是结构化的，因为结构化递归要求递归调用时的参数在比结构上原本的参数更简单。

很多情况下，我们可以通过添加额外的参数来把非结构化递归转换为结构化递归（这些额外的参数会随着递归层数加深而变得结构更为简单）。这个参数的初值可以设定为递归次数的上界：

```arend
\func div (x y : Nat) => div' x x y
  \where
    \func div' (s x y : Nat) : Nat \elim s
        | 0 => 0
        | suc s => if (x < y) 0 (suc (div' s (x - y) y))
```

# 多态

一些定义是多态的，也就是说他们以类型作为参数。这种定义的开头可以使用所有类型的类型 `\Type`。比如说，多态的恒等函数可以这样写：

```arend
\func id (A : \Type) (a : A) => a
{- Haskell:
   id :: a -> a
   id x = x
-}

\func idType : \Pi (A : \Type) (a : A) -> A => id
{- Haskell:
   idType :: a -> a
   idType = id
-}
```

类型 `\Pi (a : A) -> B` 叫做依赖函数类型，它是普通函数类型 `A -> B` 的推广。依赖函数的值域可能会因为参数的改变而改变。比如说，类型 `\Pi (b : Bool) -> if b Nat Bool` 是这样一个函数的类型：它接受一个 `Bool` 类型的参数，并且视参数返回 `Nat` 或 `Bool`——如果 `b` 是 `true`，则返回一个 `Nat`；否则返回一个 `Bool`。

类型 `\Pi (A : \Type) (a : A) -> A` 也可以等价地写成 `\Pi (A : \Type) -> A -> A`，因为它的值域并不依赖第二个参数。这个类型的意思就是，一个接受某个类型 `A` 并返回「一个类型为 `A -> A` 的函数」的函数。

需要注意的是，`\Type` 事实上并不是*所有类型*的类型；著名的 Girard 悖论表明，内涵的 Martin-Lof 类型论和所有类型的类型并非连贯一致。要解决这个问题，我们将会引入一个全集的等级系统，但这留到[之后](universes.md)再讨论。不过，用户在大多数时候都不需要考虑这些等级，因为他们会自动被推断并对用户隐藏起来；除非用户进行了不允许的循环定义，此时类型检查器会给出一个错误。

# 隐式参数

在应用函数时，经常会有一些参数是完全被其他参数所确定的。在这种情况下，用户可以让类型检查器推断这些参数并用 `_` 作为占位符替代实际的参数。比如说，刚才定义的多态 `id` 函数可以像这样应用：

```arend
\func idTest => id _ 0
```

其中类型检查器可以推断出来第一个参数为 `Nat`，因为这个参数必定是第二个参数的类型（也就是 `Nat`）。如果类型检查器无法推断出来一个参数应该是什么，那它就会生成一个错误。

如果我们发现一个定义的某个参数几乎总是被其他参数指定，那么我们就可以通过将这个参数放在花括号里来把它指定为*隐式参数*。这样，这个参数就可以被直接跳过：

```arend
\func id' {A : \Type} (a : A) => a

\func id'Test => id' 0
\func id'Test' => id' {Nat} 0 -- 隐式参数也可以被显式指定
```

当然，进行参数推断的算法也不是全能的。比如下面这个例子：

```arend
\func example' {n : Nat} (p : n + n = 3) => 0
```

算法并不能从 `p` 推断出来 `n`，因为 `n` 是在函数 `+` 的调用中出现的。如果我们调用 `example' pp`（其中 `pp : 8 = 3`），算法是不会推断出 `n` 为 `4` 的。

然而，算法可以推断出来下面这个例子中的 `n` 和 `m`：

```arend
\func example'' {n m : Nat} (p : suc n = m) => 0
\func example''Test (pp : 8 = 3) => example'' pp
```

造成这种区别的原因是，在这个例子中 `n` 和 `m` 是在构造器（`suc`）和 `\data`（`=` 是用 `Path` 定义的，而 `Path` 是一个数据类型）的调用中出现的。因为 `\data` 和构造器是单射的，所以算法总是可以推断出 `n` 和 `m`。比如，在 `example'' pp`（其中 `pp : 8 = 3`）中，算法可以推断出来 `m` 必定为 `3` 而 `n` 必定为 `7`。

# 列表，append

到现在我们已经讨论了定义多态的列表类型所需的全部内容：

```arend
\data List (A : \Type) | nil | cons A (List A)
{- Haskell:
   data List a = Nil | Cons a (List a)
-}

-- 数据类型的所有参数都是它的构造器的隐式参数
\func emptyList => nil {Nat}

-- 运算符 'append'
\func \infixl 6 ++ {A : \Type} (xs ys : List A) : List A \elim xs
  | nil => ys
  | cons x xs => cons x (xs ++ ys)
{- Haskell:
   (++) :: List a -> List A -> List a
   Nil ++ ys = ys
   cons x xs ++ ys = cons x (xs ++ ys)
-}
```

> 练习 6：定义 map 函数。

> 练习 7：定义 transpose 函数。它接受一个列表的列表，并将它视为一个矩阵，返回其转置后的结果（也是一个列表的列表）。

# 元组和 Sigma- 类型

对于两个类型 `A` 和 `B`，我们可以构造一个所有对 `(a, b)` 的类型 `\Sigma A B`，其中 `a : A`、`b : B`。类型 `\Sigma A B` 等价于下面定义的数据类型：

```arend
\data Pair | pair A B
```

更广泛地说，任意一组类型 `A1`、...、`An` 都可以构成所有元组 `(a1, ..., an)` 的类型 `\Sigma A1 ... An`，其中 `ai : Ai`。平凡地，`\Sigma` 等价于只有一个元素的 `Unit` 类型。

元组可以是依赖的，其中每个类型 `Ai` 可以依赖于 `a1`、...、`a{i-1}`。来看几个 `\Sigma-` 类型的例子：

- 类型 `\Sigma (A : \Type) (A -> A)` 包含了所有对 `(A, f)`，其中 `A` 是一个类型而 `f` 是一个 `A -> A` 的函数。
- 类型 `\Sigma (b : Bool) (if b Nat Bool)` 包含了所有对 `(b, e)`，其中 `b` 是一个布尔值而 `e` 是一个 `if b Nat Bool`。比如，`(true, 7)` 和 `(false, true)` 属于这个类型，但是 `(false, 7)` 和 `(true, true)` 则不属于。
- 我们之后会看到，对于任意一对自然数 `n, m : Nat`，都存在一个类型 `n < m`，表达了其中一个小于另一个，而这个类型的值就是这个命题的证明。于是我们可以定义类型 `\Sigma (n : Nat) (n < 10)`，它包含了所有小于 `10` 的自然数。更准确地说，这个类型包含了所有对 `(n, p)`，其中 `n` 是一个自然数而 `p` 是它小于 `10` 的证明。
- 一个更有趣的例子：类型 `\Sigma (n : Nat) (\Sigma (k : Nat) (n = k * k))` 包含了所有是平方数的自然数 `n`，更准确地说，它包含了所有对 `(n, p)`，其中 `n` 是一个自然数而 `p : \Sigma (k : Nat) (n = k * k)` 是 `n` 为平方数的证明。

如果 `x` 是类型 `\Sigma A1 ... An` 的一个值，则 `x` 的第 i 个成员（i 是一个数字字面量）可以通过射影运算符 `x.i` 访问。注意 eta 等价性对于 Sigma- 类型是成立的：如果 `x : \Sigma A1 ... An`，那么 `(x.1, ..., x.n)` 与 `x` 在计算上是相等的。

# 类型别名

在依赖类型语言中不需要类型别名，因为我们可以直接定义一个函数返回某个类型，而这个函数就成为了那个类型的别名：

```arend
\func NatList => List Nat
{- Haskell:
   type NatList = List Nat
-}
```

# 命名空间和模块

可以在一个定义后面添加一个 `\where` 块。和 Haskell 不同的是，`\where` 块是由整个定义共享的，而不是特定的某个子句：

```arend
\func f => g \where \func g => 0
```

在 `\where` 块中的定义几乎和普通的定义行为完全相同。仅有的区别是，它有不同的命名空间：

```arend
\func gTest => f.g
```

另外，我们也可以使用 `\let`，但它比 Haskell 中的 'let' 更为简单且受限。在 Arend 里，`\let` 不能包含递归函数，并且每个变量只能依赖它之前定义的变量：

```arend
\func letExample => \let
    | x => 1
    | y => x + x
    \in x + y * y
```

在 Arend 中，定义可以通过模块来分组：

```arend
\module M1 \where {
    \func f => 82
    \func g => 77
    \func h => 25
}

-- 定义 f、g 和 h 在当前命名空间不可用
-- 应该通过前缀 M1. 来访问他们
\func moduleTest => (M1.f,M1.g,M1.h)
```

如果一个模块被通过 `\open` 命令打开，那么它的定义可以直接被访问且无需前缀：

```arend
\module M2 \where {
   \open M1
   \func t => f
   \func t' => g
   \func t'' => h
}
```

也可以只打开一个模块的一部分定义：

```arend
\module M3 \where {
   \open M1(f,g)
   \func t => f
   \func t' => g
   \func t'' => M1.h -- h 没有被打开，所以必须通过前缀访问
}
```

所有定义都有一个对应的模块：

```arend
\module M4 \where {
   \func functionModule => 34
     \where {
       \func f1 => 42
       \func f2 => 61
       \func f3 => 29
     }
   \func t => functionModule.f1
   \func t' => functionModule.f2
   \func t'' => (f1, f3)
     \where \open functionModule(f1,f3) 
	-- 这个 \open 影响到 t'' 的 \where- 块，同时也影响 t'' 本身
}
```

命令 `\import X` 使得文件 X 在当前文件中可见。`\import` 同时也做了 `\open` 做的事，并且所有 `\open` 的语法也可以应用到 `\import` 上：

```arend
-- 源码目录下应该包含一个叫做 Test.ard 的文件（并且包含 foobar 和 foobar2 的定义）
-- 以及一个叫做 TestDir 的目录，里面包含文件 Test.ard 和 Test2.ard。

\import Test (foobar \as foobar', foobar2)
\import TestDir.Test
-- 如果我们想让一个文件可见，但不想打开它，那么可以这样写：
\import TestDir.Test2()
```

