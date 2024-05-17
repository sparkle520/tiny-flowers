const t=`# 第七章 参数估计与假设检验  \r
\r
## 参数估计  \r
\r
### 参数的点估计  \r
\r
#### 估计量、估计值与点估计  \r
\r
设总体$X$的分布形式已知,但含有**未知参数$\\theta$**;或者总体的某数字特征(例如数学期望或方差)存在但**未知**，从总体$X$中抽取样本$X_1,X_2,,\\cdots,X_n$，相应的样本值为$x_1,x_2,\\cdots,x_n$.借助于样本给出未知参数一个**具体数值**的参数估计问题就是点估计问题.要解决点估计问题，就是要构造一个适当的统计量(不含任何未知参数的样本函数称为统计量)$\\hat{\\theta}(X_1,X_2,\\cdots,X_n)$，用它来估计未知参数$\\theta$，用它的观测值$\\hat{\\theta}(x_1,x_2,\\cdots,x_n)$作为未知参数$\\theta$的近似值.我们称$\\hat{\\theta}(X_1,X_2,\\cdots,X_n)$为$\\theta$的**估计量**，$\\hat{\\theta}(x_1,x_2,\\cdots,x_n)$为$\\theta$的**估计值**.  \r
\r
> [注] 估计量实际上是个随机变量，而对于不同的样本观测值，$\\theta$的估计值往往是不同的.\r
\r
##### 求点估计的两种常用方法  \r
\r
###### 矩估计法  \r
\r
设总体$X$为连续型随机变量，其概率密度为$f(x;\\theta_1,\\theta_2,\\cdots,\\theta_k)$，或总体$X$为离散型随机变量，其概率分布为$P\\left\\\\{X=x_i\\right\\\\}=p(x_i;\\theta_1,\\theta_2,\\cdots,\\theta_k),i=1,2,\\cdots,$其中$\\theta_1,\\theta_2,\\cdots,\\theta_k$为**待估参数**.设$X_1,X_2,\\cdots,X_n$是来自总体$X$的简单随机样本.矩估计法一般按以下步骤进行:  \r
\r
**第一步**，计算总体$X$的前$k$阶原点矩:  \r
\r
$$\r
\\begin{equation*}\r
  \\begin{aligned}\r
  \\mu_l&=E(X^l)=\\int_{-\\infty}^{+\\infty}x^lf(x;\\theta_1,\\theta_2,\\cdots,\\theta_k)dx\\quad&(X为连续性).\r
. \\\\\\\\\\\\\r
  \\\\\\\\\\\\\r
  \\mu_l&=E(X^l)=\\sum_{i=1}^{\\infty}x_i^lp(x_i;\\theta_1,\\theta_2,\\cdots,\\theta_k)\\quad&(X为离散型).\r
 \\\\\\\\\\\\\r
  \\end{aligned}\r
\\end{equation*}\r
$$  \r
\r
其中$l=1,2,\\cdots,k$，一般来说，$\\mu_l$是$\\theta_1,\\theta_2,\\cdots,\\theta_k$的函数，记作$\\mu_l=\\mu_l(\\theta_1,\\theta_2,\\cdots,\\theta_k)$.  \r
\r
**第二步**，令样本矩$=$总体矩，即  \r
\r
$$\r
\\frac{1}{n}\\sum_{i=1}^nX_i^l=E(X^l)\\quad(l=1,2,\\cdots,k).\r
$$\r
\r
这是一个包含$k$个未知参数$\\theta_1,\\cdots,\\theta_k$的$k$个联立方程组(称为矩法方程).\r
\r
**第三步**，解方程组，得到$\\theta_l$的矩估计为\r
$$\r
\\hat{\\theta_l}=\\hat{\\theta_l}(X_1,X_2,\\cdots,X_n)\\quad(l=1,2,\\cdots,k).\r
$$\r
\r
其中$\\hat{\\theta_l}(X_1,X_2,\\cdots,X_n)$称为$\\theta_l$的**矩估计量**，$\\hat{\\theta_l}(x_1,x_2,\\cdots,x_n)$称为$\\theta_l$的**矩估计值**.\r
\r
> [注]  \r
> \r
> 求未知参数$\\theta$的矩估计量，必须要求总体矩存在，并且还必须能计算出来(此时问题归结为级数求和(对离散型)或计算定积分(对连续型))，并通过解矩法方程求得$\\theta$的矩估计量，因此求矩估计量的关键是，写出矩法方程并求解.   \r
\r
###### 最大似然估计法  \r
\r
设总体$X$是连续型随机变量，其概率密度$f(x;\\theta),\\theta\\in\\Theta$的形式已知，0为待估参数，$\\Theta$为$\\theta$可能取值的范围，设$X_1,X_2,\\cdots,X_n$是来自总体$X$的样本，则$X_1,X_2,\\cdots,X_n$的联合概率密度为$\\prod_{i=1}^nf(x_i;\\theta)$.设$x_1,x_2,\\cdots,x_n$是相应于样本$X_1,X_2,\\cdots,X_n$的样本值，则$\\theta$的函数\r
\r
$$\r
L(\\theta)=L(x_1,x_2,\\cdots,x_n;\\theta)=\\prod_{i=1}^nf(x_i;\\theta)\\quad\\theta\\in\\Theta.\r
$$\r
\r
称为样本的**似然函数**.  \r
\r
> [注] 这里$x_1,x_2,\\cdots,x_n$是已知的样本值，它们都是常数.  \r
\r
若有  \r
\r
$$\r
L(x_1,x_2,\\cdots,x_n;\\hat{\\theta})=\\max_{\\theta\\in\\Theta}L(x_1,x_2,\\cdots,x_n;\\theta).  \r
$$\r
\r
则称$\\hat{\\theta}(x_1,x_2,\\cdots,x_n)$为$\\theta$的**最大似然估计值**，称$\\hat{\\theta}(X_1,X_2,\\cdots,X_n)$\r
为$\\theta$的**最大似然估计量**.  \r
\r
当总体$X$是离散型时，用分布律$P\\left\\\\{X=x_i\\right\\\\}=p(x_i;\\theta),\\theta\\in\\Theta$代替上面的概率密度$f(x;\\theta)$即可.  \r
\r
求最大似然估计量的一般步骤:  \r
\r
**第一步**，写出样本的似然函数  \r
\r
$$\r
L(\\theta)=L(x_1,x_2,\\cdots,x_n;\\theta_1,\\cdots,\\theta_k)=\\prod_{i=1}^np(x_i;\\theta_1,\\cdots,\\theta_k)或\\prod_{i=1}^nf(x_i;\\theta_1,\\cdots,\\theta_k).\r
$$\r
\r
**第二步**，求出使$L(\\theta)$达到最大值的$\\hat{\\theta_1},\\cdots,\\hat{\\theta_k}$\r
\r
1. 如果$L(\\theta)$或$lnL(\\theta)$关于$\\theta$可微，则$\\theta$可以从方程$\\displaystyle\\frac{dL(\\theta)}{d\\theta}=0$或$\\displaystyle\\frac{d lnL(\\theta)}{d\\theta}=0$中解得.如果总体$X$的分布含有$k$个未知参数$\\theta_1,\\theta_2,\\cdots,\\theta^k$关于$\\theta_i(i=1,2,\\cdots,k)$可以由似然方程组$\\displaystyle\\frac{\\partial L}{\\partial\\theta_i}=0$或$\\displaystyle\\frac{\\partial lnL}{\\partial\\theta_i}=0(i=,1,2,\\cdots,k)$解得，从而得到$\\theta_i$的最大似然估计量$\\hat{\\theta_i}=\\hat{\\theta_i}(X_i,\\cdots,X_n)(i=1,2,\\cdots,k)$.  \r
\r
2. 如果$p(x_i;\\theta_1,\\cdots,\\theta_k)$或$f(x_i;\\theta_1,\\cdots,\\theta_k)$关于$\\theta_i$不可微，或似然方程无解,则应利用似然函数的单调性找到极值点.  \r
\r
> [注]  \r
>  \r
> 1. 求总体分布中未知参数$\\theta$的最大似然估计量必须知道总体的概率分布或密度.写出样本的似然函数(或对数似然函数)，并求其最大值点是解题的关键. \r
> 2. 从似然方程解出来的极值可疑点(可能取到极值的点)，虽然一般是极值点，但是还应该由解的实际意义决定取舍.例如解出正负两个极值点，有时因为此参数只能是正数等原因(像方差、均方差及泊松分布的参数$\\lambda$等)，就必须舍去负的.  \r
  \r
###### 最大似然估计的性质  \r
\r
### 参数的区间估计  \r
`;export{t as default};
