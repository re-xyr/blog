---
title: ACSL Wiki 翻译（？）
description: 
author: t532
date: Fri Jan 31 2020 19:00:26 GMT+0800 (GMT+08:00)
category:
    - 未分类
hidden: true # delete this before publishing
---

# ACSL Wiki 翻译（？）

## Assembly Language Programming（汇编语言）

这个汇编是假的汇编，没法在任何架构上运行

这个语言里有一个默认变量给你用，我们管它叫 *accumulator（累加器）*。只有这个变量能进行算术运算。

创建其他变量可以用 `DC` 指令，这种变量官方名称叫做 *adcon（Address Constant/地址常量）*~~为什么变量会叫做常量啊~~。

### 构成

每行语句由三个部分组成

```
label OPCODE loc
```

- `label` 部分不一定有，如果有，那么：
  - 首先它相当于这一行代码的别名
  - 其次，如果后面的指令是 `DC` 的话它又代表赋值的 adcon 的名字
- `OPCODE` 是指令名称（后面会具体说明有哪些指令）；这部分只包含大写字母。
- `loc` 是指令需要使用的数据，它可能是一个 literal（*字面值*，即等号后面直接跟整数，e.g. `=114514` 就代表整数 $114514$），也可能是一个 adcon 的名称。

### 指令（Op Code）类型

注意：所有对 `loc` 进行修改的指令，`loc` 只能是 adcon，不能是 literal（原因不言自明）。

我大概给了每个指令对应的 python 语句。

#### `LOAD loc`
- 将 accumulator 的值**设为** `loc` 的值
  - *（也就是 `accumulator = loc`）*

#### `STORE loc`
- 将 `loc` 的值**设为** accumulator 的值
  - *（也就是 `loc = accumulator`）*
  - 小心别把 `LOAD` 和 `STORE` 记反

#### `ADD loc` / `SUB loc` / `MULT loc` / `DIV loc`
- 把 accumulator 的值**加上/减去/乘上/带余数除** `loc` 的值
  - *（也就是 `accumulator += 或 -= 或 *= 或 //= loc`）*
  - 注意除法，相当于把 acuumulator 设置为 $({\rm  accumulator } \div {\rm loc})$ 的整数部分
  - 注意所有运算都在同余系 $\pmod{1000000}$ 下进行，也就是所有结果都会对 $1000000$ 取模
  - 注意所有结果都存到了 accumulator 里，`loc` 不会变

#### `BG loc`
- BG 是 **B**ranch if **G**reater than 0 的缩写。意思是如果 accumulator 大于 0，那么跳转到 `loc` 标记的那一行。这里的以及下面三个指令的 `loc`，只能是某一行的 `label`。
  - *（也就是 `if accumulator > 0: goto loc`)*

#### `BE loc`
- BE 是 **B**ranch if **E**quals 0 的缩写。意思是如果 accumulator 等于 0，那么跳转到 `loc` 标记的那一行。
  - *（也就是 `if accumulator == 0: goto loc`)*

#### `BL loc`
- BL 是 **B**ranch if **L**ess than 0 的缩写。意思是如果 accumulator 小于 0，那么跳转到 `loc` 标记的那一行。
  - *（也就是 `if accumulator < 0: goto loc`)*

#### `BU loc`
- BL 是 **B**ranch **U**nconditionally 的缩写。意思是无条件跳转到 `loc` 标记的那一行。
  - *（也就是 `goto loc`)*

#### `READ loc`
- 让用户输入一个数，存到 `loc` 里
  - *（也就是 `loc = int(input())`）*

#### `PRINT loc`
- 输出 `loc` 里的数
  - *（也就是 `print(loc)`）*

#### `label DC loc`
- 这个指令必须有 `label`，它的意思是声明一个 adcon，名字是 `label`，把初始值设置成 `loc`。
  - *（也就是 `label = loc`）*

#### `END`
- 直接结束程序

### 可以试试做下例题了

**Q1. After the following program is executed, what value is in location TEMP?**

|`label`|`OPCODE`|`loc`|Explanation|
|-|-|-|-|
|TEMP|	DC|	0| `TEMP = 0`|
|A|	DC|	8| `A = 8`|
|B|	DC|	-2| `B = -2` |
|C|	DC|	3| `C = 3` |
||LOAD|	B| `Accumulator = B`|
||||which is `Accumulator = -2`|
||MULT|	C|`Accumulator *= C`
||||which is `Accumulator = -6`|
||ADD|	A|`Accumulator += A`
||||which is `Accumulator = 2`|
||DIV|	B|`Accumulator //= B`|
||||which is `Accumulator = -1`|
||SUB|	A|`Accumulator -= A`|
||||which is `Accumulator = -9`|
||STORE|	TEMP|`TEMP = Accumulator`
||END||	

Thus `TEMP = -9`.

**Q2. If the following program has an input value of N, what is the final value of X which is computed? Express X as an algebraic expression in terms of N.**

|`label`|`OPCODE`|`loc`|Explanation|
|-|-|-|-|
||READ|	X|自己做|
||LOAD	|X|
|TOP|	SUB|	=1|
||BE	|DONE|
||STORE	|A|
||MULT	|X|
||STORE	|X|
||LOAD	|A|
||BU	|TOP|
|DONE	|END|	

## Boolean Algebra（布尔代数）

注意 ACSL 里用的都是表格里第三列的 *ACSL Representation*。

### 布尔值

布尔代数只有两个值，真和假。

|Value Name|Standard Representation|ACSL Representation|
|-|-|-|-|
|True，真|$\top$|$1$|
|False，假|$\bot$|$0$|

### 布尔运算

|Operator Name|Standard Repr.|ACSL Repr.|Explanation|
|-|-|-|-|-|
|And，与|$A \land B$|$A \cdot B$|和正常算术一样，$x \cdot 0 = 0$，$1 \cdot 1 = 1$|
|Or，或|$A \lor B$|$A + B$|和正常算术一样，只不过 $1 + 1 = 1$|
|Not，非|$\lnot A$|$\overline{A}$|就是反过来|
|Xor/Exclusive Or，异或/逻辑不等|$A \oplus B$|$A \oplus B$|如果两个不一样结果就是 1，否则是 0|
|Xnor/Equality，逻辑相等|$A = B$|$A \odot B$|如果两个一样结果就是 1，否则是 0|

### 运算律

- 二元的布尔运算有交换性（Commutativity）和结合性（Associativity）。
- 自幺元：$x \cdot x = x$，$x + x = x$。
- 零元：$x + 1 = 1$，$x \cdot 0 = 0$。
- 幺元：$x + 0 = x$，$x \cdot 1 = x$。
- 逆元：$x \cdot \overline x = 0$，$x + \overline x = 1$。
- 与算术一样，$+$ 与 $\cdot$ 存在分配律。
- $\overline{x + y} = \overline{x} \cdot \overline{y}$，$\overline{x \cdot y} = \overline{x} + \overline{y}$。
 
## Bit-string Flicking（位运算）

和布尔运算一样，只不过是对于一长串二进制值一位一位的搞

举个例子：${\bf not}\ (111\ {\bf and}\ 100) = {\bf not}\ 100 = 011.$

## Computer Number Systems（进制转换）

无聊的很，不说了

## Data Structures（数据结构）

> 没更完
