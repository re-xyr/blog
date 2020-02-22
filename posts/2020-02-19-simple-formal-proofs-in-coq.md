---
title: 在 Coq 中使用归纳法验证数学命题
description: 
author: t532
date: Wed Feb 19 2020 23:13:10 GMT+0800 (GMT+08:00)
category:
    - FP
    - 数学
---

# 在 Coq 中使用归纳法验证数学命题

> **Reference.** *Software Foundations Volume 1: Logical Foundations (Chap. 1, 2)*, Benjamin C Pierce et al. 

> 前置知识：皮亚诺公理、数学归纳法。

## 引入

> “非形式化的证明是算法；形式化的证明是程序。”

什么是证明？用白话说，证明是这样一种东西，它能够让读者无可否认的认识到一个命题是成立的。

**非形式化证明**就是给人看的证明，人们通过阅读证明里的自然语言（比如中文说明）和数学符号来认识到命题的正确性；而**形式化证明**是给**定理证明器**看的证明。它是一段程序，里面的语句代表了一些已经证明的逻辑定理，定理证明器通过执行这段程序将命题归约为平凡的结论。

我们平时写的证明都是非形式化的，这也就是说我们需要依靠人类读者（你的老师、你的同学、同行评审，etc）来验证你的证明是否正确。但是，我们也可以通过书写形式化证明，让机器帮忙验证定理的正确性。这带来了若干好处：

- 形式化证明是代码，这也就是说我们可以实现代码复用等，节省了许多重复操作
- 机器帮助你证明，减少了你脑子的负担
- 只要证出来了，结论（几乎）不可能是错的，因为机器（不考虑极端情况）不会出错

接下来就来认识一下形式化证明吧。

## 认识 Coq

