---
title: 造个语言：Egolang
description: 闲着没事想要造个（程序设计）语言。
author: t532
date: Tue Aug 06 2019 21:02:43 GMT+0800 (GMT+08:00)
category:
    - 开发
    - Stat:搁置
---

# 造个语言：Egolang

## 构想的来源
期末复习的时候，突然冒出来一个想法：

> 造一个所有东西都是逆波兰表达式的语言。

感觉很有趣的样子，于是就写了几段代码~~然后人肉解释器~~试试看：

```
1 2 3 + - tostring output
// -> output ( tostring ( 1 - ( 2 + 3 ) ) )
// => -4
```

果不其然，看上去很反人类。那么改成波兰表达式可能会好一些？

```
output tostring - 1 + 2 3
// -> output ( tostring ( 1 - ( 2 + 3 ) ) )
// => -4
```

看起来正常多了。

这是个初步的想法，实现起来应该很容易。

哦对了还得起个名字，既然是波兰表达式就叫 **Pole** 好了。

~~然后这个点子就被我搁置到了考完~~

## 深入思考一下
波兰表达式的每个成员，只可能是*运算符*或*值*两类其中之一，并且运算符的元的数量是确定的。这两点使得波兰表达式非常简洁，不必添加括号之类冗余的符号规定运算顺序。

然而对于一门程序设计语言，这种简洁性也会大大拉低灵活性。如果只是如此实现，我们就得不到两个特性：*可调用值*和*变长参数列表*：

- 将函数视为可调用值，也就是 *first-class function* 思想，在现代语言中被广泛应用。这使得函数的使用有了更大的灵活性，~~也产生了 callback hell 等一众毒瘤写法~~。
- 变长参数列表，不用我说了，很好用。

## 改需求.jpg
怎么解决？改吧。

考虑向语言中加入括号 `()`，并且使表达式中所有成员的结果都为值（但有可调用与不可调用的分别）；

对于可调用值，可以在后面添加括号来表示调用；否则，表示访问值。括号中的表达式均为参数。这同时也解决了变长参数列表的问题。

语言的语法结构大概构思好了，接下来开始着手实现吧。

## Tokenizer

语法想完之后，我想起了一件事：

> 我没学过编译原理。

淦。

所以语法解析这部分~~就只能口胡~~就只能靠感觉写了，至少可以知道我们需要两个部分：

- Tokenizer 用于将程序从 `string` 转为 `Token[]`；
- Parser 用于从 `Token[]` 转成 AST。

虽然听起来很 naive，但有了 AST 大概就能开始写语言机能了吧。

因为语法简单，所以 Tokenizer 写起来也简单。只需：

- 按照空格分割；
- 将括号额外分割出来。

