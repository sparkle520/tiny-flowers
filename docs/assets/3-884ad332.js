const r=`在学习卷积公式前，先浅谈一下二重积分的换元法\r
\r
## 二重积分的换元法\r
\r
二重积分换元法是将二重积分中的变量进行换元，即将原二重积分中的变量$x$和$y$分别用$u$和$v$来表示，从而将原二重积分化为新的二重积分.\r
\r
### 定义\r
\r
设$f(x,y)$在$xOy$平面上的闭区域$D$连续，若变换\r
\r
$$\r
T:x=x(u,v),y=y(u,v)\r
$$\r
\r
将$uOv$平面上$D'$一对一映射到$D$，且满足\r
\r
1. $x(u,v),y(u,v)$在$D'$上具有**一阶连续偏导数**.\r
\r
2. 在$D'$上雅可比行列式不为 0，即\r
\r
$$\r
J(u,v)=\\frac{\\partial(x,y)}{\\partial(u,v)}\\neq 0.\r
$$\r
\r
则：\r
\r
$$\r
\\underset{D}{\\iint}f(x,y)dxdy=\\underset{D'}{\\iint}f\\left[x(u,v),y(u,v)\\right]\\left|\\frac{\\partial(x,y)}{\\partial(u,v)}\\right|dudv.\r
$$\r
\r
## 卷积公式\r
\r
设$(X,Y)$为二维连续性随机变量, 概率密度为$f(x,y)$, 则$Z=X+Y$仍为连续性随机变量, 其概率密度为\r
\r
$$\r
f_Z(z)=\\int_{-\\infty}^{+\\infty}f(x,z-x)dx\\quad 或 \\quad f_Z(z)=\\int_{-\\infty}^{+\\infty}f(z-y,y)dy.\r
$$\r
\r
当$X$与$Y$相互独立得到卷积公式  \r
\r
$$\r
f_Z(z)=\\int_{-\\infty}^{+\\infty}f_X(x)f_Y(z-x)dx\\quad 或 \\quad f_Z(z)=\\int_{-\\infty}^{+\\infty}f_X(z-y)f_Y(y)dy.\r
$$\r
\r
那么怎么来的呢?\r
\r
**[分析]**\r
\r
不失一般性地考虑，如果给出一个$Z=g(X,Y)$，那么$Z$的概率密度应为什么呢?\r
\r
不妨将$Z$中的$X、Y$反解出来，改写为$Y=Y(X,Z)$或$X=X(Y,Z)$那么应用我们学到的二重积分换元法，做变换令$y=y(x,z),x=x$或者$x=x(y,z),y=y$那么$xOy$平面上的区域$D$就变成了$xOz$或$zOy$平面上的$D'$.\r
\r
现考虑上式中$Z=X+Y$的情形，解得$Y=Z-X$，不妨做变换令$y=z-x,x=x$，那么$xOy$平面上的区域$D$就变成了$xOz$平面上的$D'$.求出它的雅可比行列式\r
\r
$$\r
J(x,z)=\\left | \\begin{matrix}\r
\\frac{\\partial x}{\\partial x}   & \\frac{\\partial x}{\\partial z} \\\\\\\\\r
\\frac{\\partial y}{\\partial x}  & \\frac{\\partial y}{\\partial z}  \\\\\\\\\r
\\end{matrix} \\right |\r
=\\left | \\begin{matrix}\r
1   &0 \\\\\\\\\r
-1  &1  \\\\\\\\\r
\\end{matrix} \\right |\r
=1.\r
$$\r
\r
继而可得\r
\r
$$\r
F_Z(z)=\\underset{D'}{\\iint}f(x,z-x)|1|dxdz=\\int_{-\\infty}^z\\left\\[\\int_{\\-\\infty}^{+\\infty}f(x,z-x)dx\\right\\]dz.\r
$$\r
\r
立即推\r
\r
$$\r
f_Z(z)=\\frac{dF_Z(z)}{dz}=\\int_{-\\infty}^{+\\infty}f(x,z-x)dx.\r
$$\r
\r
同理可得\r
\r
$Z=\\displaystyle\\frac{Y}{X}$\r
\r
$$\r
f_Z(z)=\\int_{-\\infty}^{+\\infty}f(x,zx)|x|dx.\r
$$\r
\r
$Z=XY$\r
\r
$$\r
f_Z(z)=\\int_{-\\infty}^{+\\infty}f(x,\\frac{z}{x})|\\frac{1}{x}|dx.\r
$$\r
\r
$Z=\\displaystyle\\frac{X+Y}{2}$\r
\r
$$\r
f_Z(z)=\\int_{-\\infty}^{+\\infty}f(x,2z-x)|2|dx.\r
$$\r
\r
<!-- **深入了解**\r
\r
做变换$\\left\\\\{\r
\\begin{aligned}\r
x & =  x(u,v) \\\\\\\\\r
y & =  y(u,v) \r
\\end{aligned}\r
\\right.\r
$\r
则有$\\left\\\\{\r
\\begin{aligned}\r
dx & =  \\frac{\\partial x}{\\partial u}du+ \\frac{\\partial x}{\\partial v}dv\\\\\\\\\r
dy & =  \\frac{\\partial y}{\\partial u}du+ \\frac{\\partial y}{\\partial v}dv\r
\\end{aligned}\r
\\right.\r
$\r
-->\r
`;export{r as default};
