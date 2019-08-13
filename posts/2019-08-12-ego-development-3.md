---
title: 造个语言：Egolang（3）
description: 作用域、变量和表达式，这是个可以尽情口胡的部分。
author: t532
date: Mon Aug 12 2019 23:54:11 GMT+0800 (GMT+08:00)
category: 开发
---

# 造个语言：Egolang（3）

<Series prev="/2019/08/06/ego-development-2/" />

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