[之前写过类似的东西](https://github.com/ionjs-dev/ionjs/blob/next/src/util/command/util.ts)，参考一下就行。

我有没有提起过参数列表也是靠空格分割的？

```js
import { Tokenizer } from 'pole'
Tokenizer.tokenize('a(b c(d e) f(g)) h(i)')
=> ['a', '(', 'b', 'c', '(', 'd', 'e', ')', 'f', '(', 'g', ')', ')', 'h', '(', 'i', ')']
```

写着写着就发现问题了：**字符串字面量该怎么办？** 最终，秉着极简的原则，我选择的方案是：

- 没有字符串字面量；
- 函数可以读取传入参数的变量名（如果它是一个标识符的话）；
- 因此可以写个函数，读取变量名并且作为字符串的值，生成字符串并返回。
- 对于空格如何处理？我们仍然引入双引号 `""`，但它的作用是将内部的空白字符（*whitespace*）转义。这代表着 Pole 里可以有带空格的标识符！

听起来很像 hack，写出来大概像这个样子，注意单引号 `'` 是个函数：
```ego
Pole❯ '(123)
'123' [ type: str ref: immediate value ]

Pole❯ '(abc def)
'abcdef' [ type: str ref: immediate value ]

Pole❯ '("abc def")
'abc def' [ type: str ref: immediate value ]
```

Tokenizer 的改动不是什么问题，随便写写就行了。

## 幕间：改个名

感觉 Pole 这个名字不是很好~~具体哪里不好我也不知道~~，所以花了一个午觉的时间想了下能改什么名。

~~对，是边睡边想~~

> 可以发现字面量已经不存在了，只有标识符；  
> 以这个为思路来起名字。  
> 标识符的英文是 *Identifier*，缩写成 Id；  
> 直接叫 Id 有点让人摸不清头脑。  
> Id 又有*本我*的意思，相对的还有*自我* Ego，那就叫 Ego 好了！

于是就改名为 **Ego** 了。

## Parser

一开始感觉很恐怖，但是意外地好写？

先考虑对于常规波兰表达式如何解析（伪码）：

```
algo polandExpr:
    el = getNextElement()
    if el.callable:
        return el([ for i in range(0, el.argumentListSize): 
            polandExpr() ])
    else:
        return el
```

对于 Ego，只需要将对于 `el` 可调用性和参数列表的判断改为基于括号的即可。

```
algo polandExpr:
    el = getNextElement()
    if seekNextElement() == `(`:
        getNextElement()
        args = []
        while seekNextElement() != `)`:
            args.push(polandExpr())
        getNextElement()
        return el(args)
    else:
        return el
```

具体用 TypeScript 实现完毕后，是这个效果：
```js
import { generate } from 'ego'
generate(['a', '(', 'b', 'c', '(', 'd', 'e', ')', 'f', '(', 'g', ')', ')', 'h', '(', 'i', ')'])
=> [ { type: 'FunctionCall',
       target: { type: 'Identifier', name: 'a' },
       args: [ [Object], [Object], [Object] ] },
     { type: 'FunctionCall',
       target: { type: 'Identifier', name: 'h' },
       args: [ [Object] ] } ]
```

## 作用域（Scope）与变量（Variable）

考虑作用域与变量的特性：

- 每个作用域拥有：
    - 一个父级作用域；
    - 若干变量。
- 一个变量属于，且仅属于一个作用域。
- 当变量在一个作用域中无法找到时，会层层上溯。

这里需要考虑的一点是：变量存储的是值，还是指向对象的引用？我选择了后者，因为它更灵活，也更容易实现。

然后就可以口胡出来一个大概的结构：

```ts
declare class Scope {
    parent: Scope?
    variables: Map<string, Variable>
}

declare class Variable {
    name: string
    scope: Scope
    value: Value
}

declare class Value {
    type: string
    value: any
    call: CallHandler?
}
```

这里，我们利用了两个 JavaScript 的语言特性，省下了很多工夫：

- 如果一个对象失去了所有引用，那么它会自动被 GC 掉，免得自己写 GC；
- 指向对象的变量本身就存储的是引用。~~你知道为什么我说容易实现了吧~~

## 可调用值（Callable）

回顾一下 `Value` 类的定义：

```ts
declare class Value {
    type: string
    value: any
    call: CallHandler?
}
```

注意有一个不寻常的属性 `call: CallHandler`，它用来标识可调用值在被调用时的处理函数，Ego 里的可调用值就是如此实现的，这意味着它与值本身无关。

接下来考虑 `CallHander` 的定义：

```ts
type CallHandler = (args: Executable[], scope: Scope) => Promise<Executable>
```

我们传入两个参数，其中 `scope` 不难理解，它代表了表达式的执行上下文。而 `args` 则代表了调用该 Callable 时传入的参数（在 Ego 语言意义下）。

但 `args` 的成员类型为 `Executable` 而非 `Value`。`Executable` 字面上意味着“可执行的”，而在这里，它说明了这些参数不会立刻被求值，而是等到开发者明确指定的时候再求值（懒求值）。

这也是为什么 `Executable` 被称为“广义表达式”；它可以像表达式一样得到求值结果，但也可以像数据一样传递、存储。

最终，`CallHander` 返回的值则是一个 `Promsie<Executable>`，这是为了可以使用 JavaScript 异步函数（同时在 Ego 语言意义下仍是同步）。

## 广义表达式（Executable）

考虑 Executable 的定义：

```ts
interface ExecuteResult {
    variable?: Variable
    variableName?: string
    variableScope?: Scope
    variableRef?: Value
    wrappedValue: Value
    value: any
    type: string
    call?: CallHandler
}
interface Executable {
    execute(scope: Scope): Promise<ExecuteResult>
}
```

可以看到，通过调用 `Executable#execute()`，才会开始一次求值。并且这个过程可以反复执行，因时间的不同也可能产生不同的结果。

求值后，我们得到的结果是 `ExecuteResult`。这是一个非常实用的结构，提供了几乎所有与执行结果相关的信息：

- `variable`, `variableName` 和 `variableScope` 提供了执行结果所指向的变量，以及它的名字和作用域。如果返回了一个即时值（immediate value），则它们不可用。并且，它们不可更改。
- `variableRef` 提供了执行结果所指向的变量——所指向的值（`Value` 对象）。可以将它重新赋值，此时变量会**指向新的值**；
- `wrappedValue` 则提供了执行结果的 `Value` 对象形式；将它重新赋值将会**复制一份并指向这份复制的值**。
- `value`、`type` 与 `call` 则是 `wrappedValue` 的成员。

这其中，需要注意的是，试图拷贝 `Value#call` 属性是行不通的。

## AST 处理

这部分随便写写应该就行了，不过当时有些微妙的 Bugs 仍然相当头痛。
