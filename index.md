---
title: Index
notPost: true
hideFooter: true
---

$$
\begin{matrix}
\ & x & y & z
\end{matrix}
\\
\begin{matrix}
x \\ y \\ z
\end{matrix}
\begin{bmatrix}
< & ? & ? \\
? & ? & ? \\
? & ? & = \\
\end{bmatrix}
$$
$$
\textrm {Figure 2. A typical call matrix}
$$

> Call matrix is a technique used in the minimal *foetus* language to determine whether a program terminates in a predictable way. In short, a recursive call, i.e. a call from a function to itself would terminate if (but not only if) the call *reduces* at least one of the arguments, that is, the arguments is eliminated by pattern matching, projecting or applying. One program terminates, if all calls in it terminates. (*Nov 27, 2020*)

---

$$
\frac {
  \Gamma \vdash Y : \mathcal U \qquad \Gamma, n : Y \vdash A(n) : \mathcal U
}{
  \Gamma \vdash \Pi (n : Y) . A(n) : \mathcal U
}
$$
$$
\frac {
 \Gamma , n : Y \vdash a : A(n)
}{
  \Gamma \vdash (\lambda n . a) : \Pi (n : Y) . A(n)
}
$$
$$
\frac {
  \Gamma \vdash Y : \mathcal U \qquad \Gamma, n : Y \vdash A(n) : \mathcal U
}{
  \Gamma \vdash \Sigma (n : Y) . A(n) : \mathcal U
}
$$
$$
\frac {
  \Gamma \vdash n : Y \qquad \Gamma \vdash a : A(n)
}{
  \Gamma \vdash (n , a) : \Sigma (n : Y) . A(n)
}
$$
$$
\frac {
  \Gamma \vdash Y : \mathcal U
}{
  \Gamma , n : Y , a : Y \vdash n =_Y a : \mathcal U
}
$$
$$
\frac {
  \Gamma \vdash n : Y
}{
  \Gamma \vdash {\sf refl}_n : n =_Y n
}
$$

$$
\textrm {Figure 1. Several deduction rules}\\
\textrm {of the Martin-Löf type theory}
$$

> Martin-Löf type theory is the dependently typed lambda calculus equipped with the infamous $\rm Id$ type, which is the *type of identity*, or equality, given that it is an equivalence and satisfies the Leibniz property. This type is used as a basis of the *path* in the original *homotopy type theory*, but the focus has moved to one constructive interpretation of the HoTT, namely the *cubical type theory*, where a path is indeed a function $p : [0, 1] \to A$. (*Aug 17, 2020*)