> *前置准备：到[这里](https://github.com/coq/coq/releases/tag/V8.11.0) 下载并安装 Coq。*

Coq 是一个**交互式定理证明器**，[四色定理](https://en.wikipedia.org/wiki/Four_color_theorem)（任何地图都可以只用四种颜色上色）就是用它证明的。我们将借助它证明几个简单的定理。

CoqIde 是 Coq 自带的交互环境，~~我觉得它不太好用但是因为是自带的所以这里就用它了~~，我们将全程在这里编写证明。首先在开始菜单中（或者对于 macOS 用户，在 Launchpad 中；对于 linux 用户，自己鼓捣去）找到 `CoqIde` 并打开。

（CoqIde 的界面。）  
![CoqIde 界面](https://cdn.luogu.com.cn/upload/image_hosting/7gxdwma1.png)

> 下文中的每一段代码，你都应该复制到 CoqIde 内左侧的输入框里。
>
> 提供的练习题应该直接写到 CoqIde 里。它们**不是**选做的。如果不做，可能会导致下面的源码无法正常编译。实在不想做可以在本文末尾找到参考答案。

### 类型

Coq 的一大特色是，它并没有所谓“内置的，原始的”类型（比如 C++ 里的 `int`、`bool`、`char` 等）。所有的类型都是通过一种统一的方式定义的。

来看一下在 Coq 中如何定义布尔值：

```coq
Inductive bool: Type :=
  | true
  | false.
```

这里，我们定义了一个 `bool` 类型，有两种构造方式，分别是 `true` 和 `false`，也就是说有两种可能的值。

其中：
- `Inductive <类型名>: Type` 代表了我们正在定义一个**类型**；
- `:=` 是 Coq 用的赋值符号；
- 接下来每一行，由 `|` 打头，后面是这个类型可能的**构造方式**（也就是说，可能的值）；
- 每个 Coq 语句由 `.` 结尾。

复制前面那段代码到 CoqIde 中，点击上端第三个按钮（向下的箭头），右下角的 Log 中会出现一些信息，同时这段代码被染绿，这就说明这个类型被定义了。之后每复制一段代码到 CoqIde 中，都可以单击这个按钮执行，点一次执行一句（也就是执行到下一个句号 `.`）。

（定义类型后的 CoqIde。）  
![定义 bool 类型后的 CoqIde](https://cdn.luogu.com.cn/upload/image_hosting/dj6imzvf.png)

**练习题. Ex 1.** 定义一个类型 `weekday`，让它代表一周内的七天。

```coq
Inductive weekday: Type :=
  (* 把这段注释替换为你的答案 *).
```

### 函数

Coq 作为一门编程语言，当然支持定义函数。但是，正如其他函数式编程语言一样，Coq 只能定义纯函数；更进一步的是，与 Haskell 等语言相比，Coq 只能定义能够终止的函数（无限递归不被允许）。

> 对于看不懂上面一段在说什么的人，详细说明一下：
> - 纯函数是这样一类函数，它能够和数学上的函数等价。这也就是说，纯函数对于相同的输入总是得到相同的结果，并且没有副作用（不更改全局变量，不输出东西到屏幕上，等等）。
> - Coq 只能定义能够终止的函数，所以 Coq 中停机是必然的，所以 Coq 不是图灵完全的。

那么，我们来定义一下对于 `bool` 的操作：取反、与、或、异或。

首先来看一下取反的函数：

```coq
Definition negb (b:bool) : bool :=
  match b with
  | true => false
  | false => true
  end.
```

其中：
- `Definition <函数名> (<参数名>:<参数类型>) : <返回类型>` 是函数的声明；
- `:=` 依旧是赋值符号；
- `match <值> with <模式> end.` 是**模式匹配**。拿前面那段代码具体理解一下：
  - `match b with`：我们要匹配的值是传入的参数 `b`。
  - `| true => false`：如果 `b` 是通过 `true` 构造的，那么返回 `false`；
  - `| false => true`：如果是通过 `false` 构造的，那么返回 `true`；
  - `end.`：结束。

（定义函数后的 CoqIde。）  
![添加函数定义后的 CoqIde](https://cdn.luogu.com.cn/upload/image_hosting/ja5i3aek.png)

同时，也可定义接受多个参数的函数。这里定义一下逻辑与（$A \land B$）：

```coq
Definition andb (b:bool) (c:bool) : bool :=
  match b with
  | true => c
  | false => false
  end.
```

**练习题. Ex 2.** 定义对于类型 `bool` 的逻辑或（命名为 `orb`）和异或（命名为 `xorb`）的函数。
```coq
Definition orb (b c: bool): bool :=
  (* 把这段注释替换为你的答案 *).
Definition xorb (b c: bool): bool :=
  (* 把这段注释替换为你的答案 *).
```

## 平凡的证明

先来解决一些平凡的命题。

**例. ${\rm true} \land {\rm true} = {\rm true}.$**

这个命题很平凡。我们来看一下，在 Coq 中如何表达它：`Theorem t_and_t_eq_t: (andb true true = true).`

其中：
- `Theorem <命题名>: <命题>.` 声明了一个命题。（注意，`Theorem` 可以替换成 `Example`、`Lemma`、`Remark`、`Fact`、`Property`、`Proposition`、`Definition`，效果完全一样，看你乐意用哪个。）
- 命题名怎么取随你喜欢，但最好是有意义的名字。
- 在 Coq（以及许多函数式编程语言）中，我们通过空格而不是括号调用函数。`andb true true` 可以理解为 `andb(true, true)` 一样的东西，而括号只是为了调整优先级。

再来看一下，我们如何证明它。

```coq
Theorem t_and_t_eq_t: (andb true true = true).
Proof.
  simpl.
  reflexivity.
Qed.
```

其中：
- 第一行是命题，刚才讲过了。
- `Proof.` 代表证明的开始。
  - `simpl.` 将式子两端计算并化成最简。此时，两端都被计算为了 `true`。
  - `reflexivity.` 声明，因为等号两端相同，所以命题成立。
    - 另外 `reflexivity.` 其实也会化简。这里加上 `simpl.` 只是为了使步骤更清晰。
- `Qed.` 代表证明的结束。

在 CoqIde 里一步一步执行这段证明，观察右上角的证明区域如何变化。

（开始证明。）  
![Proof. 时的 CoqIde](https://cdn.luogu.com.cn/upload/image_hosting/hgjkv7ga.png)

（化简。）  
![simpl. 时的 CoqIde](https://cdn.luogu.com.cn/upload/image_hosting/lvzd73rs.png)

（结束证明。）  
![refl. 时的 CoqIde](https://cdn.luogu.com.cn/upload/image_hosting/u8cy6pw5.png)

**练习题. Ex 3.** 给出下面几个关于 `andb` 性质的平凡命题的证明。
```coq
Theorem t_and_f_eq_f: (andb true false = false).
  (* Proof. ... Qed. 用你的证明替换掉这段注释吧。 *)
Theorem f_and_t_eq_f: (andb false true = false).
  (* Proof. ... Qed. 用你的证明替换掉这段注释吧。 *)
Theorem f_and_f_eq_f: (andb false false = false).
  (* Proof. ... Qed. 用你的证明替换掉这段注释吧。 *)
```

## 自然数与递归

> 注意，这一段中的*类型*声明都不用复制到 CoqIde 中（但是函数和证明仍然需要），因为 Coq 预置了相同的类型。

你可能会好奇，如何在 Coq 的类型系统里定义自然数。这里，我们需要知道两点理论基础：
- Coq 类型的构造方式可以接受参数。
- 自然数是由后继关系刻画的（注意，这里我们把一个自然数 $n$ 的后继记为 $n^+$）。

来看一下自然数的定义：
```coq
Inductive nat: Type :=
  | O
  | S n.
```

它有两个构造方式。
- `O` 代表 $0$；
- `S n` 是接受一个参数的构造方式，它代表那个参数的后继。

这也就是说，`O` 是 $0$，`S O` 是 $1$，`S (S O)` 是 $2$，`S (S (S O))` 是 $3$ ......

同时，我们定义的类型都是不限制大小的。所以，除非我们耗尽内存，否则不会有溢出的情况。

自然数上的许多函数也需要递归定义。Coq 的递归函数使用关键字 `Fixpoint` 而非 `Definition`。

来看加法的定义。
```coq
Fixpoint plus (a: nat) (b: nat): nat :=
  match a with
  | O => b
  | S a' => S (plus a' b)
  end.
```

其中有两种模式：
- `O` 匹配 $0$；
- `S a'` 是带参数的匹配，匹配到任何不是 $0$ 的自然数，可以认为这里 `a'` 把 `a` 最外层的 `S` 剥掉了（也就是说减了 $1$）。

跟数学中自然数加法的定义对比一下，会发现是完全对应的，这里不再赘述。

再看减法（如果结果小于 $0$ 那么仍然得到 $0$）：

```coq
Fixpoint minus (a b: nat): nat :=
  match a with
  | O => O
  | S a' =>
    match b with
    | O => a
    | S b' => minus a' b'
    end
  end.
```

这里可以看到，`match` 是能够嵌套的，并且只有最外层需要句号 `.`。

**练习题. Ex 4. 完成以下乘法函数与判等函数。记住 `match ... with ... end` 能够嵌套。**

```coq
Fixpoint mult (a b: nat): nat :=
  (* 把这段注释替换为你的答案 *).
Fixpoint eq (a b: nat): bool :=
  (* 把这段注释替换为你的答案 *).
```

## 使用重写来证明（`rewrite`）

来看一下这个命题。

**命题.** 对于任何自然数 $n,m$，如果 $n=m$，那么 $n+n=m+m$。

在 Coq 里，可以这样描述：`Theorem plus_id: forall (n m: nat), n = m -> plus n n = plus m m.`

其中：
- `forall (<名称>: <类型>),` 表达了“对于所有”的意思。也可以有多个参数，就如同书写数学表达式一样。
- `->` 代表可以从左边推出右边。

先考虑如何在数学中证明这个命题。

> **命题.** 对于任何自然数 $n,m$，如果 $n=m$，那么 $n+n=m+m$。
>
> **证明.**
> - 因为 $n = m$，所以将式中 $n$ 全部替换为 $m$。
> - 等式两边都为 $m + m$，所以命题成立。

而在 Coq 中，可以通过 `intros <空格分隔的名称列表>.` 来将 $n, m$ 这类“变量”与 $n = m$ 这种“前提”**导入**到证明当中。在这里，我们可以在证明中写 `intros x y H.`。Coq 会先引入 `forall` 中的变量 `n, m` 并且重命名为 `x, y`；再引入命题主体里的前提 `n = m` 并将它命名为 `H`。用其他名字也没关系，完全是习惯问题。

我们使用 `simpl.` 时，Coq 会默认化简当前的命题；但是，我们也可以指定化简某个等式。比如我们上面引入了 `H`，就可以通过 `simpl in H.` 化简等式 `H`。

而之前提到的“将一个东西替换为相等的另一个东西”，也就是**重写**，则可以通过 `rewrite -> 等式.` 进行。我们现在可以 `rewrite -> H.`，它会把命题中（`n + m = m + m` 中）所有这个等式（`n = m`）左边的值（`n`）替换为右边的值（`m`）。这样就可以完成我们的证明。

需要注意的是，还有另外一种重写方式 `rewrite <- 等式.`，这样会把等式**右边**的值全替换为**左边**的值，恰好颠倒过来。

```coq
Theorem plus_id:
  forall (n m: nat),
  n = m -> plus n n = plus m m.
Proof.
  intros x y.
  intros H.
  rewrite -> H.
  reflexivity.
Qed.
```

（`intros` 前与 `intros` 后，注意分割线上方出现的东西。）  
![开始证明](https://cdn.luogu.com.cn/upload/image_hosting/eig4f08t.png)
![intros](https://cdn.luogu.com.cn/upload/image_hosting/omu0ldav.png)

（重写之后，等式两边相同了。）  
![rewrite](https://cdn.luogu.com.cn/upload/image_hosting/uthiis06.png)

**练习题. Ex 5. 证明命题：对于所有自然数 $n,m$，如果 $m = n^+$，那么 $m \times (1 + n) = m \times m$。**
```coq
Theorem mult_S_1:
  forall (m n: nat),
  m = S n
  -> mult m (plus 1 n) = mult m m.
  (* Proof. ... Qed. 用你的证明替换掉这段注释吧。 *)
```

## 分类讨论（`destruct`）

在上一节，我们使用了 `simpl.`、 `reflexivity.`、`intros <...>.`、`rewrite -> <...>.` 这几个**策略**（tactics）进行了证明。然而，在遇到稍许复杂的命题时，单凭化简和重写可能没法起到很好的作用。

来看一个不是那么平凡的命题。

**命题.** 对于自然数 $n$，$n + 1 \neq 0.$

我们或许会想直接通过化简解决，然而在 Coq 中这行不通：

```coq
Theorem plus_1_neq_0_firsttry:
  forall n: nat,
  eq (plus n 1) 0 = false.
Proof. reflexivity. Qed. (* 行不通！ *)
```

这是因为 Coq 对于 `n` 具体是什么一无所知。但我们可以分类讨论：

- 如果 `n` 是 `0` 那么命题显然成立；
- 如果 `n` 是某个后继 `m^+` 那么可以通过化简 `eq` 的定义得出成立。

要实现这样的分类讨论，我们可以使用 `destruct <名字> eqn: <名字>.`。前一个名字是我们要分类讨论的对象，后一个是我们给等式起的名字（也就是说叫什么都行），这个等式在不同情况中代表讨论对象的不同状态，比如在这里，它在两种情况中分别是 `n = 0` 和 `n = S n0`。

```coq
Theorem plus_1_neq_0:
  forall n: nat,
  eq (plus n 1) 0 = false.
Proof.
  intros n.
  destruct n eqn: E.
  - reflexivity.
  - reflexivity.
Qed.
```

逐步执行上面的代码，可以看到 `destruct n.` 将命题拆分成了两个分命题（subgoals）。这些命题中 Coq 有了更多的信息，证明起来也就更容易。在分命题中证明时，我们使用类似 Markdown 列表的语法来分别两个分命题。之后还会有分命题中的分命题，每层都需要使用不同的列表记号（可用的有 `-`、`+`、`*`）。

（`destruct` 将命题分解。）  
![destruct](https://cdn.luogu.com.cn/upload/image_hosting/9lo1aiha.png)

(第一个分命题。）  
![1st subgoal](https://cdn.luogu.com.cn/upload/image_hosting/3495j0th.png)

(完成第一个分命题时，Coq 提醒还存在未验证的分命题，同时展示第二个分命题。）  
![2nd subgoal](https://cdn.luogu.com.cn/upload/image_hosting/ypis9wat.png)

**练习题. Ex 6.** 证明对于布尔值 $b, c$，如果 $b \land c = {\rm true}$ 那么 $c = {\rm true}$。（注意，分类讨论时，你可能会遇到一些荒谬的情况，它们拥有错误的前提。但是不用担心，这些情况下你仍然可以推出结论。记住，从错误的前提什么都可以推出。）
```coq
Theorem andb_true_elim2:
  forall (b c: bool),
  andb b c = true
  -> c = true.
  (* Proof. ... Qed. 用你的证明替换掉这段注释吧。 *)
```

## 归纳证明（`induction`）

有时候，分类讨论也不管用：

```coq
Theorem plus_n_O_firsttry:
  forall n: nat,
  n = plus n 0.
Proof.
  intros n.
  destruct n eqn: E.
  - (* n = 0 *)
    reflexivity.
  - (* n = S n' *)
    simpl. (* 这里我们卡住了 *)
Abort.
```

所以，我们需要借助数学归纳法。

> **数学归纳法.** 对于一个命题 $P(n)$ 如果 $P(0)$ 且 $P(m) \Rightarrow P(m^+)$，那么 $P(n)$ 对于全体自然数成立。

在 Coq 中，可以通过 `induction <目标>.` 应用数学归纳法，它将命题拆分为两个分命题，要求分别在目标为 $0$ 与 $n^+$ （此时命题对 $n$ 成立）时证明命题。

```coq
Theorem plus_n_O:
  forall n: nat,
  n = plus n 0.
Proof.
  intros n.
  induction n.
  - reflexivity.
  - simpl.
    rewrite <- IHn.
    reflexivity.
Qed.
```

特别注意那个 `IHn`，它是 Coq 为归纳的前提条件（即当目标为 $n^+$ 时 $n = n + 0$）自动起的名字。

（执行 `induction` 后分解为两个分命题）  
![induction](https://cdn.luogu.com.cn/upload/image_hosting/ki1ftwka.png)

（基准条件）  
![baseline](https://cdn.luogu.com.cn/upload/image_hosting/6y76kj7s.png)

（归纳条件）  
![induction](https://cdn.luogu.com.cn/upload/image_hosting/dzthnmdi.png)

**练习题. Ex 7.** 证明一条引理：对于自然数 $n, m$，$(n+m)^+ = n + m^+$。
```coq
Theorem plus_n_Sm:
  forall n m: nat,
  S (plus n m) = plus n (S m).
  (* Proof. ... Qed. 用你的证明替换掉这段注释吧。 *)
```

**加法交换律.** 对于自然数 $n, m$，$n + m = m + n.$

我们来借助 Coq 证明它。首先写下命题：

```coq
Theorem plus_comm:
  forall n m: nat,
  plus n m = plus m n.
```

尝试归纳：
```coq
Proof.
  intros n m.
  induction n.
  - simpl.
```

看到 CoqIde 给出的第一个分命题：

![plus comm 1st subgoal](https://cdn.luogu.com.cn/upload/image_hosting/yxcynahe.png)

`m = m + 0`，正是之前我们证明过的命题 `plus_n_O`。在 Coq 中，我们可以使用已经证明的命题（也就是定理）进行重写。于是

```coq
    rewrite <- plus_n_O.
    reflexivity.
```

第一个分命题证明完毕。看第二个：

```coq
  - simpl.
```

![plus comm 2nd subgoal](https://cdn.luogu.com.cn/upload/image_hosting/d12up0hc.png)

尝试重写：

```coq
    rewrite -> IHn.
```

![plus comm 2nd subgoal after rewrite](https://cdn.luogu.com.cn/upload/image_hosting/6zkgpsim.png)

`S (m + n) = m + S n` 正是练习题中证明的引理 `plus_n_Sm`。重写，证毕。

```coq
    rewrite -> plus_n_Sm.
    reflexivity.
Qed.
```

完整的证明：
```coq
Theorem plus_comm:
  forall n m: nat,
  plus n m = plus m n.
Proof.
  intros n m.
  induction n.
  - simpl.
    rewrite <- plus_n_O.
    reflexivity.
  - simpl.
    rewrite -> IHn.
    rewrite -> plus_n_Sm.
    reflexivity.
Qed.
```

**练习题. Ex 8.** 证明加法结合律：对于自然数 $n, m, p$，$n+m+p = n+(m+p)$。
```coq
Theorem plus_assoc:
  forall n m p: nat,
  plus (plus n m) p = plus n (plus m p).
  (* Proof. ... Qed. 用你的证明替换掉这段注释吧。 *)
```

## 练习题答案

### Ex. 1
```coq
Inductive weekday: Type :=
  | monday
  | tuesday
  | wednesday
  | thursday
  | friday
  | saturday
  | sunday.
```

### Ex. 2
```coq
Definition orb (b c: bool): bool :=
  match b with
  | true => true
  | false => c
  end.
Definition xorb (b c: bool): bool :=
  match b with
  | true => negb c
  | false => c
  end.
```

### Ex. 3
```coq
Theorem t_and_f_eq_f: (andb true false = false).
  Proof. reflexivity. Qed.
Theorem f_and_t_eq_f: (andb false true = false).
  Proof. reflexivity. Qed.
Theorem f_and_f_eq_f: (andb false false = false).
  Proof. reflexivity. Qed.
```

### Ex. 4
```coq
Fixpoint mult (a b: nat): nat :=
  match a with
  | O => O
  | S a' => plus b (mult a' b)
  end.
Fixpoint eq (a b: nat): bool :=
  match a with
  | O =>
    match b with
    | O => true
    | S b' => false
    end
  | S a' =>
    match b with
    | O => false
    | S b' => eq a' b'
    end
  end.
```

### Ex. 5
```coq
Theorem mult_S_1:
  forall (m n: nat),
  m = S n
  -> mult m (plus 1 n) = mult m m.
Proof.
  intros m n H.
  simpl.
  rewrite <- H.
  reflexivity.
Qed.
```

### Ex. 6
```coq
Theorem andb_true_elim2:
  forall (b c: bool),
  andb b c = true
  -> c = true.
Proof.
  intros b c H.
  destruct b eqn: Eb.
  - simpl in H.
    rewrite <- H.
    reflexivity.
  - simpl in H.
    destruct c.
    + reflexivity.
    + rewrite -> H.
      reflexivity.
Qed.
```

### Ex. 7
```coq
Theorem plus_n_Sm:
  forall n m: nat,
  S (plus n m) = plus n (S m).
Proof.
  intros n m.
  induction n.
  - reflexivity.
  - simpl.
    rewrite -> IHn.
    reflexivity.
Qed.
```

### Ex. 8
```coq
Theorem plus_assoc:
  forall n m p: nat,
  plus (plus n m) p = plus n (plus m p).
Proof.
  intros n m p.
  induction n.
  - reflexivity.
  - simpl.
    rewrite -> IHn.
    reflexivity.
Qed.
```