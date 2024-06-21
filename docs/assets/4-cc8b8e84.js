const n=`> 本章节介绍一下绝对值不等式及其证明.  \r
\r
# 绝对值定义  \r
\r
实数$a$的绝对值$|a|$定义为 \r
\r
$$\r
|a|=\\begin{cases}a,&a\\geqslant0,\\\\\\\\\r
\\\\\\\\\r
-a,&a<0.\\end{cases}\r
$$\r
\r
考虑不等式 \r
\r
$$\r
|x|<a.\r
$$\r
\r
根据绝对值的定义，该式等价于 \r
\r
$$\r
0\\leqslant x<a,\\quad\\text{或者}\\quad x<0,-x<a,\r
$$\r
\r
即\r
\r
$$\r
-a<x<a.\r
$$\r
\r
由此可得\r
\r
$$\r
|x|<a\\Longleftrightarrow-\\alpha<x<a.\r
$$\r
\r
即 不等式$|x|<a$的解的集合是开区间 \r
\r
$$\r
(-a,a).\r
$$\r
\r
同理可得\r
\r
$$\r
|y|\\leqslant\\beta\\Longleftrightarrow-\\beta\\leqslant y\\leqslant\\beta.\r
$$\r
\r
即 不等式$|y|<\\beta$的解的集合是闭区间 \r
\r
$$\r
[-\\beta,\\beta].\r
$$\r
\r
我们有显然的不等式 \r
\r
$$\r
-\\left|a\\right|\\leqslant a\\leqslant\\left|a\\right|,\\quad-\\left|b\\right|\\leqslant b\\leqslant\\left|b\\right|.\r
$$\r
\r
将两式相加得 \r
\r
$$\r
-\\left(|a|+|b|\\right)\\leqslant a+b\\leqslant|a|+|b|.\r
$$\r
\r
得到重要不等式\r
\r
**$$|a+b|\\leqslant|a|+|b|.$$**\r
\r
再由上个重要不等式得出 \r
\r
$$|a|=|(a-b)+b|\\leqslant|a-b|+|b|,$$\r
\r
**$$|a|-|b|\\leqslant|a-b|.$$**\r
\r
同理可得 \r
\r
$$|b|-|a|\\leqslant|b-a|=|a-b|,$$\r
\r
即\r
\r
$$|a|-|b|\\geqslant-|a-b|.$$\r
\r
又可得\r
\r
$$-|a-b|\\leqslant|a|-|b|\\leqslant|a-b|,$$\r
\r
即 \r
\r
**$$\\mid\\mid a\\mid-\\mid b\\mid\\mid\\leqslant\\mid a-b\\mid.$$**\r
\r
利用数学归纳法，将不等式\r
\r
$$\r
|a+b|\\leqslant|a|+|b|.\r
$$\r
\r
推广到$n$个实数，则有\r
\r
**$$|a_{1}+a_{2}+\\cdots+a_{n}|\\leqslant|a_{1}|+|a_{2}|+\\cdots+|a_{n}|.$$**\r
\r
**[例]**  \r
\r
已知$|x-a|<\\displaystyle\\frac{c}{4},|y-b|<\\displaystyle\\frac{c}{6}$，求证\r
\r
$$|2x-3y-2a+3b|<c.$$ \r
\r
**[分析]** 考虑对绝对值里面的式子变形处理，再通过绝对值不等式进行放缩.\r
\r
**[解]** \r
\r
$$\r
\\begin{align}\r
|2x-3y-2a+3b|&=|2(x-a)-3(y-b)|\\\\\\\\\r
\\\\\\\\\r
&\\leq|2(x-a)|+|3(y-b)|\\\\\\\\\r
\\\\\\\\\r
&<\\frac{2}{c}+\\frac{2}{c}=c.\r
\\end{align}$$ \r
\r
得证.\r
`;export{n as default};
