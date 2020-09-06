---
title: The Next 700 Idealism
date: Sun Sep 06 2020 17:04:33 GMT+0800 (GMT+08:00)
category:
  - 编程语言
  - 函数式
---

*The Next 700 Programming Languages* proposes an unimplemented language family *ISWIM (If you See What I Mean)*, by giving their minimal common structure. This article is a review of the paper.

# Intro

Back in 1965 a survey showed that:

> "... today ... 1,700 special programming languages used to 'communicate' in over 700 application areas."
> —— Computer Software Issues, an American Mathematical Association Prospectus, July 1965.

And these 1,700 languages varied a lot, even in common logical structures. ISWIM is an attempt to build a unified framework that enables us to build concrete languages on top of a set of pre-given constructs, by "adding primitives". In other words, the author is implying: *ISWIM is the next 700 programming languages.*

# Where-clauses

Most of ISWIM's basic units are *expressions*, not *statements*. This approach is very different from most of the languages back then (and also very different from many languages still popular nowadays), but similar to LISP (for more details, see section [LISP](#lisp)).

ISWIM is the first language to introduce the `where`-notation. In original reference physical ISWIM (will mention below; see [String, Token and AST](#string-token-and-ast)), the `where`-notation looks like:

($
f(b+2c)\\
{\bf where}\; f(x) = x \times (x + a)
$)

This syntax influenced Miranda and Haskell.

# Dive In

ISWIM have 4 *levels of abstraction*, namely:

- The *physical ISWIMs*; at this level, there are many different flavors of ISWIMs, each of which is designed to be interpreted in different ways, including being read by humans, or compiled to a particular hardware platform.
  - Form: A physical ISWIM program is a string sequence.
- The *logical ISWIM*, in which we don't care about certain string sequences, but sequences of syntactic units, like parenthesis and keywords.
  - Form: A logical ISWIM program is a sequence of syntactic units (tokens).
- The *abstract ISWIM*, in which we don't care about grammatical rules, but structure of a program.
  - Form: An abstract ISWIM program is an abstract syntax tree (AST).
- The *Applicative Expression*, which is a simpler AST than abstract ISWIM.

Transformations between adjacent levels of abstraction correspond to:

- Tokenizing,
- Parsing,
- Translating to an IR.

Exactly how a compiler works (though not complete).

## The Abstract ISWIM

We do not give the full definition of the abstract ISWIM, as it is already in the original paper. Instead, here are some example programs written in physical ISWIM, to reflect the abstract ISWIM's features, which all physical ISWIMs share.

```iswim
Def a = 1                        -- Simple definitions.
and b = 2
Def x = a + 2 * b                -- Use of infix operators.

Print x + a                      -- A "demand". This is rather imperative.
                                 -- Note that "demands" do not have to be a "Print".
                                 -- A function call on the top level, starting a web server etc.
                                 -- can all be demands.

Def even(x) =                    -- Define a function.
  isEven -> true ; false         -- The if-then-else expression ("else" part is omittable).
  where isEven = x % 2 == 0      -- The where-clause.

Def rec fib(x) =                 -- Recursive function.
  x == 0 ->
    0;
    x == 1 ->
      1;
      f(x - 1) + f(x - 2)

Def constx(x) = f(x) + 1
where pp f(x) = 0                -- A call to a "pp" (program-point) function
                                 -- will make the caller directly return the result of the called pp.
                                 -- The ISWIM simulation of jumping.

Def (u, v, w) = (1, 2, 3)        -- Some kind of pattern matching?
```

# LISP

ISWIM is inspired, in many ways, by LISP.

- They both have simple computation strategies (really? I'm not sure about this);
- They both make heavy use of expressions, leading to better correspondence to mathematical representations.

ISWIM, however:

- is designed to be as hardware-irrelevant as possible - first at that time
- uses GC
- uses less lists
- uses a more friendly syntax
  - less parentheses
  - uses infix operators
  - uses layout (!) - first at that time

# Computation

We'll not go through the full computation rules (or, "characteristic equivalences" in the original paper) of ISWIM, but we take a look at it's main characteristics.

The computation rules are divided into 5 groups:

- substitution rules, like ($\forall M. M \equiv M' \to L(M) \equiv L(M')$);
- 

- Normal form is undefined (!)
- 

# Conclusion

<Unfinished />
