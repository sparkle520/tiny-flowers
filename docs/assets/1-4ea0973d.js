const r=`**证：**\r
\r
将$f(x)$在点$x=c$ 处展开为二阶泰勒公式得\r
\r
$$\r
f(x)=f(c)+f'(c)(x-c)+\\frac{f''(\\xi)}{2}(x-c)^2 \\quad\\forall x \\in [0,1]\r
$$\r
\r
其中$\\xi$介于$c$与$x$之间.  \r
特别地，当$x=0$ 与 $x=1$时有\r
\r
$$\r
f(0)=f(c)+f'(c)(0-c)+\\frac{f''(\\xi_0)}{2}(0-c)^2 \\quad (0< \\xi_0<c)\r
$$\r
\r
$$\r
f(1)=f(c)+f'(c)(1-c)+\\frac{f''(\\xi_1)}{2}(1-c)^2 \\quad (c< \\xi_1<1)\r
$$\r
\r
由$f(1)-f(0)$得\r
\r
$$\r
f(1)-f(0)=f'(c)+\\frac{1}{2}\\left \\[f''(\\xi_1)(1-c)^2+f''(\\xi_0)c^2\\right\\]\r
$$\r
\r
即\r
\r
$$\r
f'(c)=f(1)-f(0)-\\frac{1}{2}\\left \\[f''(\\xi_1)(1-c)^2+f''(\\xi_0)c^2\\right\\]\r
$$\r
\r
由绝对值不等式得\r
\r
$$\r
\\begin{align*}\r
|f'(c)|&≤|f(1)|+|f(0)|+\\frac{1}{2}\\left\\[ |f''(\\xi_1)|(1-c)^2+|f''(\\xi_0)|c^2 \\right\\]\\\\\\\\\\\\\r
&≤  2a+\\frac{b}{2}\\left\\[ (1-c)^2+c^2 \\right\\]≤2a+\\frac{b}{2}\\left\\[ (1-c)+c \\right\\]\\\\\\\\\\\\\r
&=2a+\\frac{1}{2}b\r
\\end{align*}\r
$$\r
\r
得证\r
`;export{r as default};
