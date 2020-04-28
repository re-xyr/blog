---
title: 算法复习
description: 毫无用处的 CSP 备考。
author: t532
date: Fri Oct 04 2019 14:39:40 GMT+0800 (GMT+08:00)
category:
    - 信竞
    - Stat:放弃
hidden: true
---
# 算法复习
快 CSP 了，所以瞎写点。使用类似 Python 语法的伪码。

## 图算法

### 遍历（BFS、DFS）
太简单所以不写了

### 最短路（Floyd，Dijkstra，SPFA）
```py
# 多源最短路算法，暴力松弛
# O(n^3)
def floyd():
    dist = Array(LEN, Array(LEN, INF))
    initialize_with_graph(dist) # 此处我们期望将部分已经连好的边记录到邻接矩阵中。
    for mid in nodes:
        for beg in nodes:
            for end in nodes:
                # 比较：原距离与松弛后的距离
                dist[beg][end] = min(dist[beg][mid] + dist[mid][end], dist[beg][end])
    return dist

# 单源最短路算法，带堆优化
# 不支持负权边
# O(m+n)？
def dijkstra(root):
    dist = Array(LEN, INF)
    dist[root] = 0
    heap = Heap([root])
    vis = Array(LEN, False);
    while heap.size():
        beg = heap.pop() 
        if vis[beg]:
            continue
        # （上方）取堆顶并检验是否访问过。最终结果必定是未访问过的离起点最近的节点
        vis[beg] = True
        for edge in beg.edges:
            # 松弛，若成功同样加入堆
            if vis[edge.to] or dist[beg] + edge.len >= dist[edge.to]:
                continue
            dist[edge.to] = dist[beg] + edge.len
            heap.push(edge.to)
    return dist

# 单源最短路算法
# 是一个未被证明的 Bellman-Ford 优化
# 支持负权边，但容易被卡
def spfa(root):
    dist = Array(LEN, INF)
    dist[root] = 0
    # 基于队列，相当于可以重入队的 BFS。
    queue = Queue([root])
    # 该数组记录元素是否在队中。
    inqueue = Array(LEN, False)
    inqueue[root] = True
    while queue.size():
        beg = queue.pop()
        inqueue[beg] = False
        for edge in beg.edges:
            if inqueue[edge.to] or dist[beg] + edge.len >= dist[edge.to]:
                continue
            dist[edge.to] = dist[beg] + edge.len
            queue.push(edge.to)
            inqueue[edge.to] = True
    return dist
```

### 最小生成树（Kruskal，Prim）
```py
# Kruskal 基于并查集与贪心的最小生成树算法。
# O(m)
def kruskal():
    # 基于并查集实现。
    ds = DisjointSet(LEN)
    # 按边权从小到大遍历所有边。
    sortedEdges = sorted(edges, lambda a, b: a.len < b.len)
    result = []
    for edge in sortedEdges:
        # 如果该边加入后*会*改变连通性，则加入。
        if not ds.joined(edge.fr, edge.to):
            ds.join(edge.fr, edge.to)
            result.push(edge)
    return result

# Prim 基于 Dijkstra 思想的最小生成树算法。
def prim():
    # TODO
    pass
```

### 求强连通分量（Tarjan）
请确保所有点都被访问过了。
```py
# 存储 DFS 的路径。
stack = Stack()
# 节点是否在栈中。
instack = Array(LEN, False)
# 已找到的强连通分量。
scc = []
# 请注意，需要在跑完后检查是否还有未访问过的点。
def tarjan(root, order):
    low[root] = dfn[root] = order
    stack.push(root)
    instack[root] = True
    for edge in root.edges:
        if instack[edge.to]:
            low[root] = min(low[root], dfn[edge.to])
        else:
            tarjan(edge.to, order + 1)
            low[root] = min(low[root], low[edge.to])
    if low[root] == dfn[root]:
        scc.push([])
        while stack.top() != root:
            scc[-1].push(stack.pop())
```

### 网络最大流（Dinic）
CSP好像不考这东西，先留着不写了
```py
def dinic():
    # TODO
    pass
```

## 数据结构

### 并查集
```py
# 并查集：基于森林实现。
disjointSet = []
def resize(n):
    global disjointSet
    disjointSet = Array(n, lambda n: n)
def root(p):
    if p == disjointSet[p]:
        return p
    else:
        return disjointSet[p] = root(disjointSet[p])
def join(a, b):
    disjointSet[root(b)] = root(a)
def joined(a, b):
    return root(a) == root(b)
```

### 树状数组
```py
# 树状数组可以实现单点加值与区间求和。
# 改成差分可以实现单点求值与区间加值。
def lowbit(n):
    return n & (-n)
arr = []
def resize(n):
    global arr
    arr = Array(n + 1, 0)
# 请从下标 1 开始使用
def add(pos, val):
    while pos < arr.size():
        arr[pos] += val
        pos += lowbit(pos)
def sum(length):
    if length == 0:
        return 0
    else:
        return arr[length] + sum(length - lowbit(length))
```

### 线段树
太熟悉了所以不写了（

### KMP

### AC 自动机

### 哈希

### ST 表

## 数学

### 快速幂
```py
# 思想：将m^n转化为m^(2^...+2^...+...+2^...)
def fastpow(n, mod):
    result = 1
    while n:
        if n & 1:
            result = result * n % mod
        n >> 1
        n = n * n % mod
    return result
```

### 组合数

### Exgcd
不会

## 冻龟
别想了，动龟有啥板子

### 最长公共子串

### 最长公共子序列

### 最长单调子序列
