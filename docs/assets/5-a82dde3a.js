const a=`> 本章节先研究数域$K$上$n$维向量及其子空间的结构和性质，再研究线性相关与线性无关的向量组. \r
\r
# 数域定义 \r
\r
复数集的一个子集$K$如满足:\r
\r
1. $0,1\\in K;$\r
\r
2. $a,b\\in K\\Longrightarrow a\\pm b,ab\\in K,$\r
$a,b\\in K,$\r
\r
   且$b\\neq0\\Longrightarrow\\displaystyle\\frac{a}{b}\\in K,$\r
\r
那么,称$K$是一个**数域**. \r
\r
通俗来说，就是该数集内任意两个数的和、差、积、商(除数不为$0$)仍属于该集合，即对加减乘除四种运算封闭.且明确指出包含加法的单位元 $0$ 和乘法的单位元 $1$. \r
\r
$\\symbfit{Q}$(有理数集)$\\symbfit{R}$(实数集)$\\symbfit{C}$(复数集)都为数域.但$\\symbfit{Z}$(整数集)不是数域，这是由于$\\symbfit{Z}$对除法不封闭，可能出现小数.  \r
\r
任一数域都包含有理数域，即有理数域为最小数域.\r
\r
# 向量空间定义  \r
\r
取定一个数域$K$，设$n$是任意给定的一个正整数.令 \r
\r
**$$K^{n}=\\left\\\\{\\left(a_{1},a_{2},\\cdots,a_{n}\\right)\\mid a_{i}\\in K,i=1,2,\\cdots,n\\right\\\\}.$$**\r
\r
如果$a_1=b_1,a_2=b_2,\\cdots,a_n=b_n$，则称$K^n$中两个元素:$(a_1,a_2,\\cdots,a_n)$与$(b_1,b_2,\\cdots,b_n)$相等.\r
\r
在$K^n$中规定加法运算如下\r
\r
$$(a_{1},a_{2},\\cdots,a_{n})+(b_{1},b_{2},\\cdots,b_{n})$$\r
$$\\overset{def}{\\operatorname*{=}}\\left(a_{1}+b_{1},a_{2}+b_{2},\\cdots,a_{n}+b_{n}\\right),$$\r
\r
在$K$的元素与$K^n$的元素之间规定数量乘法运算如下\r
\r
$$k\\left(a_{1},a_{2},\\cdots,a_{n}\\right)\\overset{def}{\\operatorname*{=}}\\left(ka_{1},ka_{2},\\cdots,ka_{n}\\right).$$\r
\r
容易直接验证加法和数量乘法满足下述 $8$ 条运算法则:对于$\\alpha,\\beta,\\gamma\\in K^n,b,k\\in K$，有\r
\r
1. $\\alpha+\\beta=\\beta+\\alpha;$\r
2. $(\\alpha+\\beta)+\\gamma=\\alpha+(\\beta+\\gamma);$\r
3. 把元素$(0,0,\\cdots,0)$记作$0$,它使得\r
\r
$$0+\\alpha=\\alpha+0=\\alpha,$$\r
\r
称$0$是$K^n$的**零元**(具有唯一性);\r
\r
4. 对于$a=(a_{1},a_{2},\\cdots,a_{n})\\in K^{n}$，令\r
\r
$$-a\\overset{def}{\\operatorname*{=}}(-a_{1},-a_{2},\\cdots,-a_{n})\\in K^{n},$$\r
\r
有\r
\r
$$a+\\left(-a\\right)=\\left(-a\\right)+a=0,$$\r
\r
称$-a$是$a$的**负元**(具有唯一性);\r
\r
5. $1\\alpha=\\alpha;$\r
6. $(kl)a=k(la);$\r
7. $(k+l)\\alpha=k\\alpha+l\\alpha;$\r
8. $k(\\alpha+\\beta)=k\\alpha+k\\beta.$\r
\r
**定义** 数域$K$上所有$n$元有序数组组成的集合$K^n$，连同定义在它上面的加法运算和数量乘法运算，及其满足的 $8$ 条运算法则一起，称为数域$K$上的一个$n$维**向量空间**(线性空间).$K^n$的元素称为$n$维**向量**；设向量$a=(a_1,a_2,\\cdots,a_n)$,称$a_i$是$a$的第$i$个**分量**. \r
\r
**证明零元的唯一性** \r
\r
证明$K^n$的零元唯一.\r
\r
**[分析]** 通过任意元素加零元等于其本身来证明，即性质3.\r
\r
**[证]** 设$0_1,0_2$都是$K^n$的零元，则有\r
\r
$$\r
0_1=0_1+\\mathop{0_2}\\limits_{零元}=0_2+\\mathop{0_1}\\limits_{零元}=0_2.\r
$$\r
\r
由于$0_1=0_2$，故唯一.\r
\r
**证明负元的唯一性** \r
\r
对于$\\forall\\alpha\\in K^n$，证明其负元唯一.\r
\r
**[分析]** 通过加法结合律(性质2)和性质3来证明.\r
\r
**[证]** 设$\\beta_1,\\beta_2$都为$\\alpha$的负元，则有\r
\r
$$\r
\\beta_1+(\\alpha+\\beta_2)=\\beta_2+0=\\beta_2,\r
$$\r
$$\r
\\beta_1+(\\alpha+\\beta_2)=(\\beta_1+\\alpha)+\\beta_2=0+\\beta_1=\\beta_1.\r
$$\r
\r
由于$\\beta_1=\\beta_2$，故唯一.\r
\r
**证明$0$$\\alpha$(数量$0$)=0(零元)** \r
\r
对于$\\forall\\alpha\\in K^n$，证明$0\\alpha=0.$\r
\r
**[分析]** 考虑性质7，3.\r
\r
**[证]** $0\\alpha=(0+0)\\alpha=0\\alpha+0\\alpha$\r
\r
对两边同时加上$-0\\alpha$，则有\r
\r
$$0\\alpha+(-0\\alpha)=(0\\alpha+0\\alpha)+(-0\\alpha)$$\r
$$0=0\\alpha.$$\r
\r
得证.\r
\r
在$n$维向量空间$K^n$中，可以定义减法运算如下:\r
\r
$$\\alpha-\\{\\beta}\\overset{\\mathrm{def}}{\\operatorname*{=}}\\{\\alpha}+\\left(-\\{\\beta}\\right).$$\r
\r
在$n$维向量空间$K^n$中，容易直接验证下述 4 条性质:\r
\r
$$0\\{\\alpha}=0,\\forall\\{\\alpha}\\in K^n;$$\r
\r
$$(-1)\\{\\alpha}=-\\{\\alpha},\\forall\\{\\alpha}\\in K^n;$$\r
\r
$$k0=0,\\forall k\\in K;$$\r
\r
$$k\\{\\alpha}=\\{0}\\Longrightarrow k=0\\{或 }\\{\\alpha}=\\{0}.$$\r
\r
$n$元有序数组写成一行$(a_1,a_2,\\cdots,a_n)$，称为**行向量**;写成一列\r
\r
$$\\begin{bmatrix}a_1\\\\\\a_2\\\\\\\\\\vdots\\\\\\\\a_n\\end{bmatrix}$$\r
\r
称为**列向量**.\r
\r
$K^n$既可看为$n$维行向量组成的向量空间，又可看为$n$维列向量组成的向量空间.\r
\r
# 线性组合\r
\r
在$K^n$中，由于有加法和数量乘法两种运算，给定向量组$a_1,a_2,\\cdots,a_s$，任给$K$中一组数$k_1,k_2,\\cdots,k_s$，就可以得到一个向量$k_1a_1+k_2a_2+\\cdots+k_sa_s$，称这个向量是向量组$a_1,a_2,\\cdots,a_n$的一个**线性组合**，其中$k_1,k_2,\\cdots,k_s$称为**系数**.\r
\r
# 线性表出 \r
\r
在$K^n$中，给定向量组$a_1,a_2,\\cdots,a_s$，对于$\\beta\\in K^n$，如果存在$K$中一组数$c_1,c_2,\\cdots,c_s$,使得\r
\r
**$$\\beta=c_{1}\\alpha_{1}+c_{2}\\alpha_{2}+\\cdots+c_{s}\\alpha_{s},$$**\r
\r
那么称$\\beta$可以由$\\alpha_1,\\alpha_2,\\cdots,\\alpha_s$,**线性表出**. \r
\r
一个向量$\\beta$能不能由向量组$\\alpha_1,\\alpha_2,\\cdots,\\alpha_s$线性表出，这揭示了$\\beta$与$\\alpha_1,\\alpha_2,\\cdots,\\alpha_s$有没有通过**加法**和**数量乘法**两种运算建立起来的关系.这种关系正是我们特别关注的.从下面关于线性方程组有没有解的刻画可以看到这一点. \r
\r
利用向量的加法运算和数量乘法运算，可以把数域$K$上$n$元线性方程组 \r
\r
$$\r
\\begin{equation}\r
\\left\\\\{\r
\\begin{array}{c}\r
    a_{11}x_1+a_{12}x_2+\\cdots+a_{1n}x_n=b_1 \\\\\\\\\r
    a_{21}x_1+a_{22}x_2+\\cdots+a_{2n}x_n=b_2 \\\\\\\\\r
    \\cdots \\\\\\\\\r
    a_{s1}x_1+a_{s2}x_2+\\cdots+a_{sn}x_n=b_s\r
\\end{array}\r
\\right.\r
\\end{equation}\r
$$\r
\r
写为\r
\r
$$\r
x_1\\begin{bmatrix}a_{11}\\\\\\a_{21}\\\\\\\\...\\\\\\a_{s1}\\end{bmatrix}+x_2\\begin{bmatrix}a_{12}\\\\\\a_{22}\\\\\\\\...\\\\\\a_{s2}\\end{bmatrix}+\\cdots+x_n\\begin{bmatrix}a_{1n}\\\\\\a_{2n}\\\\\\\\...\\\\\\a_m\\end{bmatrix}=\\begin{bmatrix}b_1\\\\\\b_2\\\\\\\\...\\\\\\b_s\\end{bmatrix}\r
$$\r
\r
即\r
\r
$$x_{1}a_{1}+x_{2}a_{2}+\\cdots+x_{n}a_{n}=\\beta.$$\r
\r
其中$a_1,a_2,\\cdots,a_n$是线性方程组的系数矩阵的列向量组;$\\beta$是由常数项组成的列向量，于是\r
\r
数域$K$上线性方程组$x_1a_1+x_2a_2+\\cdots+x_na_n=\\beta$**有解** \r
\r
$\\Longleftrightarrow K$中存在一组数$c_1,c_2,\\cdots,c_n,$使得下式成立\r
$$c_1{\\alpha}_1+c_2{\\alpha}_2+\\cdots+c_n{\\alpha}_n=\\beta.$$\r
$\\Longleftrightarrow\\beta$可以由$\\alpha_1,\\alpha_2,\\cdots,\\alpha_n$**线性表出**.\r
\r
这样可把**线性方程组有没有解**的问题归结为:**常数项列向量$\\beta$能不能由系数矩阵的列向量组线性表出**.\r
\r
为此我们需要研究其线性组合的结构和性质 \r
\r
设向量组$\\alpha_1,\\alpha_2,\\cdots,\\alpha_s$所有线性组合组成一个集合$W$，即\r
\r
$$\r
W\\overset{def}{\\operatorname*{=}}\\left\\\\{k_1\\alpha_1+k_2\\alpha_2+\\cdots+k_s\\alpha_s\\mid k_i\\in K,i=1,2,\\cdots,s\\right\\\\}.\r
$$\r
\r
任取$\\alpha,\\gamma\\in W$ 设 \r
\r
$$a=a_{1}\\alpha_{1}+a_{2}\\alpha_{2}+\\cdots+a_{s}\\alpha_{s},\\gamma=b_{1}\\alpha_{1}+b_{2}\\alpha_{2}+\\cdots+b_s\\alpha_{s},$$\r
\r
则有\r
$$a+\\gamma=\\left(a_{1}+b_{1}\\right)a_{1}+\\left(a_{2}+b_{2}\\right)a_{2}+\\cdots+\\left(a_{s}+b_{s}\\right)a_{s}\\in W,$$\r
$$k\\alpha=\\left(ka_{1}\\right)\\alpha_{1}+\\left(ka_{2}\\right)\\alpha_{2}+\\cdots+\\left(ka_{s}\\right)\\alpha_{s}\\in W,$$\r
\r
其中$k$是$K$中任意数.\r
\r
由此我们自然引出线性子空间的定义.\r
\r
# 线性子空间  \r
\r
**定义** 设$K^n$的一个非空子集$U$如果满足\r
\r
1. $\\alpha,\\gamma\\in U\\Longrightarrow\\alpha+\\gamma\\in U,$\r
\r
2. $\\alpha\\in U,k\\in K\\Longrightarrow k\\alpha\\in U,$\r
\r
那么称$U$是$K^n$的一个**线性子空间**，简称为**子空间**. \r
\r
其性质一二分别对加法封闭和数量乘法封闭.\r
\r
$\\left\\\\{0\\right\\\\}$是$K^n$的一个子空间，称它为**零子空间**.$K^n$本身也是$K^n$的一个子空间.\r
\r
从上述可知$K^n$中，向量组$\\alpha_1,\\alpha_2,\\cdots,\\alpha_s$的所有线性组合组成的集合$W$是$K^n$的一个子空间，称为$\\alpha_1,\\alpha_2,\\cdots,\\alpha_s$张成的**子空间**，记作 \r
\r
**$$\\langle\\alpha_1,\\alpha_2,\\cdots,\\alpha_s\\rangle.$$**\r
\r
且有如下结论 \r
\r
数域$K$上$n$元线性方程组$x_1a_1+x_2a_2+\\cdotp\\cdotp\\cdotp+x_na_n=\\beta$有解 \r
\r
$\\Longleftrightarrow\\beta$可以由$\\alpha_1,\\alpha_2,\\cdots,\\alpha_n$线性表出 \r
\r
$\\Longleftrightarrow\\beta\\in\\langle\\alpha_{1},\\alpha_{2},\\cdots,\\alpha_{n}\\rangle.$\r
\r
这个结论开辟了直接从线性方程组的系数和常数项判断方程组有没有解的新途经.也就是去研究向量组$\\alpha_1,\\alpha_2,\\cdots,\\alpha_n$生成的子空间$\\langle\\alpha_{1},\\alpha_{2},\\cdots,\\alpha_{n}\\rangle$的结构.\r
\r
# 线性相关与线性无关的向量组 \r
\r
几何空间$V$(由所有以原点为起点的向量组成)中,取定三个不共面的向量$e_1,e_2,e_3$，则$V$中每一个向量$a$都可以由$e_1,e_2,e_3$唯一地线性表出\r
\r
$$a=a_1e_1+a_2e_2+a_3e_3,$$\r
\r
这样几何空间$V$的结构就很清楚了.由此受到启发，在$n$维向量空间$K^n$中，是否也有有限多个向量具有几何空间中“不共面”的三个向量那样的性质?已知\r
\r
$a_1,a_2,a_3$**共面**的充分必要条件是有不全为$0$的实数$k_1,k_2,k_3$，使得\r
\r
$$k_1a_1+k_2a_2+k_3a_3=0.$$\r
\r
$a_1,a_2,a_3$**不共面**的充分必要条件是\r
\r
$$k_1a_1+k_2a_2+k_3a_3=0,$$\r
\r
可推出$k_1=0,k_2=0,k_3=0.$ \r
\r
类似地，在$n$维向量空间$K^n$中，引进下述两个重要概念:\r
\r
# 线性相关与线性无关  \r
\r
## 线性相关定义  \r
\r
$K^n$中向量组$\\alpha_1,\\cdots,\\alpha_s,(s≥1)$称为是**线性相关**的，如果$K$中有不全为$0$的数$k_1,\\cdots,k_s$，使得\r
\r
**$$k_1\\alpha_1+\\cdotp\\cdotp\\cdotp+k_s\\alpha_s=0.$$**  \r
\r
## 线性无关定义  \r
\r
$K^n$中向量组$\\alpha_1,\\cdots,\\alpha_s,(s≥1)$如果不是线性相关的，那么称为**线性无关**的，即如果\r
\r
**$$k_1\\alpha_1+\\cdotp\\cdotp\\cdotp+k_s\\alpha_s=0.$$** \r
\r
则可推出所有系数$k_1,\\cdots,k_s$全为$0$，称向量组$\\alpha_1,\\cdots,\\alpha_s,$是**线性无关**的. \r
\r
由上述可知，几何空间中，共面的三个向量是线性相关的，不共面的三个向量是线性无关的;共线的两个向量是线性相关的，不共线的两个向量是线性无关的.\r
\r
从线性相关、线性无关的定义可知 \r
\r
1. 包含零向量的向量组一定线性相关$($因为$10(0$向量$)+0\\alpha_2+\\cdots+0\\alpha_s=0);$ \r
\r
2. 单个向量$\\alpha$线性相关当且仅当$\\alpha=0$(因为$k\\alpha=0,k\\neq0\\Longleftrightarrow\\alpha=0$)，从而单个向量$\\alpha$线性无关当且仅当$\\alpha\\neq0$;\r
\r
3. $K^n$中，向量组\r
\r
$$\\varepsilon_{1}=\\begin{bmatrix}1\\\\\\0\\\\\\0\\\\\\\\:\\\\\\0\\\\\\0\\end{bmatrix},\\varepsilon_{2}=\\begin{bmatrix}0\\\\\\1\\\\\\0\\\\\\\\:\\\\\\0\\\\\\0\\end{bmatrix},\\cdots,\\varepsilon_{n}=\\begin{bmatrix}0\\\\\\0\\\\\\0\\\\\\\\:\\\\\\0\\\\\\1\\end{bmatrix}$$ \r
\r
是线性无关的(因为从$k_1\\varepsilon_1+k_2\\varepsilon_2+\\cdots+k_n\\varepsilon_n=0$可得出$k_1=k_2=\\cdots=k_n=0$).  \r
\r
## 线性无关与线性相关区别\r
\r
线性相关与线性无关是线性代数中最基本的概念之一.可以从几个角度来考查线性相关的向量组与线性无关的向量组的本质区别:\r
\r
### 从线性组合看: \r
\r
&emsp;&emsp;&emsp;&emsp;向量组$\\alpha_1,\\cdots,\\alpha_s,(s\\geqslant1)$**线性相关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$它们**有系数不全为**$0$的线性组合等于零向量;\r
\r
&emsp;&emsp;&emsp;&emsp;向量组$\\alpha_1,\\cdots,\\alpha_s,(s\\geqslant1)$**线性无关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$它们**只有系数全为**$0$的线性组合才会等于零向量;\r
\r
### 从线性表出看:  \r
\r
&emsp;&emsp;&emsp;&emsp;向量组$\\alpha_1,\\cdots,\\alpha_s,(s\\geqslant2)$**线性相关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$其中**至少有一个**向量可由**其余向量**线性表出.  \r
\r
&emsp;&emsp;&emsp;&emsp;向量组$\\alpha_1,\\cdots,\\alpha_s,(s\\geqslant2)$**线性无关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$其中**每一个向量都不能**由**其余向量**线性表出.  \r
\r
### 从齐次方程看:  \r
\r
&emsp;&emsp;&emsp;&emsp;列向量组$\\alpha_1,\\cdots,\\alpha_s,(s\\geqslant1)$**线性相关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$齐次线性方程组$x_1\\alpha_1+\\cdots+x_s\\alpha_s=0$**有非零解**.\r
\r
&emsp;&emsp;&emsp;&emsp;列向量组$\\alpha_1,\\cdots,\\alpha_s,(s\\geqslant1)$**线性无关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$齐次线性方程组$x_1\\alpha_1+\\cdots+x_s\\alpha_s=0$**只非零解**.\r
\r
### 从行列式看:  \r
\r
&emsp;&emsp;&emsp;&emsp;$n$个$n$维列(行)向量$\\alpha_1,\\alpha_2,\\cdots,\\alpha_n$**线性相关**  \r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$以$\\alpha_1,\\alpha_2,\\cdots,\\alpha_n$为列(行)向量组的矩阵的行列式**等于零**;\r
\r
&emsp;&emsp;&emsp;&emsp;$n$个$n$维列(行)向量$\\alpha_1,\\alpha_2,\\cdots,\\alpha_n$**线性无关**  \r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$以$\\alpha_1,\\alpha_2,\\cdots,\\alpha_n$为列(行)向量组的矩阵的行列式**不等于零**;\r
\r
### 从向量组线性表出一个向量的方式看: \r
\r
&emsp;&emsp;&emsp;&emsp;设向量$\\beta$可以由向量组$\\alpha_1,\\cdots,\\alpha_s$线性表出，则向量组$\\alpha_1,\\cdots,\\alpha_s,$**线性无关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$**表出方式唯一**. \r
\r
> [注] 表出唯一当且仅当向量组$\\alpha_1,\\cdots,\\alpha_s$线性无关.\r
\r
&emsp;&emsp;&emsp;&emsp;向量组$\\alpha_1,\\cdots,\\alpha_s$**线性相关**\r
\r
&emsp;&emsp;&emsp;&emsp;$\\Longleftrightarrow$**表出方式无穷多种**. \r
\r
### 从向量组与其部分组关系看: \r
\r
&emsp;&emsp;&emsp;&emsp;如果向量组的**一个部分组线性相关**，那么**整个向量组也线性相关**.\r
\r
&emsp;&emsp;&emsp;&emsp;如果向量组**线性无关**，那么其**任何一个部分组也线性无关**.  \r
\r
### 从向量组与它的延伸组或缩短组的关系看: \r
\r
&emsp;&emsp;&emsp;&emsp;如果向量组**线性无关**，那么把每个向量添上$m$个分量(所添分量的位置对于每个向量都一样)得到的**延伸组也线性无关**. \r
\r
&emsp;&emsp;&emsp;&emsp;如果向量组**线性相关**，那么把每个向量去掉$m$个分量(去掉的分量的位置对手每个向量都一样)得到的**缩短组也线性相关**(这是上述命题的逆否命题).  \r
\r
## 线性表出问题  \r
\r
研究$n$维向量空间$K^n$及其子空间的结构，除了需要线性相关和线性无关的概念外，还需要研究一个向量$\\beta$能不能由向量组$\\alpha_1,\\cdots,\\alpha_s$线性表出的问题.首先研究向量组$\\alpha_1,\\cdots,\\alpha_s$线性无关的情形，有下述结论: \r
\r
**命题** 设向量组$\\alpha_1,\\cdots,\\alpha_s$线性无关，则向量$\\beta$可以由$\\alpha_1,\\cdots,\\alpha_s$线性表出的充分必要条件是$\\alpha_1,\\cdots,\\alpha_s,\\beta$线性相关. \r
\r
**[证]**  \r
\r
对于必要性是显然的(向量$\\beta$可以由$\\alpha_1,\\cdots,\\alpha_s$线性表出)\r
\r
充分性  \r
\r
设$\\alpha_1,\\cdots,\\alpha_s,\\beta$线性相关，则$K$中有不全为$0$的数$k_1,k_2,\\cdots,k_s,l$使得 \r
\r
$$k_{1}\\alpha_{1}+k_{2}\\alpha_{2}+\\cdots+k_{s}\\alpha_{s}+l\\beta=0.$$ \r
\r
假若$l=0$ ，则$k_{1}\\alpha_{1}+k_{2}\\alpha_{2}+\\cdots+k_{s}\\alpha_{s}=0$，且$k_1,k_2,\\cdots,k_s$不全为$0$，从而$\\alpha_1,\\cdots,\\alpha_s$线性相关，与已知矛盾.\r
\r
故$l\\neq0$，从而有\r
\r
$$\\beta=-\\frac{k_{1}}{l}a_{1}-\\frac{k_{2}}{l}a_{2}-\\cdots-\\frac{k_{s}}{l}a_s.$$\r
\r
**推论** 设向量组$\\alpha_{1},\\cdots,\\alpha_{s}$线性无关，则向量$\\beta$不能由$\\alpha_{1},\\cdots,\\alpha_s$线性表出的充分必要条件是$\\alpha_{1},\\cdots,\\alpha_{s},\\beta$线性无关.\r
\r
\r
# 例题集  \r
\r
## 例题1 \r
\r
设 $\\alpha_1,\\alpha_2,\\cdots,\\alpha_s\\in K^n$，说明\r
\r
$$\\alpha_i\\in\\langle \\alpha_1,\\alpha_2,\\cdots,\\alpha_s\\rangle,i=1,2,\\cdots,s.$$ \r
\r
**[分析]** 注意到，$\\alpha_i$可由其向量组线性表出.\r
\r
**[证]** \r
\r
由于$\\alpha_i = 0\\alpha_1+\\cdots+\\alpha_{i-1}+1\\alpha_i+0\\alpha_{i+1}+\\cdots+0\\alpha_s$，故$\\alpha_i$可由向量组$\\alpha_1,\\alpha_2,\\cdots,\\alpha_s$线性表出.\r
\r
## 例题2  \r
\r
设$a_{1},a_{2},\\cdotp\\cdotp\\cdotp\\cdotp,a_{r}$是两两不同的数，$r\\leqslant n$.令\r
$$\\left.a_{1}=\\left[\\begin{matrix}1\\\\\\a_{1}\\\\\\\\:\\\\\\a_{1}^{n-1}\\end{matrix}\\right.\\right],a_{2}=\\left[\\begin{matrix}1\\\\\\a_{2}\\\\\\\\:\\\\\\a_{2}^{n-1}\\end{matrix}\\right],\\cdots,a_{r}=\\left[\\begin{matrix}1\\\\\\a_{r}\\\\\\\\:\\\\\\a_{r}^{n-1}\\end{matrix}\\right],$$\r
证明$\\alpha_1,\\alpha_2,\\cdots,\\alpha_r$ 是线性无关的.\r
\r
**[分析]** 注意到，其系数行列式是范德蒙行列式，依据此来证明该系数行列式不为0.\r
\r
**[证]** \r
\r
当$r=n$时，显然系数矩阵为一个$n$阶范德蒙行列式，又由于$a_{1},a_{2},\\cdotp\\cdotp\\cdotp\\cdotp,a_{r}$是两两不同的数，故行列式不为0，从而线性无关.\r
\r
当$r<n$时，其$r$阶范德蒙行列式也不为0，故延伸组也线性无关.\r
\r
综上所述，$\\alpha_1,\\alpha_2,\\cdots,\\alpha_r$ 是线性无关的.`;export{a as default};
