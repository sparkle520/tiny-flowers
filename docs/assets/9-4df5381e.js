const n=`**解：** \r
\r
(I)由比值判别法得$\\lim_{n \\to \\infty}\\frac{u_{n+1}}{u_n}=pe^{-1}$， \r
\r
故当$p<e$时，该级数收敛，当$p>e$时，级数发散.\r
\r
且当$p=e$观察到$(1+\\frac{1}{n})^n$单调递增趋近于$e$，即$\\frac{u_{n+1}}{u_n}=\\frac{e}{(1+\\frac{1}{n})^n}>1$，即$u_n$单调递增不是无穷小量，故p=e时级数发散.`;export{n as default};
