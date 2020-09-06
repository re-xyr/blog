---
title: Index
notPost: true
hideFooter: true
---

<div class="fancy">
($$
\frac {
  \Gamma \vdash Y : \mathcal U \qquad \Gamma, n : Y \vdash A(n) : \mathcal U
}{
  \Gamma \vdash \Pi (n : Y) . A(n) : \mathcal U
}
$$)
($$
\frac {
 \Gamma , n : Y \vdash a : A(n)
}{
  \Gamma \vdash (\lambda n . a) : \Pi (n : Y) . A(n)
}
$$)
($$
\frac {
  \Gamma \vdash Y : \mathcal U \qquad \Gamma, n : Y \vdash A(n) : \mathcal U
}{
  \Gamma \vdash \Sigma (n : Y) . A(n) : \mathcal U
}
$$)
($$
\frac {
  \Gamma \vdash n : Y \qquad \Gamma \vdash a : A(n)
}{
  \Gamma \vdash (n , a) : \Sigma (n : Y) . A(n)
}
$$)
($$
\frac {
  \Gamma \vdash Y : \mathcal U
}{
  \Gamma , n : Y , a : Y \vdash n =_Y a : \mathcal U
}
$$)
($$
\frac {
  \Gamma \vdash n : Y
}{
  \Gamma \vdash {\sf refl}_n : n =_Y n
}
$$)
</div>

<style>
.fancy {
  color: #ddd;
  animation: fancy 10s infinite;
}

@keyframes fancy {
  0% { opacity: 1 }
  80% { opacity: 0.5 }
  100% { opacity: 1 } 
}
</style>

<br />