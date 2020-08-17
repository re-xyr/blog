---
title: Index
notPost: true
---

<div style="color: #ddd">
(($
\frac {
  \Gamma \vdash Y : \mathcal U \qquad \Gamma, n : Y \vdash A(n) : \mathcal U
}{
  \Gamma \vdash \Pi (n : Y) . A(n) : \mathcal U
}
))
(($
\frac {
 \Gamma , n : Y \vdash a : A(n)
}{
  \Gamma \vdash (\lambda n . a) : \Pi (n : Y) . A(n)
}
))
(($
\frac {
  \Gamma \vdash Y : \mathcal U \qquad \Gamma, n : Y \vdash A(n) : \mathcal U
}{
  \Gamma \vdash \Sigma (n : Y) . A(n) : \mathcal U
}
))
(($
\frac {
  \Gamma \vdash n : Y \qquad \Gamma \vdash a : A(n)
}{
  \Gamma \vdash (n , a) : \Sigma (n : Y) . A(n)
}
))
(($
\frac {
  \Gamma \vdash Y : \mathcal U
}{
  \Gamma , n : Y , a : Y \vdash n =_Y a : \mathcal U
}
))
(($
\frac {
  \Gamma \vdash n : Y
}{
  \Gamma \vdash {\sf refl}_n : n =_Y n
}
))
(($
\frac {
  \Gamma , y : Y , a : Y , n : y =_Y a \vdash N(y, a, n) : \mathcal U \qquad \Gamma , y : Y \vdash r : N(y, y, {\sf refl}_y)
}{
  \Gamma , y : Y , a : Y , n : y =_Y a \vdash j : N(y, a, n)
}
({\bf J})
))
(($
\frac {
  \Gamma \vdash n : Y \qquad \Gamma \vdash r : n =_Y n
}{
  \Gamma \vdash k : r =_{n =_Y n} {\sf refl}_{n}
}
({\bf K})
))
</div>

<br />
