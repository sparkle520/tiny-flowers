const n=`**解：**\r
\r
$$因为 \\lim_{n \\rightarrow \\infty} \\sqrt[n]{\\frac{1}{n(2 n-1)}}=1, 所以收敛半径为 1 .\\hspace{100cm}$$\r
\r
当 $x= \\pm 1$ 时, $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n(2 n-1)}$ 绝对收敛, 故收敛域为 $[-1,1]$.\r
\r
记该幂级数的和函数为 $S(x)$, 则在 $(-1,1)$ 上,\r
\r
$$\r
\\frac{1}{2} S^{\\prime \\prime}(x)=\\sum_{n=1}^{\\infty}(-1)^{n-1} x^{2 n-2}=\\frac{1}{1+x^2} .\\hspace{100cm}\r
$$\r
\r
$$\r
\\begin{gathered}\r
S^{\\prime}(x)=2 \\int_0^x \\frac{1}{1+s^2}d\r
 s=2 \\arctan x, \\quad x \\in(-1,1) .\\hspace{100cm} \\\\\\\\\\\\\r
S(x)=2 \\int_0^x \\arctan s  ds=2 x \\arctan x-\\ln \\left(1+x^2\\right), \\quad x \\in(-1,1) .\r
\\end{gathered}\r
$$\r
\r
由于 $S(x)$ 在收敛域上连续, 所以\r
\r
$$\r
S(x)=2 \\int_0^x \\arctan s  ds=2 x \\arctan x-\\ln \\left(1+x^2\\right), \\quad x \\in[-1,1] .\\hspace{100cm}\r
$$\r
`;export{n as default};
