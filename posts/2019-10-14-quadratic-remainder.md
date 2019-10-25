---
title: 二次剩余（数论）
description: 其实没学会，只是记一下
author: t532
date: Sun Oct 14 2019 21:38:03 GMT+0800 (GMT+08:00)
category: OI（知识点）
---

# 二次剩余

## 定义
若在模 $ p $ 下对于任意 $ c $，方程 $ x^2 \equiv c $ 有解，则 $ c $ 为模 $ p $ 的二次剩余，否则为它的二次非剩余。

## 需要求解的问题
对于非 $ 2 $ 质数 $ p $，解方程
$$ x^2 \equiv c \pmod{p}. $$

## 可解性
通过此法验证对于 $ c $ 的某个取值，方程是否可解：

计算 $ c^{\frac{p-1}{2}} \pmod{p} $，若 $ \equiv 1 $ 则有解，若 $ \equiv -1 $ 则无解。

### 为何必定为 $1$ 或 $-1$？
据费马小定理，可知
$$ c^{p-1} = 1 $$

也即
$$ (c^{\frac{p-1}{2}})^2 = 1 $$

所以
$$ c^{\frac{p-1}{2}} = \pm 1 $$.

### 为何在 $ \equiv -1 $ 时无解？
原式
$$ c^{\frac{p-1}{2}} = -1 $$

将 $ x^2 \equiv c $ 代入
$$ x^{p-1} = -1 $$

与费马小定理矛盾，故 $ x $ 不存在。

## 解法
首先通过取随机数的方式找到任意 $ a $ 能够使得 $ (a^2 - c) $ 为二次非剩余。

由于模 $ p $ 意义下的二次剩余个数为 $ \frac{p - 1}{2} $ *（如何证明？）*，因此期望随机次数为 2.

接下来定义 $ \omega^2 = (a^2 - c) $，完成扩系操作，即使得每个数通过类似复数的 $(a + b\omega)$ 表示；

最终 $ c = (a + \omega)^{p+1} $ *（如何证明？）*，则 $ x = (a + \omega)^{\frac{p+1}{2}} $。

## 代码模板
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
