const $=`# 随机变量及其分布\r
\r
## 随机变量定义\r
\r
$(\\Omega,F,P)$是一个概率空间，$\\xi (\\omega)$是定义在$\\Omega$内的一个单值函数，如果对任意**实数 x**，有$$\\left\\\\{\\omega: \\xi(\\omega)≤x\\right\\\\} \\in F$$则称$\\xi(\\omega)$为**随机变量**，记作$\\xi$。\r
\r
> $\\xi(\\omega)$是一个函数，$\\omega$为自变量，定义域为$\\Omega$。\r
\r
## 分布函数定义\r
\r
设$\\xi(\\omega)$为随机变量，对于任意实数$x$，记$F(x)=P\\left\\\\{\\xi(\\omega)≤x\\right\\\\}$，$(-\\infty < x<+\\infty)$  \r
称$F(x)$为随机变量$\\xi(\\omega)$的分布函数。\r
\r
## 分布函数性质\r
\r
1. $F(x)$单调不减函数，即对任意实数$x_1,x_2$且$x_1 < x_2$，有$F(x_1)≤F(x_2)$\r
2. $0≤F(x)≤1$，且$$F(-\\infty)=\\lim_{x \\to -\\infty}F(x)=0,\\quad F(+\\infty)=\\lim_{x \\to +\\infty} F(x)=1$$\r
3. $F(x)=F(x+0)$，即$F(x)$是右连续\r
4. 对于任意实数$x_1,x_2$，且$x_1 < x_2$，有$$P\\left \\\\{x_1 <X≤ x_2 \\right \\\\}=F(x_2)-F(x_1)$$\r
5. 对任意的$x$,有$$P\\left \\\\{X=x\\right \\\\} = F(x)-F(x-0)$$\r
\r
> 特别地，如果 X 是连续性随机变量，则有\r
$$\r
P\\left \\\\{a<X≤b\\right \\\\}=P\\left \\\\{a≤X<b\\right \\\\}=P\\left \\\\{a<X<b\\right \\\\}=\r
P\\left \\\\{a≤X≤b\\right \\\\}=F(b)-F(a)\r
$$\r
\r
## 离散型随机变量\r
\r
### 定义\r
\r
设$X$是一个随机变量，如果$X$的取值是有限个或无穷可列个值，则称$X$为**离散型随机变量**。\r
\r
`;export{$ as default};
