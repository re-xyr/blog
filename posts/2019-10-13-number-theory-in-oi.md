---
title: 学数论
description: 数论是 OI 的一部分，不爽不要玩.jpg
author: t532
date: Sun Oct 13 2019 21:38:03 GMT+0800 (GMT+08:00)
category: OI
---

# 学数论
“每天学点 oi”，又名“我很焦虑所以 xjb 学点东西”系列 1：数论

## 目录
- [同余方程、逆元、Exgcd](#同余方程、逆元、exgcd)
- [二次剩余](#二次剩余)

## 同余方程、逆元、Exgcd

### 同余方程定义
$ ax \equiv b \pmod{c} $ 是*同余方程*的基本形式，它等价于 $ ax \mod c = b \mod c $.

### 逆元定义
$ x $ 的*逆元*记为 $ x^{-1} $，在通常意义下就是倒数，但在模意义下是 $ x \times x^{-1} \equiv 1 \pmod{c} $.

### 解同余方程
解同余方程需要通过逆元：

$$ ax \equiv b \pmod{c} $$

两侧乘上 $ a^{-1} $：

$$ x \equiv a^{-1}b \pmod{c} $$

解得。

### 费马小定理
当 $ p $ 为质数，
$$ \forall a \in N^+, \exists a^{p-1} \equiv a^{-1} \pmod{p}. $$

### 辗转相除法
用于球 gcd

$$ gcd(a, 0) = a $$
$$ gcd(a, b) = gcd(b, a \mod b) $$

### Exgcd
用于球 $ ax + by = gcd(a, b) $ 的解

推导过程：
$$ ax + by = gcd(a, b) $$

根据辗转相除法原理，得到
$$ bx_2 + (a \mod b)y_2 = gcd(b, a \mod b) = gcd(a, b) $$

展开
$$ bx_2 + (a - \lfloor a / b \rfloor) b y_2 = gcd(a, b) $$
$$ ay_2 + b(x_2 - \lfloor a / b \rfloor y_2) = gcd(a, b) $$

对比原式
$$ ax + by = gcd(a, b) $$

得到
$$ x = y_2 $$
$$ y = x_2 - \lfloor a / b \rfloor y_2 $$

不断递归推导，直到到达与辗转相除法相同的终止条件 $ b = 0 $
$$ ax_n + 0y_n = gcd(a, 0) $$
$$ ax_n = a $$
$$ x_n = 1, y_n = 0 $$

倒推回去即可

#### 代码实现
```cpp
pair<int, int> exgcd(int a, int b) {
    if (b == 0) return pair(1, 0);
    else {
        auto last = exgcd(b, a % b);
        int x = last.first, y = last.second;
        return pair(y, x - a / b * y);
    }
}
```

### 通过 Exgcd 求逆元
易证仅当 $ gcd(a, p) = 1 $ 时存在 $ x $ 使得 $ ax \equiv 1 \pmod{p} $，因此 Exgcd 所解方程化为
$$ ax + by = 1 $$
$$ ax \equiv 1 \pmod{b} $$

## 二次剩余

### 定义
若在模 $ p $ 下对于任意 $ c $，方程 $ x^2 \equiv c $ 有解，则 $ c $ 为模 $ p $ 的二次剩余，否则为它的二次非剩余。

### 需要求解的问题
对于非 $ 2 $ 质数 $ p $，解方程
$$ x^2 \equiv c \pmod{p}. $$

### 可解性
通过此法验证对于 $ c $ 的某个取值，方程是否可解：

计算 $ c^{\frac{p-1}{2}} \pmod{p} $，若 $ \equiv 1 $ 则有解，若 $ \equiv -1 $ 则无解。

#### 为何必定为 $1$ 或 $-1$？
据费马小定理，可知
$$ c^{p-1} = 1 $$

也即
$$ (c^{\frac{p-1}{2}})^2 = 1 $$

所以
$$ c^{\frac{p-1}{2}} = \pm 1 $$.

#### 为何在 $ \equiv -1 $ 时无解？
原式
$$ c^{\frac{p-1}{2}} = -1 $$

将 $ x^2 \equiv c $ 代入
$$ x^{p-1} = -1 $$

与费马小定理矛盾，故 $ x $ 不存在。

### 解法
首先通过取随机数的方式找到任意 $ a $ 能够使得 $ (a^2 - c) $ 为二次非剩余。

由于模 $ p $ 意义下的二次剩余个数为 $ \frac{p - 1}{2} $ *（如何证明？）*，因此期望随机次数为 2.

接下来定义 $ \omega^2 = (a^2 - c) $，完成扩系操作，即使得每个数通过类似复数的 $(a + b\omega)$ 表示；

最终 $ c = (a + \omega)^{p+1} $ *（如何证明？）*，则 $ x = (a + \omega)^{\frac{p+1}{2}} $。

### 代码模板
```cpp
// Luogu P5491
#include <iostream>
#include <cstdlib>
typedef long long ll;

ll fstpow(ll a, ll n, ll mod) {
    ll result = 1;
    while (n) {
        if (n & 1) {
            result = result * a % mod;
        }
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}

// 此处实现了 (a+bw) 形式的数的快速幂
ll cfstpow(ll r, ll i, ll n, ll a2sc, ll mod) {
    ll rr = 1, ri = 0;
    while (n) {
        ll orr = rr, orl = r;
        if (n & 1) {
            rr = ((rr * r) + (ri * i % mod) * a2sc) % mod;
            ri = ((orr * i) + (ri * r)) % mod;
        }
        r = ((r * r) + (i * i % mod) * a2sc) % mod;
        i = ((orl * i) + (i * orl)) % mod;
        n >>= 1;
    }
    return rr;
}

int main() {
    int cases;
    cin >> cases;
    for (int i = 0; i < cases; i++) {
        ll c, p;
        cin >> c >> p;
        if (c == 0) { // 特判，当为 0
            cout << 0 << endl;
            continue;
        }
        if (fstpow(c, (p - 1) / 2, p) == p - 1) { // 无解情况，注意同余 -1 即为同余 mod - 1
            cout << "Hola!" << endl;
            continue;
        }
        ll a, a2sc;
        do { // 取到一个 a 使 (a^2-c) 不为二次剩余
            a = rand() % p;
            a2sc = (a * a - c) % p;
        } while (fstpow(a2sc, (p - 1) / 2, p) != p - 1);
        ll result = cfstpow(a, 1, (p + 1) / 2, a2sc, p);
        // x^2 = c 有两个解，其中一个仅仅是用模数减去另一个解！
        ll mr = min(result, p - result), ml = max(result, p - result);
        if (mr != ml) cout << mr << ' ' << ml << endl;
        else cout << mr << endl;
    }
}
```
