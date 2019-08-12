---
title: 造个语言：Egolang（2）
description: 没学过编译原理，直接开始写 Tokenizer 和 Parser，不知道结果会怎样呢。
author: t532
date: Wed Aug 07 2019 14:28:13 GMT+0800 (GMT+08:00)
category: 开发
---

# 造个语言：Egolang（2）

<Series prev="/2019/08/06/ego-development-1/" />

语法想完之后，我想起了一件事：

> 我没学过编译原理。

淦。

所以语法解析这部分~~就只能口胡~~就只能靠感觉写了，至少可以知道我们需要两个部分：

- Tokenizer 用于将程序从 `string` 转为 `Token[]`；
- Parser 用于从 `Token[]` 转成 AST。

虽然听起来很 naive，但有了 AST 大概就能开始写语言机能了吧。

## Tokenizer

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

<Series prev="/2019/08/06/ego-development-3/" />
