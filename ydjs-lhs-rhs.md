### LHS & RHS Concept

https://en.wikipedia.org/wiki/Sides_of_an_equation  

>In mathematics, LHS is informal shorthand for the left-hand side of an equation.
>Similarly, RHS is the right-hand side. The two sides have the same value,
>expressed differently, since equality is symmetric.

数学上LHS和RHS是指在位于等号左边和右边，完全相同的两个东西不同的表达方式。到了javascript中因为等号是具有语法意义的，所以意义有所不同。

javascript运行过程中会在作用域中**查找**变量，查找变量有两种不同目的：

1. 目的是为了获取变量的值，则会进行RHS查询；
2. 目的是为了给变量赋值，则会进行LHS查询；

可以简单的理解为：等号左边是LHS（赋值），等号右边的是RHS（读取值）

### LHS & RHS查询过程

LHS和RHS查询是在当前作用域中进行的，如果当前作用域中没有找到所需的变量，则会向上级作用域继续查询，最后到达全局作用域。到了全局作用域，无论找没找到都会停止查找。

- 如果RHS查询在整个作用域都没有找到变量，则会抛出`ReferenceError`错误。
- 如果LHS查询在整个作用域都没有找到变量，在严格模式下(`use strict`)和RHS一样会抛出`ReferenceError`错误；在非严格模式下则会**在全局作用域中创建一个变量（换句话说就是全局变量）**
