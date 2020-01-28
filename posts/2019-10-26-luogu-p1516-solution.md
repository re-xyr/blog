---
title: 【题解】青蛙的约会 / Exgcd
description: Ref:LuoguOJ/P1516
author: t532
date: Sat Oct 26 2019 01:09:06 GMT+0800 (GMT+08:00)
category: OI（题解）
---

# P1516 青蛙的约会 题解


## 题目大意
求解关于 $ k $ 的方程 $ x + km \equiv y + kn \pmod{l} $ 的解。

## 第一反应
解同余方程，这不是很好搞吗（错乱）

化一下：

$$ k(m - n) \equiv y - x \pmod{l} $$

$$ k \equiv (y - x)(m - n)^{-1} \pmod{l} $$

所以当逆元搞不出来的时候就无解咯？

~~当然不是啦~~

交一下，60 分。到底是哪出了问题呢。

## 再想一下
看一下我们化出来的这个东西

$$ k(m - n) \equiv y - x \pmod{l} $$

把它转成正常的不定方程，加上一个元 $ p $：

$$ k(m - n) + pl = y - x $$

看起来有即视感了，这不是 Exgcd 吗！

然而并不是裸的 Exgcd...裸的长这样：

$$ k(m - n) + pl = (m - n, l) $$

可以想见 $ y - x $ 当然得是 $ (m - n, l) $ 的整倍数，那真正的有解条件就出来了：$ (y - x) | (m - n, l) $

所以设 $ (y - x) = q(m - n, l) $，我们可以通过求

$$ k'(m - n) + p'l = (m - n, l) $$

这个方程的一个解 $ k' $，再乘上 $ \frac{y - x}{(m - n, l)} $ 就得到

$$ k(m - n) + pl = y - x $$

的一组特解了。

## 那最小解呢？
是模 $ l $ 吗？

不是，只有 80 分。稍微想想就会知道，既然我们求的并不是原本 Exgcd 方程的解，所以自然是错的。

事实上，要模的数是 $ \frac{l}{(m - n, l)} $ *（如何证明？）*。这样终于能 A 了。

## Code
```cpp
#include <iostream>
#define int long long
using namespace std;

struct Exgcd {
    int x, y, gcd;
    Exgcd(int x, int y, int gcd): x(x), y(y), gcd(gcd) {}
};

Exgcd exgcd(int a, int b) {
    if (b == 0) return Exgcd(1, 0, a);
    else {
        Exgcd l = exgcd(b, a % b);
        return Exgcd(l.y, l.x - a / b * l.y, l.gcd);
    }
}

signed main() {
    int x, y, m, n, l;
    cin >> x >> y >> m >> n >> l;
    int xy, mn;
    if (m - n >= 0) {
        xy = y - x;
        mn = m - n;
    } else {
        xy = x - y;
        mn = n - m;
    }
    Exgcd rawrev = exgcd(mn, l);
    if (xy % rawrev.gcd) {
        cout << "Impossible" << endl;
        return 0;
    }
    int rev = rawrev.x * (xy / rawrev.gcd);
    if (rev < 0) rev += l/rawrev.gcd; rev %= l/rawrev.gcd;
    cout << rev << endl;
    return 0;
}
```
