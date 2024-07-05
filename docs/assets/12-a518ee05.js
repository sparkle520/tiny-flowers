const n=`# 第十二章 无穷级数\r
\r
## 常数项级数的概念和性质\r
\r
### 常数项级数\r
\r
设数列$\\left \\\\{ a_n \\right \\\\}$为常数列，称$\\displaystyle\\sum_{n=1}^{\\infty}a_n$为**常数项级数**.\r
\r
### 常数项级数的敛散性\r
\r
把$S_n=a_1+a_2+\\cdots+a_n$称为级数$\\displaystyle\\sum_{n=1}^{\\infty}a_n$的**部分和**.\r
\r
若$\\displaystyle\\lim_{n \\to \\infty}S_n$存在，则称级数$\\displaystyle\\sum_{n=1}^{\\infty}a_n$**收敛**.\r
\r
令$\\displaystyle\\lim_{n \\to \\infty}S_n=S$，称级数$\\displaystyle\\sum_{n=1}^{\\infty}a_n$收敛于$S$，记为$\\displaystyle\\sum_{n=1}^{\\infty}a_n=S$.\r
\r
若$\\displaystyle\\lim_{n \\to \\infty}S_n$不存在，则称级数$\\displaystyle\\sum_{n=1}^{\\infty}a_n$**发散**.\r
\r
### 常数项级数的基本性质\r
\r
\`性质一\` (和差法则)\r
\r
设$\\displaystyle\\sum_{n=1}^{\\infty}u_n=A，\\displaystyle\\sum_{n=1}^{\\infty}v_n=B$，则$\\displaystyle\\sum_{n=1}^{\\infty}(u_n±v_n)=\\displaystyle\\sum_{n=1}^{\\infty}u_n±\\displaystyle\\sum_{n=1}^{\\infty}v_n=A±B$.\r
\r
> [注]\r
>\r
> (1) 若级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$与级数$\\displaystyle\\sum_{n=1}^{\\infty}v_n$一个收敛一个发散，则$\\displaystyle\\sum_{n=1}^{\\infty}(u_n±v_n)$必发散.\r
>\r
> (2) 若级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$与级数$\\displaystyle\\sum_{n=1}^{\\infty}v_n$两个都发散，则$\\displaystyle\\sum_{n=1}^{\\infty}(u_n±v_n)$不一定发散.\r
> \r
> 和极限性质类似.\r
\r
\`性质二\` (常数倍法则)\r
\r
设$\\displaystyle\\sum_{n=1}^{\\infty}u_n=S$，则$\\displaystyle\\sum_{n=1}^{\\infty}ku_n=kS$，特别地，若$k≠0$，则$\\displaystyle\\sum_{n=1}^{\\infty}ku_n$与$\\displaystyle\\sum_{n=1}^{\\infty}u_n$有相同的敛散性.\r
\r
\`性质三\` 级数增加、减少、改变有限项不改变级数的敛散性.\r
\r
**\`性质四\`** (级数收敛的必要条件)\r
\r
若$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛，则$\\displaystyle\\lim_{n \\to \\infty}u_n=0$.\r
\r
反之，若$\\displaystyle\\lim_{n \\to \\infty}u_n=0$，则$\\displaystyle\\sum_{n=1}^{\\infty}u_n$不一定收敛. (调和级数$\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n}).$\r
\r
> [注]\r
>\r
> $\\displaystyle\\lim_{n \\to \\infty}u_n ≠ 0 \\Rightarrow  \\displaystyle\\sum_{n=1}^{\\infty}u_n$发散.\r
\r
\`性质五\`\r
\r
如果级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛，那么对这级数的项任意加括号后所成的级数\r
$(u_1+\\cdots+u_{n_1})+(u_{n_1+1}+\\cdots+u_{n_2})+\\cdots+(u_{n_k-1}+u_{n_k})+\\cdots$仍收敛，其和不变.\r
\r
### 两个重要的级数\r
\r
(1) $p$级数：形如$\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n^p}$的级数称为$p$级数.\r
\r
1.若$p≤1$，$p$级数**发散**;\r
\r
2.若$p>1$，$p$级数**收敛**.\r
\r
(1) 几何级数：形如$\\displaystyle\\sum_{n=1}^{\\infty}aq^n(a≠0)$的级数称为几何级数.\r
\r
1.若$|q|≥1$，几何级数**发散**;\r
\r
2.若$|q|<1$，几何级数**收敛**，其和为$S=\\displaystyle\\frac{aq}{1-q}.$\r
\r
\r
### \`积分判别法\`\r
\r
设$\\left \\\\{ a_n \\right  \\\\}$是一个正数项序列，假定对$x≥N$($N$是一个正整数)，$a_n=f(n)$，$f$是$x$的一个连续的，正的，递减函数，则\r
\r
级数$\\displaystyle\\sum_{n=1}^{\\infty}a_n$和积分$\\displaystyle\\int_{N}^{\\infty}f(x)dx$有相同的敛散性.\r
\r
\r
## 正项级数及其审敛法\r
\r
1. 正项级数\r
\r
设$\\displaystyle\\sum_{n=1}^{\\infty}u_n$为常数项级数，若对所有的$n$，有$u_n>0$，则称$\\displaystyle\\sum_{n=1}^{\\infty}u_n$为**正项级数**.\r
\r
> [注] 正项级数的最大特点就是部分和数列$\\left \\\\{S_n\\right \\\\}$.\r
\r
2. 正项级数审敛法\r
\r
\r
\`定理一\` 正项级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛的充分必要条件是：它的部分和数列$\\left \\\\{S_n\\right \\\\}$**有界**.\r
\r
\`定理二\` 设$\\displaystyle\\sum_{n=1}^{\\infty}u_n$和$\\displaystyle\\sum_{n=1}^{\\infty}v_n$都是正项级数，正项级数审敛法如下：\r
\r
#### 比较审敛法\r
\r
1. 基本形式\r
   \r
   (1) 若$u_n≤v_n$，且$\\displaystyle\\sum_{n=1}^{\\infty}v_n$收敛，则$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛；\r
   \r
   (2) 若$u_n≥v_n$，且$\\displaystyle\\sum_{n=1}^{\\infty}v_n$发散，则$\\displaystyle\\sum_{n=1}^{\\infty}u_n$发散.\r
\r
   **大敛小敛，小散大散**.\r
  \r
2. 极限形式\r
\r
   若$\\displaystyle\\lim_{n→\\infty}\\frac{u_n}{v_n}=l(0<l<\\infty)$，则级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$与$\\displaystyle\\sum_{n=1}^{\\infty}v_n$敛散性相同.\r
\r
> [推论]\r
>\r
> (1) 若$\\displaystyle\\lim_{n→\\infty}\\frac{u_n}{v_n}=0$，且$\\displaystyle\\sum_{n=1}^{\\infty}v_n$收敛，则$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛.\r
>\r
> (2) 若$\\displaystyle\\lim_{n→\\infty}\\frac{u_n}{v_n}=+\\infty$，且$\\displaystyle\\sum_{n=1}^{\\infty}v_n$发散，则$\\displaystyle\\sum_{n=1}^{\\infty}u_n$发散.\r
\r
#### 比值审敛法\r
\r
设$\\displaystyle\\lim_{n→\\infty}\\frac{u_{n+1}}{v_n}=\\rho$，则当$\\rho<1$时，级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛，当$\\rho>1$时，级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$**发散**.\r
\r
#### 根值审敛法\r
\r
设$\\displaystyle\\lim_{n→\\infty}\\sqrt[n]{v_n}=\\rho$，则当$\\rho<1$时，级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛，当$\\rho>1$时，级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$**发散**.\r
\r
## 交错级数及其审敛法\r
\r
1. 交错级数\r
\r
   称$\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n-1}u_n$或$\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n}u_n$为**交错级数**，其中$u_n>0\\ (n=1,2,\\cdots).$\r
   \r
2. 莱布尼茨审敛法\r
   \r
   如果交错级数$\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n-1}u_n$满足条件:\r
   \r
   ①$u_n≥u_{n+1}\\ (n=1,2,3,\\cdots)$ \r
\r
   ②$\\displaystyle\\lim_{n \\to \\infty}u_n=0$，那么级数收敛，其和$S≤u_1.$\r
\r
> [注]\r
>\r
> (1) 交错级数的两个条件是交错级数收敛的充分条件，不一定必要.\r
> $\\left \\\\{ u_n\\right \\\\}$不单调递减，交错级数可能收敛也可能发散.\r
>\r
> (2)$\\displaystyle\\lim_{n \\to \\infty}u_n=0$也是交错级数收敛的必要条件.\r
\r
## 级数的条件收敛和绝对收敛\r
\r
1. 绝对收敛和条件收敛的概念\r
\r
- 若级数$\\displaystyle\\sum_{n=1}^{\\infty}|u_n|$收敛，则称$\\displaystyle\\sum_{n=1}^{\\infty}u_n$**绝对收敛**.\r
\r
- 若级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$收敛，而$\\displaystyle\\sum_{n=1}^{\\infty}|u_n|$发散，则称$\\displaystyle\\sum_{n=1}^{\\infty}u_n$**条件收敛**.\r
\r
2. 绝对收敛和条件收敛的关系\r
\r
- \`定理\` 若级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n$绝对收敛，则$\\displaystyle\\sum_{n=1}^{\\infty}u_n$条件收敛，反之不对.\r
\r
## 幂级数\r
\r
1. 函数项级数\r
\r
- $\\displaystyle\\sum_{n=1}^{\\infty}u_n(x)=u_1(x)+u_2(x)+u_3(x)+\\cdots+u_n(x)+\\cdots$称为**函数项级数**.\r
\r
  确定$x$的值后，函数项级数变为常数项级数.\r
\r
- $\\displaystyle\\sum_{n=1}^{\\infty}u_n(x_0)=u_1(x_0)+u_2(x_0)+u_3(x_0)+\\cdots+u_n(x_0)+\\cdots$，若此级数收敛，\r
  \r
  则称$x_0$为级数$\\displaystyle\\sum_{n=1}^{\\infty}u_n(x)$的**收敛点**.\r
  \r
- 所有收敛点组成的集合称为$\\displaystyle\\sum_{n=1}^{\\infty}u_n(x)$的**收敛域**.\r
  \r
- $S(x)=u_1(x)+u_2(x)+u_3(x)+\\cdots+u_n(x)$，若$S(x)=\\displaystyle\\lim_{n \\to \\infty}S_n(x)$存在，则称\r
  \r
  $S(x)$为函数项级数的**和函数**.\r
  \r
2. 幂级数及其收敛性\r
\r
- 形如$\\displaystyle\\sum_{n=0}^{\\infty}a_n(x-x_0)^n$称为**幂级数**，特别地，当$x_0=0$，幂级数变为\r
  \r
  $\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n=a_0+a_1x+a_2x^2+\\cdots+a_nx^n+\\cdots$，其中\r
  \r
  $a_0,a_1,a_2,\\cdots,a_n,\\cdots$为幂级数的**系数**.\r
\r
**定理一 (阿贝尔定理)**\r
\r
对幂级数$\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$，当$x=x_0\\ (x_0 ≠0)$时收敛，那么适合不等式$|x|<|x_0|$的所有$x$使幂级数**绝对收敛**;\r
\r
反之，$\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$，当$x=x_0\\ (x_0 ≠0)$时发散，那么适合不等式$|x|>|x_0|$的所有$x$使幂级数**发散**.\r
\r
> [推论]\r
>\r
> 除过在一点收敛或在整个数轴收敛的情况，幂级数一定存在**收敛半径R**，\r
>\r
> 当$|x|<R$ 时，**幂级数绝对收敛**；\r
>\r
> 当$|x|>R$ 时，**幂级数发散**；\r
>\r
> 当$|x|=R$ 时，**幂级数可能收敛，可能发散**.\r
\r
**定理二 (收敛半径的求法)**\r
\r
若$\\displaystyle\\lim_{n \\to \\infty}|\\frac{a_{n+1}}{a_n}|=\\rho$，则收敛半径为：\r
\r
$$\r
R=\\left\\\\{\r
\\begin{array}{rcl}\r
\\frac{1}{\\rho}       &      & {\\rho  ≠ 0}\\\\\\\\\\\\\r
+\\infty     &      & {\\rho = 0}\\\\\\\\\\\\\r
0       &      & {\\rho = +\\infty}\r
\\end{array} \\right.\r
$$\r
\r
> [注] \r
> \r
> 根值法也可以求其收敛半径.\r
\r
### 幂级数的性质\r
\r
设幂级数$\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$的收敛半径为$R$，其和函数为$S(x)$，则：\r
\r
\`性质一\` 幂级数$\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$的和函数$S(x)$在其收敛域$I$上连续.\r
\r
\`性质二\` 幂级数$\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$的和函数$S(x)$在其收敛域$I$上可积，并有逐项积分公式\r
\r
\r
$$\r
\\int_0^x S(t)dt=\\int_0^x \\left\\[\\sum_{n=0}^{\\infty}a_nt^n\\right\\]dt=\\sum_{n=0}^{\\infty}\\int_0^x a_nt^ndt=\\sum_{n=0}^{\\infty}\\frac{a_n}{n+1}x^{n+1}\\ (x \\in I).\r
$$\r
\r
积分后得到的幂级数收敛半径不变.\r
\r
\`性质三\` 幂级数$\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$的和函数$S(x)$在其收敛区间上可导，并有逐项求导公式\r
\r
$$\r
S'(x)=\\left\\(\\sum_{n=0}^{\\infty}a_nx^n\\right \\)'=\\sum_{n=0}^{\\infty}(a_nx^n)'=\\sum_{n=1}^{\\infty}na_nx^{n-1}\\ (|x|<R)\r
$$\r
\r
求导后得到的幂级数收敛半径不变.\r
\r
### 函数展开成幂级数—用幂级数表示函数\r
\r
常用泰勒公式、麦克劳林公式\r
\r
$$\r
\\begin{array}{*{20}{l}}\r
{\\frac{{1}}{{1-x}}=\\mathop{ \\sum }\\limits_{{n=0}}^{{ \\infty }}\\mathop{{x}}\\nolimits^{{n}}}&{ \\left( {-1 < x < 1} \\right) }\\\\\\\\\\\\\r
{e^x=\\mathop{ \\sum }\\limits_{{n=0}}^{{ \\infty }}\\frac{{1}}{{n!}}\\mathop{{x}}\\nolimits^{{n}}}&{ \\left( {- \\infty  < x <  \\infty } \\right) }\\\\\\\\\\\\\r
{ \\text{sin} x=\\mathop{ \\sum }\\limits_{{k=0}}^{{ \\infty }}\\frac{{\\mathop{{ \\left( {-1} \\right) }}\\nolimits^{{k}}}}{{ \\left( {2k+1} \\left) !\\right. \\right. }}\\mathop{{x}}\\nolimits^{{2k+1}}}&{ \\left( {- \\infty  < x <  \\infty } \\right) }\\\\\\\\\\\\\r
{ \\text{cos} x=\\mathop{ \\sum }\\limits_{{k=0}}^{{ \\infty }}\\frac{{\\mathop{{ \\left( {-1} \\right) }}\\nolimits^{{k}}}}{{ \\left( {2k} \\left) !\\right. \\right. }}\\mathop{{x}}\\nolimits^{{2k}}}&{ \\left( {- \\infty  < x <  \\infty } \\right) }\\\\\\\\\\\\\r
{\\frac{{1}}{{1+x}}=\\mathop{ \\sum }\\limits_{{n=0}}^{{ \\infty }}{\\mathop{{ \\left( {-1} \\right) }}\\nolimits^{{n}}}\\mathop{{x}}\\nolimits^{{n}}}&{ \\left( {-1 < x < 1} \\right) }\\\\\\\\\\\\\r
{ \\text{ln} { \\left( {1+x} \\right) }=\\mathop{ \\sum }\\limits_{{n=0}}^{{ \\infty }}\\frac{{\\mathop{{ \\left( {-1} \\right) }}\\nolimits^{{n}}}}{{n+1}}\\mathop{{x}}\\nolimits^{{n+1}}}&{ \\left( {-1 < x \\le 1} \\right) }\\\\\\\\\\\\\r
{\\mathop{{a}}\\nolimits^{{x}}=\\mathop{ \\sum }\\limits_{{n=0}}^{{ \\infty }}\\frac{{\\mathop{{ \\left( { \\text{ln} a} \\right) }}\\nolimits^{{n}}}}{{n!}}\\mathop{{x}}\\nolimits^{{n}}}&{ \\left( {- \\infty  < x <  \\infty } \\right) }\\\\\\\\\\\\\r
{\\frac{{1}}{{1+\\mathop{{x}}\\nolimits^{{2}}}}=\\mathop{ \\sum }\\limits_{{n=0}}^{{ \\infty }}{\\mathop{{ \\left( {-1} \\right) }}\\nolimits^{{n}}}\\mathop{{x}}\\nolimits^{{2n}}}&{ \\left( {-1 < x < 1} \\right) }\r
\\end{array}\r
$$\r
\r
$arctanx可由\\frac{1}{1+x^2}$逐项积分得出，收敛域为$[-1,1]$.\r
\r
<!-- $$\r
[例]设\\sum_{n=1}^{\\infty}a_n(x-3)^n 在x=- 6 处收敛，在x=12 处发散，则级数\\sum_{n=1}^{\\infty}a_nx^{2n-1}的收敛半径为\\underline{~}\\underline{~}\\underline{~}.\\hspace{100cm}\r
$$ -->\r
`;export{n as default};
