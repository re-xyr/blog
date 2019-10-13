---
title: 学数学
description: 我怕了。
author: t532
date: Sun Oct 13 2019 21:38:03 GMT+0800 (GMT+08:00)
category: OI
---

# 学数学

## 同余方程定义
$ ax \equiv b \pmod{c} $ 是*同余方程*的基本形式，它等价于 $ ax \mod c = b \mod c $.

## 逆元定义
$ x $ 的*逆元*记为 $ x^{-1} $，在通常意义下就是倒数，但在模意义下是 $ x \times x^{-1} \equiv 1 \pmod{c} $.

## 解同余方程
解同余方程需要通过逆元：

$$ ax \equiv b \pmod{c} $$

两侧乘上 $ a^{-1} $：

$$ x \equiv a^{-1}b \pmod{c} $$

解得。

## 费马小定理
当 $ p $ 为质数，
$$ \forall a \in N^+, \exists a^{p-1} \equiv a^{-1} \pmod{p}. $$

## 辗转相除法
用于球 gcd

$$ gcd(a, 0) = a $$
$$ gcd(a, b) = gcd(b, a \mod b) $$

## Exgcd
用于球 $ ax + by = gcd(a, b) $ 的解

//TODO
