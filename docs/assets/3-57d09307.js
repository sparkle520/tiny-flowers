const $=`# 第三章 多维随机变量及其分布\r
\r
## $n$维随机变量概念\r
\r
如果$X_1,X_2,\\cdots,X_n$是定义在同一个样本空间$\\Omega$上的$n$个**随机变量**，则称$(X_1,X_2,\\cdots,X_n)$为**n维随机变量**或**n维随机向量**，$X_i(i=1,2,\\cdots,n)$称为$n$维随机变量的**第$i$个分量**.\r
\r
当$n=2$时，称$(X,Y)$为**二维随机变量**或者**二维随机向量**.\r
\r
## $n$维随机变量的分布函数的概念\r
\r
对任意的$n$个实数$x_1,x_2,\\cdots,x_n$，称$n$元函数\r
\r
$$\r
F(x_1,x_2,\\cdots,x_n)=P\\left\\\\{X_1\\leq x_1,X_2\\leq x_2,\\cdots,X_n\\leq x_n\\right\\\\}\r
$$\r
\r
为$n$维随机变量$(X_1,X_2,\\cdots,X_n)$的**分布函数**，或随机变量$X_1,X_2,\\cdots,X_n$的**联合分布函数**.\r
\r
当$n=2$时，对任意的实数$x,y$，称二元函数\r
\r
$$\r
F(x,y)=P\\left\\\\{X\\leq x,Y\\leq y\\right\\\\}\r
$$\r
\r
为二维随机变量$(X,Y)$的**分布函数**或随机变量$X$和$Y$的**联合分布函数**，记为$(X,Y)\\sim F(x,y)$.\r
\r
## 二维随机变量的分布函数的性质\r
\r
1. $0\\leq F(x,y)\\leq 1$，且$F(x,y)$是对$x$和$y$的**单调不减函数**.\r
\r
2. $F(-\\infty,y)=F(x,-\\infty)=F(-\\infty,-\\infty)=0,\\quad F(+\\infty,+\\infty)=1$.\r
3. $F(x,y)$关于$x$和$y$上均**右连续**，即$F(x+0,y)=F(x,y),\\quad F(x,y+0)=F(x,y)$.\r
4. 随机点$(X,Y)$落在矩形域$G=\\left\\\\{(x,y)\\mid x_1 < X\\leq x_2, y_1<Y \\leq y_2\\right\\\\}$上的概率为\r
\r
$$\r
P\\left\\\\{(X,Y)\\in G\\right\\\\}=F(x_2,y_2)-F(x_1,y_2)-F(x_2,y_1)+F(x_1,y_1)\r
$$\r
\r
## 二维随机变量的边缘分布函数\r
\r
设二维随机变量$(X,Y)$的分布函数为$F(x,y)$，分别称$F_X(x)=P\\left\\\\{X≤x\\right\\\\}$和$F_Y(y)= P\\left\\\\{Y≤y\\right\\\\}$为二维随机变量$(X,Y)$关于$X$和关于$Y$的**边缘分布函数**.边缘分布函数$F_X(x)$和$F_Y(y)$与二维随机变量$(X,Y)$的分布函数$F(x,y)$有如下关系:\r
\r
$$\r
\\begin{equation*}\r
  \\begin{aligned}\r
    F_X(x) &= P\\left\\\\{X\\leq x \\right\\\\}=P\\left\\\\{X\\leq x,Y< +\\infty \\right\\\\} \\\\\\\\\\\\\r
    \\\\\\\\\\\\\r
         &= \\lim_{y \\to +\\infty}P\\left\\\\{X\\leq x,Y\\leq y \\right\\\\} \\\\\\\\\\\\\r
         \\\\\\\\\\\\\r
         &= \\lim_{y \\to +\\infty}F(x,y)=F(x,+\\infty). \\\\\\\\\\\\\r
  \\end{aligned}\r
\\end{equation*}\r
$$\r
\r
同理可得，$F_Y(y)=F(+\\infty,y)$.\r
\r
> [注]\r
>\r
> 对于$(X,Y)$而言，由$(X,Y)$的分布函数可以确定关于$X$、关于$Y$的边缘分布函数.反之，由关于$X$和关于$Y$的边缘分布函数一般是不能确定$(X,Y)$的分布函数的.只有当$X,Y$**相互独立**时，由两边缘分布函数能确定$(X,Y)$的分布函数.\r
\r
## 二维离散型随机变量的概率分布、边缘分布、条件分布\r
\r
### 二维离散型随机变量的概率分布\r
\r
如果二维随机变量$(X,Y)$可能取值为有限个或无穷可列个$(x_i,y_j)(i,j=1,2,\\cdots)$，则称$(X,Y)$是**离散型的随机变量**.设二维离散型随机变量$(X,Y)$的可能取值为$(x_i,y_j)$，则称$(X,Y)$取值$(x_i,y_j)$的概率\r
\r
$$\r
P\\left\\\\{X=x_i,Y=y_j\\right\\\\}=p_{i j}\\quad(i,j=1,2,\\cdots)\r
$$\r
\r
为二维离散型随机变量$(X,Y)$的**概率分布(分布律)**，或称为随机变量$X$和$Y$的**联合概率分布(联合分布律)**.\r
\r
表格法表示：\r
\r
![](https://pic.imgdb.cn/item/66193e0468eb935713d44322.png)\r
\r
#### 二维离散型随机变量的概率分布的性质\r
\r
1. $p_{i j}\\geq 0\\quad(i,j=1,2,\\cdots)$.\r
\r
2. $\\displaystyle\\sum_{i=1}^{\\infty}\\sum_{j=1}^{\\infty}p_{i j}=1.$\r
\r
### 二维离散型随机变量的联合分布函数 \r
\r
设$(X,Y)$的概率分布为$p_{ij},(i,j=1,2,\\cdots)$，则$(X,Y)$的**分布函数**或$X$和$Y$的**联合分布函数**为\r
\r
$$\r
F(x,y)=P\\left\\\\{X\\leq x,Y\\leq y\\right\\\\}=\\sum_{x_i\\leq x}\\sum_{y_i\\leq y}p_{i j}.\r
$$\r
\r
### 二维离散型随机变量的边缘概率分布  \r
\r
二维离散型随机变量$(X,Y)$关于$X$与$Y$的**边缘概率分布**分别定义为: \r
\r
$$p_{i·}=P\\left\\\\{X=x_i\\right\\\\}=\\sum_{j=1}^{\\infty}P\\left\\\\{X=x_i,Y=y_j\\right\\\\}=\\sum_{j=1}^{\\infty}p_{i j}\\quad (i=1,2,\\cdots).$$\r
\r
$$p_{·j}=P\\left\\\\{Y=y_i\\right\\\\}=\\sum_{i=1}^{\\infty}P\\left\\\\{X=x_i,Y=y_j\\right\\\\}=\\sum_{i=1}^{\\infty}p_{i j}\\quad (j=1,2,\\cdots).$$\r
\r
其中，记号$p_{i·}$中的"·"表示$p_{i·}$是由$p_{ij}$关于$j$求和后得到的;同样,$p_{·j}$是由$p_{ij}$关于$i$求和后得到的，即它们分别为联合分布律表格中第$i$行与第$j$列诸元素之和.\r
\r
### 二维离散型随机变量的条件概率分布  \r
\r
设二维离散型随机变量$(X,Y)$的概率分布为$p_{ij},(i,j=1,2,\\cdots)$，对于给定的$j$，若$p_{·j}=P\\left\\\\{Y=y_j\\right\\\\}>0(j=1,2,\\cdots)$，则称 \r
\r
$$\r
P\\left\\\\{X=x_i\\mid Y=y_j\\right\\\\}=\\frac{P\\left\\\\{X=x_i,Y=y_j\\right\\\\}}{P\\left\\\\{Y=y_j\\right\\\\}}=\\frac{p_{i j}}{p_{·j}} \\quad (i=1,2,\\cdots).\r
$$\r
\r
为在"$Y=y_j$"的条件下随机变量$X$的**条件概率分布**.\r
\r
同样，对于给定的$i$，若$p_{i·}=P\\left\\\\{X=x_i\\right\\\\}>0(i=1,2,\\cdots)$，则称 \r
\r
$$\r
P\\left\\\\{Y=y_j\\mid X=x_i\\right\\\\}=\\frac{P\\left\\\\{X=x_i,Y=y_j\\right\\\\}}{P\\left\\\\{X=x_i\\right\\\\}}=\\frac{p_{i j}}{p_{i·}} \\quad (j=1,2,\\cdots).\r
$$\r
\r
为在"$X=x_i$"的条件下随机变量$Y$的**条件概率分布**.\r
\r
## 二维连续型随机变量的联合概率密度、边缘概率密度、条件概率密度\r
\r
### 二维连续型随机变量的联合概率密度 \r
\r
设二维随机变量$(X,Y)$的分布函数为$F(x,y)$，如果存在**非负可积函数**$f(x,y)$使对于任意$x,y$，有 \r
\r
$$\r
F(x,y)=P\\left\\\\{X\\leq x,Y\\leq y\\right\\\\}=\\int_{-\\infty}^{x}\\int_{-\\infty}^{y}f(u,v)dudv\r
$$\r
\r
则称$(X,Y)$为**二维连续型随机变量**，称函数$f(x,y)$为二维随机变量$(X,Y)$的**概率密度**，或称为随机变量$X$和$Y$的**联合概率密度**·\r
\r
#### 二维连续型随机变量的联合概率密度的性质 \r
\r
1. $f(x,y)\\geq 0$.\r
\r
2. $\\displaystyle\\int_{-\\infty}^{+\\infty}\\int_{-\\infty}^{+\\infty}f(x,y)dxdy=1$. \r
\r
3. 设$G$为某个平面上某个区域，则点$(X,Y)$落在区域$G$内的概率为\r
\r
$$\r
P\\left\\\\{(X,Y)\\in G\\right\\\\}=\\underset{G}{\\iint}f(x,y)dxdy.\r
$$\r
\r
4. 若$f(x,y)$在点$(x,y)$处连续，则有$\\frac{\\displaystyle\\partial^{2}F(x,y)}{\\displaystyle\\partial{x}\\partial{y}}=f(x,y)$.\r
\r
### 二维连续型随机变量的边缘概率密度  \r
\r
设二维连续型随机变量$(X,Y)$的概率密度为$f(x,y)$，由 \r
\r
$$\r
F_X(x)=F(x,+\\infty)=\\int_{-\\infty}^{x}\\left[\\int_{-\\infty}^{+\\infty}f(u,v)dv\\right]du.\r
$$\r
\r
可知，$X$也是一个连续型随机变量，且其概率密度为$f_X(x)=\\displaystyle\\int_{-\\infty}^{+\\infty}f(x,y)dy,$\r
\r
则分别称 \r
\r
$$\r
f_X(x)=\\int_{-\\infty}^{+\\infty}f(x,y)dy,\\quad f_Y(y)=\\int_{-\\infty}^{+\\infty}f(x,y)dx\r
$$\r
\r
为二维连续型随机变量$(X,Y)$关于$X$和关于$Y$的**边缘概率密度**. \r
\r
### 二维连续型随机变量的条件概率密度 \r
\r
设二维连续型随机变量$(X,Y)$的概率密度为$f(x,y)$，边缘概率密度$f_X(x)$和$f_Y(y)$连续且恒大于$0$，则称$\\displaystyle\\frac{f(x,y)}{f_Y(y)}$为在条件$Y=y$下$X$的条件概率密度，称$\\displaystyle\\frac{f(x,y)}{f_X(x)}$为在条件$X=x$下$Y$的条件概率密度，分别记作$f_{X\\mid Y}(x\\mid y)$和$f_{Y\\mid X}(y\\mid x)$即\r
\r
$$\r
f_{X\\mid Y}(x\\mid y)=\\frac{f(x,y)}{f_Y(y)},\\quad f_{Y\\mid X}(y\\mid x)=\\frac{f(x,y)}{f_X(x)}.\r
$$ \r
\r
对于二维连续型随机变量$(X,Y)$的条件分布函数$F_{X\\mid Y}(x\\mid y)$和$F_{Y\\mid X}(y\\mid x)$，有\r
\r
$$\r
F_{X\\mid Y}(x\\mid y)=\\int_{-\\infty}^{x}\\frac{f(t,y)}{f_Y(y)}dt,\\quad F_{Y\\mid X}(y\\mid x)=\\int_{-\\infty}^{y}\\frac{f(x,t)}{f_X(x)}dt.\r
$$\r
\r
> [注] \r
> \r
> 在求条件概率密度时应该注意定义域:确保作为条件的边缘概率密度大于$0$,因此要除去边缘概率等于$0$的点.\r
\r
#### 密度乘法公式 \r
\r
$$\r
\\begin{equation*}\r
  \\begin{aligned}\r
    f(x,y) &= f_X(x)f_{Y\\mid X}(y\\mid x) \\quad (f_X(x)>0) \\\\\\\\\\\\\r
    \\\\\\\\\\\\\r
         &= f_Y(y)f_{X\\mid Y}(x\\mid y) \\quad (f_Y(y)>0) \\\\\\\\\\\\\r
  \\end{aligned}\r
\\end{equation*}\r
$$\r
\r
## 二维随机变量的独立性 \r
\r
### 独立性的概念 \r
\r
设F$(x,y)$及$F_X(x),F_Y(y)$分别是二维随机变量$(X,Y)$的分布函数及边缘分布函数.如果对于任意的$x,y$，都有 \r
\r
$$\r
P\\left\\\\{X\\leq x,Y\\leq y\\right\\\\}=P\\left\\\\{X \\leq x\\right\\\\}P\\left\\\\{Y \\leq y\\right\\\\},\r
$$\r
\r
则称随机变量$X$与$Y$**相互独立**.\r
\r
### 相互独立的充分必要条件与性质 \r
\r
#### 相互独立的充要条件 \r
\r
1. 对于二维离散型随机变量$(X,Y)$，随机变量$X$与$Y$**相互独立**的充要条件是\r
\r
$$\r
P\\left\\\\{X =  x_i,Y =  y_j\\right\\\\}=P\\left\\\\{X = x_i\\right\\\\}P\\left\\\\{Y = y_j\\right\\\\},即p_{i j}=p_{i·}p_{·j}\\quad(i,j=1,2,\\cdots).\r
$$\r
\r
2. 对于二维连续型随机变量$(X,Y)$，随机变量$X$与$Y$**相互独立**的充要条件是\r
\r
$$\r
f(x,y)=f_X(x)f_Y(y).\r
$$\r
\r
其中$(x,y)$为$f(x,y),f_X(x),f_Y(y)$的连续点.\r
\r
#### 相互独立的性质 \r
\r
1. 若随机变量$X_1,X_2,\\cdots,X_m$**相互独立**，则其中任意$k(2≤k≤m)$个随机变量也**相互独立**. \r
\r
2. 若随机变量$X_1,X_2,\\cdots,X_m$**相互独立**，则它们的函数$g_1(X_1),g_2(X_2),\\cdots,g_m(X_m)$也**相互独立**. \r
\r
3. 若两个随机变量独立，则一个关于另一个的条件分布就是其无条件分布.即:对于二维离散型随机变量$(X,Y)$，若$X$与$Y$独立，则条件分布等于其边缘分布;对于二维连续型随机变量$(X,Y)$，若$X$与$Y$独立，则条件密度等于其边缘密度.\r
\r
## 两个常见的二维连续型随机变量的分布 \r
\r
### 二维均匀分布 \r
\r
#### 均匀分布的概念 \r
\r
设$G$是平面上的**有界区域**，其面积为$A$.若二维随机变量$(X,Y)$具有联合概率密度 \r
\r
$$\r
f(x,y)=\\left\\\\{\\begin{array}{ll}\r
  \\frac{1}{A}, & (x,y)\\in G \\\\\\\\\\\\\r
  \\\\\\\\\\\\\r
  0, & 其他.\r
\\end{array}\\right.\r
$$\r
\r
则称$(X,Y)$在区域$G$上服从均匀分布. \r
\r
#### 二维均匀分布的性质 \r
\r
1. 服从区域$G$上均匀分布的随机变量$(X,Y)$，它在$G$上任何一个子区域$D(D\\subset G)$内取值的概率只与该子区域的面积$S_D$的大小有关，而与该子区域$D$在$G$内的位置和形状无关,即\r
\r
$$\r
P\\left\\\\{(X,Y)\\in D\\right\\\\}=\\frac{1}{A}S_D.\r
$$\r
\r
如果设$(X,Y)$的概率密度为$f(x,y)$,则 \r
\r
$$\r
P\\left\\\\{(X,Y)\\in D\\right\\\\}=\\underset{D}{\\iint}f(x,y)dxdy=\\frac{1}{A}S_D.\r
$$\r
\r
2. 二维均匀分布的边缘分布、条件分布以及数字特征都与区域$G$的形状密切相关，例如，圆形区域$G=\\left\\\\{(x,y)\\mid x^2+y^2<r^2\\right\\\\}$，则区域$G$上的二维均匀分布的两个边缘分布都不是均匀分布，而其中一个变量关于另一个变量的条件分布都是均匀分布.再如矩形区域$G=\\left\\\\{(x,y)\\mid a≤x≤b,c≤y≤d\\right\\\\}$，则二维均匀分布的两个边缘分布分别为区间$[a,b]$和$[c,d]$上的一维均匀分布.\r
\r
### 二维正态分布 \r
\r
#### 二维正态分布的概念 \r
\r
如果二维连续型随机变量$(X,Y)$的联合概率密度为 \r
\r
$$\r
f(x,y)=\\frac{1}{2\\pi\\sigma_1 \\sigma_2\\sqrt{1-\\rho^2}}\\exp\\left\\\\{-\\frac{1}{2(1-\\rho^2)}\\left[\\left(\\frac{x-\\mu_1}{\\sigma_1}\\right)^2-2\\rho\\frac{x-\\mu_1}{\\sigma_1}\\cdot\\frac{y-\\mu_2}{\\sigma_2}+\\left(\\frac{y-\\mu_2}{\\sigma_2}\\right)^2\\right]\\right\\\\},\r
$$\r
\r
则称$(X,Y)$服从参数为$\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho$的**二维正态分布**，记作$(X,Y)\\sim N(\\mu_1,\\mu_2;\\sigma_1^2,\\sigma_2^2;\\rho)$.其中$\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho$均为常数且$\\sigma_1>0,\\sigma_2>0,|\\rho|<1$.也称$(X,Y)$是一个**二维正态变量**.\r
\r
#### 二维正态分布中参数的概率意义  \r
\r
二维正态分布中$5$个参数的概率意义分别为:$\\mu_1=EX,\\mu_2=EY,\\sigma_1^2=DX,\\sigma_2^2=DY$，而$\\rho$则是$X$与$Y$的相关系数，即$\\rho=\\displaystyle\\frac{Cov(X,Y)}{\\sigma_1 \\sigma_2}$.\r
\r
#### 二维正态分布的性质  \r
\r
设$(X,Y)\\sim N(\\mu_1,\\mu_2;\\sigma_1^2,\\sigma_2^2;\\rho)$，则\r
\r
1. $X \\sim N(\\mu_1,\\sigma_1^2),Y \\sim N(\\mu_2,\\sigma_2^2)$.\r
\r
> [注]\r
> \r
> 该命题的逆命题不成立:即便$X$和$Y$都服从正态分布，甚至$X$和$Y$的相关系数等于$0,X$和$Y$的联合分布也未必是二维正态分布.  \r
> 当然,若$X$和$Y$都服从正态分布并且**相互独立**,则$X$和$Y$的联合分布一定是二维正态分布. \r
\r
2. $X$与$Y$相互独立$\\Rightarrow\\rho=0$(不相关)(当$X,Y$满足联合分布为正态分布的要求时，$X,Y$不相关可推出$X,Y$独立) \r
\r
3. 两个正态分布随机变量$X$与$Y$的任意线性组合$aX+bY$($a,b$为任意实数，且不全为$0$)仍服从正态分布(需满足$X,Y$的联合分布是正态)，且$aX+bY\\sim N(a\\mu_1+b\\mu_2,a^2\\sigma_1^2+b^2\\sigma_2^2+2ab\\rho\\sigma_1\\sigma_2)$ \r
\r
## 多维随机变量函数的分布 \r
\r
### 多维随机变量函数的分布的概念 \r
\r
设$X,Y$为随机变量，$g(x,y)$是二元函数，则以随机变量$X,Y$作为变量的函数$U=g(X,Y)$也是随机变量，称之为**随机变量$X,Y$的函数**. \r
\r
对于一般随机变量函数$U=g(X,Y)$的分布，有如下最一般公式 \r
\r
$$\r
F_U(u)=P\\left\\\\{g(X,Y)\\leq u\\right\\\\}=\\left\\\\{\\begin{array}{ll}\r
  \\displaystyle\\sum_{g(x_i,y_j)\\leq u}p_{ij} \\\\\\\\\\\\\r
  \\\\\\\\\\\\\r
 \\underset{g(x,y)\\leq u}{\\displaystyle\\iint}f(x,y)dxdy \r
 \\end{array}\\right.\r
$$\r
\r
$$\r
当X,Y独立时=\\left\\\\{\\begin{array}{ll}\r
  \\displaystyle\\sum_{g(x_i,y_j)\\leq u}p_{i\\cdot}p_{\\cdot j}& (离散型)\\\\\\\\\\\\\r
  \\\\\\\\\\\\\r
 \\underset{g(x,y)\\leq u}{\\displaystyle\\iint}f_X(x)f_Y(y)dxdy & (连续型)\r
 \\end{array}\\right.\r
$$\r
\r
### 二维离散型随机变量函数的分布的求法  \r
\r
设$(X,Y)$是二维离散型随机变量，联合分布为$p_{ij}=P\\left\\\\{X=x_i,Y=y_j\\right\\\\}$，则 \r
\r
1. $U=g(X,Y)$也是离散型随机变量，其分布律为$P\\left\\\\{U=g(x_i,y_j)\\right\\\\}=P\\left\\\\{X=x_i,Y=y_j\\right\\\\}=p_{ij}$，即\r
\r
$$\r
U \\sim\r
\\begin{equation}\r
 \\left(\r
 \\begin{array}{ccc}\r
    &g(x_1,y_1)\\ \\ \\  &g(x_2,y_2)\\ \\ \\   & \\cdots\\ \\ \\  \\\\\\\\\\\\\r
   &p_{11}\\ \\ \\  &p_{12}\\ \\ \\    &\\cdots\\ \\ \\ \r
 \\end{array}\r
 \\right)\r
 \\end{equation}\r
$$ \r
\r
如果对不同$(x_i,y_j)$中有相同的$g(x_k,y_l)$，则合并诸项为一项$g(x_k,y_l)$，并将相应的概率$p_{ij}$相加作为$u$取值为$g(x_k,y_l)$的概率,即\r
\r
$$\r
P\\left\\\\{U=g(x_k,y_l)\\right\\\\}=\\sum_{i,j:g(x_i,y_j)=g(x_k,y_l)}p_{ij}.\r
$$\r
\r
2. 如果$U=g_1(X,Y),V=g_2(X,Y)$，则$(U,V)$为二维离散型随机变量，求$(U,V)$联合分布的方法有\r
\r
方法一 直接法 直接计算 \r
\r
$$\r
P\\left\\\\{U=a,V=b\\right\\\\}=\\sum_{\r
  \\begin{equation}\r
\\begin{split}\r
     &g_1(x_i,y_j)=a \\\\\\\\\\\\\r
      &g_2(x_i,y_j)=b \\\\\\\\\\\\\r
\\end{split}\r
  \\end{equation}\r
}P\\left\\\\{X=x_i,Y=y_j\\right\\\\}.\r
$$\r
\r
方法二 边缘分布与条件分布法\r
\r
首先求出$U、V$的边缘分布律,再求得$(U,V)$的联合分布的部分值，最后通过边缘分布与联合分布的关系求得$(U.V)$的联合分布律.\r
\r
### 常见的二维连续型随机变量函数的分布的求法 \r
\r
1. \${Z=max\\left\\\\{X,Y\\right\\\\}\\quad Z=min\\left\\\\{X,Y\\right\\\\}}$的分布 \r
\r
设$(X,Y)$的联合分布函数为$F(x,y)$，$X$与$Y$的分布函数分别为$F_X(x)$和$F_Y(y)$，则$Z=max\\left\\\\{X,Y\\right\\\\}$与$Z=min\\left\\\\{X,Y\\right\\\\}$的分布函数分别为\r
\r
\r
\r
$$\r
\\begin{equation*}\r
  \\begin{aligned}\r
  F_{max}(z)&=P\\left\\\\{\\max{(X,Y)}\\leq z\\right\\\\}=P\\left\\\\{X\\leq z,Y\\leq z\\right\\\\}=F(z,z). \\\\\\\\\\\\\r
  \\\\\\\\\\\\\r
  F_{min}(z)&=P\\left\\\\{\\min{(X,Y)}\\leq z\\right\\\\}=P\\left\\\\{(X\\leq z)\\cup(Y\\leq z)\\right\\\\}\r
 \\\\\\\\\\\\\r
    \\\\\\\\\\\\\r
         &=P\\left\\\\{X\\leq z\\right\\\\}+P\\left\\\\{Y\\leq z\\right\\\\}-P\\left\\\\{X\\leq z,Y\\leq z\\right\\\\} \\\\\\\\\\\\\r
         \\\\\\\\\\\\\r
         &= F_X(z)+F_Y(z)-F(z,z). \\\\\\\\\\\\\r
  \\end{aligned}\r
\\end{equation*}\r
$$\r
\r
特别地，当$X,Y$**相互独立**，则有 \r
\r
$$\r
\\begin{equation*}\r
  \\begin{aligned}\r
  F_{max}(z)&=P\\left\\\\{\\max{(X,Y)}\\leq z\\right\\\\}=F_X(z)F_Y(z). \\\\\\\\\\\\\r
  \\\\\\\\\\\\\r
  F_{min}(z)&=P\\left\\\\{\\min{(X,Y)}\\leq z\\right\\\\}=1-[1-F_X(z)][1-F_Y(z)].\r
 \\\\\\\\\\\\\r
  \\end{aligned}\r
\\end{equation*}\r
$$ \r
\r
2. 分布的可加性 \r
\r
**相互独立且服从同类型分布**的随机变量，其和的分布也是同类型的，它们是：二项分布，泊松分布，正态分布与$\\chi^2$分布.即:设随机变量$X$与$Y$相互独立，有 \r
\r
- 若$X\\sim B(n,p),Y\\sim B(m,p)$，则$X+Y\\sim B(n+m,p)$  \r
\r
- 若$X\\sim P(\\lambda_1),Y\\sim P(\\lambda_2)$，则$X+Y\\sim P(\\lambda_1+\\lambda_2)$ \r
- 若$X\\sim N(\\mu_1,\\sigma_1^2),Y\\sim N(\\mu_2,\\sigma_2^2)$，则$X+Y\\sim N(\\mu_1+\\mu_2,\\sigma_1^2+\\sigma_2^2)$ \r
- 若$X\\sim \\chi^2(n),Y\\sim \\chi^2(m)$，则$X+Y\\sim \\chi^2(n+m)$ \r
\r
> [注]\r
> \r
> 上述结果对$n$个**相互独立同分布**的随机变量也成立.\r
\r
关于卷积公式请参见本网站文章[点我查看](https://sparkle520.github.io/TinyFlowers/#/article/topic/3)\r
\r
# 个人笔记 \r
\r
> 斑驳的日子里 夜色愈显漫长 \r
\r
## 二维连续性随机变量题 \r
\r
### No.1\r
\r
设随机变量$X$和$Y$独立同分布，且\r
\r
$$\r
X\\sim f(x)=\\left\\\\{\r
\\begin{aligned}\r
&\\frac{\\sqrt{2}}{\\sqrt{\\pi}}e^{\\displaystyle-\\frac{x^2}{2}} &,x>0, \\\\\\\\\r
\\\\\\\\\r
&0  &,x\\leq 0.\r
\\end{aligned}\r
\\right.\r
$$\r
\r
且$Z=\\displaystyle\\frac{\\min\\left\\\\{X,Y\\right\\\\}}{\\max\\left\\\\{X,Y\\right\\\\}}$. \r
\r
(Ⅰ) 求$Z$的概率密度函数; \r
 \r
(Ⅱ) 判断$X$和$Z$的独立性，并说明理由. \r
\r
**解:** \r
\r
**[分析]** 由于$X$和$Y$独立同分布，易得其联合概率密度为 \r
\r
$$\r
f(x,y)=\\left\\\\{\r
\\begin{aligned}\r
&\\frac{2}{\\pi}e^{\\displaystyle-\\frac{x^2+y^2}{2}} &,x>0,y>0 \\\\\\\\\r
\\\\\\\\\r
&0  &,其他.\r
\\end{aligned}\r
\\right.\r
$$ \r
\r
求$Z$的分布函数需要求出分段点之后进行分段讨论. 由于$x>0,y>0$显然有$z> 0$，故当$z\\leq 0$时，$F_Z(z)=0$，\r
\r
何时能取到$Z$的最大值呢？不妨将$Y$看成最大值，则有$X\\leq Y$，那么要使$\\frac{\\min\\left\\\\{X,Y\\right\\\\}}{Y}$最大，而又由于$X\\leq Y$，那么当且仅当$X=Y$时，取到最大值，故当$z\\geq 1$时，$F_Z(z)=1$. \r
\r
<img style="width:300px" src="https://pic.imgdb.cn/item/663f2fe80ea9cb1403e3d4b7.png"/>\r
\r
现讨论$0<z<1$的情形，由图像可知，当$x>y$时，$z=\\displaystyle\\frac{y}{x}$，解得$y=zx$，当$x<y$时，$z=\\displaystyle\\frac{x}{y}$，解得$y=\\displaystyle\\frac{z}{x}$.  \r
\r
继而可得当$0<z<1$时，$F_Z(z)=p\\left\\\\{Y\\geq \\displaystyle\\frac{X}{z} \\right\\\\}+p\\left\\\\{Y\\leq Xz\\right\\\\}$换成极坐标计算可得结果为$\\displaystyle\\frac{4}{\\pi}arctanz$. \r
\r
对分布函数求导可得\r
\r
$$\r
f_Z(z)=\\left\\\\{\r
\\begin{aligned}\r
&\\frac{4}{\\pi}\\frac{1}{1+z^2} &,0<z<1 \\\\\\\\\r
\\\\\\\\\r
&0  &,其他.\r
\\end{aligned}\r
\\right.\r
$$ \r
\r
现考虑第二问，如果按$f(x,z)=f_X(x)f_Z(z)$想必是非常伤身体的，不妨考虑用$Cov(X,Z)$来证明它们两个不独立，即 \r
$Cov(X,Z)\\neq 0$. \r
\r
通过计算可得$EX=\\sqrt{\\displaystyle\\frac{2}{\\pi}},\\quad EZ=\\displaystyle\\frac{2}{\\pi}ln2,E(XZ)=\\frac{2}{\\pi}\\left[ln(1+\\sqrt{2})-\\sqrt{2}+1\\right]$. \r
\r
由$Cov(X,Z)=E(XZ)-EXEZ \\neq 0$，得出$X$和$Z$不独立. \r
\r
![](https://pic.imgdb.cn/item/663f389b0ea9cb1403f4c41c.jpg) \r
\r
![](https://pic.imgdb.cn/item/663f38b80ea9cb1403f4f9fe.jpg)`;export{$ as default};
