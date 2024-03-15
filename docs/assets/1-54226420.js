const n=`# 第十二章 无穷级数\r
\r
## 常数项级数的概念和性质\r
\r
### 常数项级数\r
\r
$$设数列\\left \\\\{ a_n \\right \\\\}为常数列，称\\sum_{n=1}^{\\infty}a_n为常数项级数.\\hspace{100cm}$$\r
\r
### 常数项级数的敛散性\r
\r
$$\r
\\begin{flalign}\r
&把S_n=a_1+a_2+\\cdots+a_n称为级数\\sum_{n=1}^{\\infty}a_n的部分和，\r
若\\lim_{n \\to \\infty}S_n存在，则称级数\\sum_{n=1}^{\\infty}a_n收敛. \\hspace{100cm}\\\\\\\\\\\\\r
&令\\lim_{n \\to \\infty}S_n=S，称级数\\sum_{n=1}^{\\infty}a_n收敛于S，记为\\sum_{n=1}^{\\infty}a_n=S.\r
\\end{flalign}\r
$$\r
\r
$$若\\lim_{n \\to \\infty}S_n不存在，则称级数\\sum_{n=1}^{\\infty}a_n发散.\\hspace{100cm}$$\r
\r
### 常数项级数的基本性质\r
\r
\`性质一\` (和差法则)\r
\r
$$\r
设\\sum_{n=1}^{\\infty}u_n=A，\\sum_{n=1}^{\\infty}v_n=B，则\\sum_{n=1}^{\\infty}(u_n±v_n)=\\sum_{n=1}^{\\infty}u_n±\\sum_{n=1}^{\\infty}v_n=A±B.\\hspace{100cm}\r
$$\r
\r
> [注]\r
>\r
> $$\r
> (1)若级数\\sum_{n=1}^{\\infty}u_n与级数\\sum_{n=1}^{\\infty}v_n一个收敛一个发散，则\\sum_{n=1}^{\\infty}(u_n±v_n)必发散.\\hspace{100cm}\r
> $$\r
>\r
> $$\r
> (2)若级数\\sum_{n=1}^{\\infty}u_n与级数\\sum_{n=1}^{\\infty}v_n两个都发散，则\\sum_{n=1}^{\\infty}(u_n±v_n)不一定发散.\\hspace{100cm}\r
> $$\r
\r
\`性质二\` (常数倍法则)\r
\r
$$\r
设\\sum_{n=1}^{\\infty}u_n=S，则\\sum_{n=1}^{\\infty}ku_n=kS，特别地，若k≠0，则\\sum_{n=1}^{\\infty}ku_n与 \\sum_{n=1}^{\\infty}u_n有相同的敛散性.\\hspace{100cm}\r
$$\r
\r
\`性质三\` 级数增加、减少、改变有限项不改变级数的敛散性.\r
\r
**\`性质四\`** (级数收敛的必要条件)\r
\r
$$\r
 若\\sum_{n=1}^{\\infty}u_n收敛，则\\lim_{n \\to \\infty}u_n=0.反之，\r
若\\lim_{n \\to \\infty}u_n=0，则\\sum_{n=1}^{\\infty}u_n不一定收敛. (调和级数\\sum_{n=1}^{\\infty}\\frac{1}{n})\\hspace{100cm}\r
$$\r
\r
> [注]\r
>\r
> $$\r
> \\lim_{n \\to \\infty}u_n ≠ 0 \\Rightarrow  \\sum_{n=1}^{\\infty}u_n发散.\\hspace{100cm}\r
> $$\r
\r
\`性质五\`\r
\r
$$\r
\\begin{flalign}\r
&\\ 如果级数\\sum_{n=1}^{\\infty}u_n收敛，那么对这级数的项任意加括号后所成的级数\\hspace{100cm}\\\\\\\\\\\\\r
&(u_1+\\cdots+u_{n_1})+(u_{n_1+1}+\\cdots+u_{n_2})+\\cdots+(u_{n_k-1}+u_{n_k})+\\cdots仍收敛，其和不变.\\hspace{100cm}\\\\\\\\\\\\\r
\\end{flalign}\r
$$\r
\r
### 两个重要的级数\r
\r
$$\r
(1)\\ p级数：形如\\sum_{n=1}^{\\infty}\\frac{1}{n^p}的级数称为p级数.\\hspace{100cm}\r
$$\r
\r
$$\r
1.若p≤1，p级数发散;\\hspace{100cm}\r
$$\r
\r
$$\r
2.若p>1，p级数收敛.\\hspace{100cm}\r
$$\r
\r
$$\r
(1)\\ 几何级数：形如\\sum_{n=1}^{\\infty}aq^n(a≠0)的级数称为几何级数.\\hspace{100cm}\r
$$\r
\r
$$\r
1.若|q|≥1，几何级数发散;\\hspace{100cm}\r
$$\r
\r
$$\r
2.若|q|<1，几何级数收敛，其和为S=\\frac{aq}{1-q}.\\hspace{100cm}\r
$$\r
\r
### \`积分判别法\`\r
\r
$$\r
设\\left \\\\{ a_n \\right  \\\\}是一个正数项序列，假定对x≥N(N是一个正整数)，a_n=f(n)，f是x的一个连续的，\\hspace{100cm}\r
$$\r
\r
$$\r
正的，递减函数，则级数\\sum_{n=1}^{\\infty}a_n和积分\\int_{N}^{\\infty}f(x)dx有相同的敛散性.\\hspace{100cm}\r
$$\r
\r
## 正项级数及其审敛法\r
\r
1. 正项级数\r
\r
$$\r
设\\sum_{n=1}^{\\infty}u_n为常数项级数，若对所有的n，有u_n>0，则称\\sum_{n=1}^{\\infty}u_n为正项级数.\\hspace{100cm}\r
$$\r
\r
> [注] 正项级数的最大特点就是部分和数列$\\left \\\\{S_n\\right \\\\}$\r
\r
2. 正项级数审敛法\r
\r
$$\r
定理一\\ 正项级数\\sum_{n=1}^{\\infty}u_n收敛的充分必要条件是：它的部分和数列\\left \\\\{S_n\\right \\\\}有界.\\hspace{100cm}\r
$$\r
\r
$$\r
定理二\\ 设\\sum_{n=1}^{\\infty}u_n和\\sum_{n=1}^{\\infty}v_n都是正项级数，正项级数审敛法如下：\\hspace{100cm}\r
$$\r
\r
#### 比较审敛法\r
\r
1. 基本形式\r
   $$\r
   (1)\\ 若u_n≤v_n，且\\sum_{n=1}^{\\infty}v_n收敛，则\\sum_{n=1}^{\\infty}u_n收敛；\\hspace{100cm}\r
   $$\r
   $$\r
   (2)\\ 若u_n≥v_n，且\\sum_{n=1}^{\\infty}v_n发散，则\\sum_{n=1}^{\\infty}u_n发散.\\hspace{100cm}\r
   $$\r
2. 极限形式\r
\r
   $$\r
   若\\lim_{n→\\infty}\\frac{u_n}{v_n}=l(0<l<\\infty)，则级数\\sum_{n=1}^{\\infty}u_n与\\sum_{n=1}^{\\infty}v_n敛散性相同.\\hspace{100cm}\r
   $$\r
\r
> [推论]\r
>\r
> $$\r
> (1)若\\lim_{n→\\infty}\\frac{u_n}{v_n}=0，且\\sum_{n=1}^{\\infty}v_n收敛，则\\sum_{n=1}^{\\infty}u_n收敛.\\hspace{100cm}\r
> $$\r
>\r
> $$\r
> (2)若\\lim_{n→\\infty}\\frac{u_n}{v_n}=+\\infty，且\\sum_{n=1}^{\\infty}v_n发散，则\\sum_{n=1}^{\\infty}u_n发散.\\hspace{100cm}\r
> $$\r
\r
#### 比值审敛法\r
\r
$$\r
设\\lim_{n→\\infty}\\frac{u_{n+1}}{v_n}=\\rho，则当\\rho<1时，级数\\sum_{n=1}^{\\infty}u_n收敛，当\\rho>1时，级数\\sum_{n=1}^{\\infty}u_n发散.\\hspace{100cm}\r
$$\r
\r
#### 根值审敛法\r
\r
$$\r
设\\lim_{n→\\infty}\\sqrt[n]{v_n}=\\rho，则当\\rho<1时，级数\\sum_{n=1}^{\\infty}u_n收敛，当\\rho>1时，级数\\sum_{n=1}^{\\infty}u_n发散.\\hspace{100cm}\r
$$\r
\r
## 交错级数及其审敛法\r
\r
1. 交错级数\r
   $$\r
   称\\sum_{n=1}^{\\infty}(-1)^{n-1}u_n或\\sum_{n=1}^{\\infty}(-1)^{n}u_n为交错级数，其中u_n>0\\ (n=1,2,\\cdots).\\hspace{100cm}\r
   $$ \r
   \r
2. 莱布尼茨审敛法\r
   $$\r
   如果交错级数\\sum_{n=1}^{\\infty}(-1)^{n-1}u_n满足条件：\\hspace{100cm}\r
   $$\r
   $$\r
   ①\\ u_n≥u_{n+1}\\ (n=1,2,3,\\cdots)\\ \\\r
   ②\\lim_{n \\to \\infty}u_n=0，那么级数收敛，其和S≤u_1.\\hspace{100cm}\r
   $$\r
\r
> [注]\r
>\r
> (1) 交错级数的两个条件是交错级数收敛的充分条件，不一定必要.\r
> $\\left \\\\{ u_n\\right \\\\}$不单调递减，交错级数可能收敛也可能发散.\r
>\r
> $$\r
> (2)\\lim_{n \\to \\infty}u_n=0也是交错级数收敛的必要条件.\\hspace{100cm}\r
> $$\r
\r
## 级数的条件收敛和绝对收敛\r
\r
1. 绝对收敛和条件收敛的概念\r
\r
- $$\r
  若级数\\sum_{n=1}^{\\infty}|u_n|收敛，则称\\sum_{n=1}^{\\infty}u_n绝对收敛.\\hspace{100cm}\r
  $$\r
- $$\r
  若级数\\sum_{n=1}^{\\infty}u_n收敛，而\\sum_{n=1}^{\\infty}|u_n|发散，则称\\sum_{n=1}^{\\infty}u_n条件收敛.\\hspace{100cm}\r
  $$\r
\r
2. 绝对收敛和条件收敛的关系\r
\r
- $$\r
  定理\\ 若级数\\sum_{n=1}^{\\infty}u_n绝对收敛，则\\sum_{n=1}^{\\infty}u_n收敛，反之不对.\\hspace{100cm}\r
  $$\r
\r
## 幂级数\r
\r
1. 函数项级数\r
\r
- $$\r
  \\sum_{n=1}^{\\infty}u_n(x)=u_1(x)+u_2(x)+u_3(x)+\\cdots+u_n(x)+\\cdots称为函数项级数.\\hspace{100cm}\r
  $$\r
  确定$x$的值后，函数项级数变为常数项级数.\r
- $$\r
  \\sum_{n=1}^{\\infty}u_n(x_0)=u_1(x_0)+u_2(x_0)+u_3(x_0)+\\cdots+u_n(x_0)+\\cdots，若此级数收敛，\\hspace{100cm}\r
  $$\r
  $$\r
  则称x_0为级数\\sum_{n=1}^{\\infty}u_n(x)的收敛点.\\hspace{100cm}\r
  $$\r
- $$\r
  所有收敛点组成的集合称为\\sum_{n=1}^{\\infty}u_n(x)的收敛域.\\hspace{100cm}\r
  $$\r
- $$\r
  S(x)=u_1(x)+u_2(x)+u_3(x)+\\cdots+u_n(x)，若S(x)=\\lim_{n \\to \\infty}S_n(x)存在，则称\\hspace{100cm}\r
  $$\r
  $$\r
  S(x)为函数项级数的和函数.\\hspace{100cm}\r
  $$\r
\r
2. 幂级数及其收敛性\r
\r
- $$\r
  形如\\sum_{n=0}^{\\infty}a_n(x-x_0)^n称为幂级数，特别地，当x_0=0，幂级数变为\\hspace{100cm}\r
  $$\r
  $$\r
  \\sum_{n=0}^{\\infty}a_nx^n=a_0+a_1x+a_2x^2+\\cdots+a_nx^n+\\cdots，其中\\hspace{100cm}\r
  $$\r
  $$\r
  a_0,a_1,a_2,\\cdots,a_n,\\cdots为幂级数的系数.\\hspace{100cm}\r
  $$\r
\r
**定理一 (阿贝尔定理)**\r
\r
$$\r
对幂级数\\sum_{n=0}^{\\infty}a_nx^n，当x=x_0\\ (x_0 ≠0)时收敛，那么适合不等式|x|<|x_0|的所有x使幂级数绝对收敛；\\hspace{100cm}\r
$$\r
\r
$$\r
反之，\\sum_{n=0}^{\\infty}a_nx^n，当x=x_0\\ (x_0 ≠0)时发散，那么适合不等式|x|>|x_0|的所有x使幂级数发散.\\hspace{100cm}\r
$$\r
\r
> [推论]\r
>\r
> 除过在一点收敛或在整个数轴收敛的情况，幂级数一定存在**收敛半径**R，\r
>\r
> 当$|x|<R$ 时，**幂级数绝对收敛**；\r
>\r
> 当$|x|>R$ 时，**幂级数发散**；\r
>\r
> 当$|x|=R$ 时，**幂级数可能收敛，可能发散**.\r
\r
**定理二 (收敛半径的求法)**\r
\r
$$\r
若\\lim_{n \\to \\infty}|\\frac{a_{n+1}}{a_n}|=\\rho，则收敛半径为：\\hspace{100cm}\r
$$\r
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
> 根值法也可以求其收敛半径\r
\r
### 幂级数的性质\r
\r
$$\r
设幂级数\\sum_{n=0}^{\\infty}a_nx^n的收敛半径为R，其和函数为S(x)，则：\\hspace{100cm}\r
$$\r
\r
$$\r
性质一\\ 幂级数\\sum_{n=0}^{\\infty}a_nx^n的和函数S(x)在其收敛域I上连续.\\hspace{100cm}\r
$$\r
\r
$$\r
性质二\\ 幂级数\\sum_{n=0}^{\\infty}a_nx^n的和函数S(x)在其收敛域I上可积，并有逐项积分公式\\hspace{100cm}\r
$$\r
\r
$$\r
\\int_0^x S(t)dt=\\int_0^x \\left\\[\\sum_{n=0}^{\\infty}a_nt^n\\right\\]dt=\\sum_{n=0}^{\\infty}\\int_0^x a_nt^ndt=\\sum_{n=0}^{\\infty}\\frac{a_n}{n+1}x^{n+1}\\ (x \\in I).\r
$$\r
\r
积分后得到的幂级数收敛半径不变.\r
\r
$$\r
性质三\\ 幂级数\\sum_{n=0}^{\\infty}a_nx^n的和函数S(x)在其收敛区间上可导，并有逐项求导公式\\hspace{100cm}\r
$$\r
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
$arctanx可由\\frac{1}{1+x^2}$逐项积分得出，收敛域为$[-1,1]$\r
\r
$$\r
[例]设\\sum_{n=1}^{\\infty}a_n(x-3)^n 在x=- 6 处收敛，在x=12 处发散，则级数\\sum_{n=1}^{\\infty}a_nx^{2n-1}的收敛半径为\\underline{~}\\underline{~}\\underline{~}.\\hspace{100cm}\r
$$\r
`;export{n as default};
