const $=`# 第四章 随机变量的数字特征 \r
\r
## 随机变量的数学期望的概念与性质 \r
\r
### 数学期望的概念 \r
\r
#### 离散型随机变量的数学期望 \r
\r
设离散型随机变量$X$的分布律为$P\\left\\\\{X=x_i\\right\\\\}=p_i(i=1,2,\\cdots)$.若无穷级数$\\displaystyle\\sum_{i=1}^{\\infty}x_i p_i $绝对收敛，则称它的和为随机变量$X$的**数学期望**或**均值**，记为$EX$或$E(X)$，即\r
$$\r
EX=\\displaystyle\\sum_{i=1}^{\\infty} x_i p_i .\r
$$\r
\r
#### 连续型随机变量的数学期望 \r
\r
设连续型随机变量$X$的概率密度为$f(x)$，若反常积分$\\displaystyle\\int^{+\\infty}_{-\\infty}xf(x)dx$绝对收敛，则称此反常积分的值为随机变量$X$的**数学期望**或**均值**，记为$EX$或$E(X)$即\r
\r
$$\r
EX=\\displaystyle\\int^{+\\infty}_{-\\infty}xf(x)dx .\r
$$ \r
\r
> [注] \r
> \r
> 1. 随机变量$X$的数学期望$E(X)$是一个**实数**. \r
> 2. 数学期望$E(X)$完全由随机变量$X$的概率分布所确定.若$X$服从某一分布，也称$E(X)$是这一分布的数学期望. \r
> 3. 如果上述的无穷级数或反常积分不绝对收敛，则称随机变量的数学期望不存在. \r
\r
### 随机变量的数学期望的性质 \r
\r
1. $E(C)=C$，其中$C$为常数. \r
\r
2. $E(CX)=CE(X)$，其中$C$为常数，$X$为随机变量. \r
\r
3. $E(X+Y)=E(X)+E(Y)$，其中$X$和$Y$为任意两个随机变量. \r
\r
4. 若随机变量$X$和$Y$**相互独立**，则$E(XY)=E(X)E(Y)$. \r
\r
> [注] \r
>\r
> 性质4要求$X$与$Y$相互独立，该条件其实可以减弱为$X$与$Y$**不相关**.事实上，$E(XY)E(X)E(Y)$成立的充要条件是$X$与$Y$不相关. \r
\r
## 随机变量函数的数学期望 \r
\r
### 一个随机变量$X$的函数$Y=g(X)$的数学期望 \r
\r
1. 设$X$是离散型随机变量,其概率分布为$P\\left\\\\{X=x_i\\right\\\\}=p_i(i=1,2,\\cdots)$，如果无穷级数$\\displaystyle\\sum_{i=1}^{\\infty}g(x_i) p_i $绝对收敛，则随机变量$Y=g(X)$的**数学期望**为 \r
\r
$$\r
E(Y)=E[g(X)]=\\displaystyle\\sum_{i=1}^{\\infty}g(x_i) p_i .\r
$$ \r
\r
2. 设$X$是连续型随机变量，其概率密度为$f(x)$，如果反常积分$\\displaystyle\\int^{+\\infty}_{-\\infty}g(x)f(x)dx$绝对收敛，则随机变量$Y=g(X)$的**数学期望**为 \r
\r
$$\r
E(Y)=E[g(X)]=\\displaystyle\\int^{+\\infty}_{-\\infty}g(x)f(x)dx.\r
$$ \r
\r
### 二维随机变量$(X,Y)$的函数$Z=g(X,Y)$的数学期望 \r
\r
1. 设$(X,Y)$是离散型随机变量，其概率分布为$P\\left\\\\{X=x_i,Y=y_j\\right\\\\}=p_{ij}(i=1,2,\\cdots;j=1,2,\\cdots)$，如果无穷级数$\\displaystyle\\sum_{i=1}^{\\infty}\\sum_{j=1}^{\\infty}g(x_i,y_j) p_{ij}$绝对收敛，则随机变量$Z=g(X,Y)$的**数学期望**为 \r
\r
$$\r
E(Z)=E[g(X,Y)]=\\displaystyle\\sum_{i=1}^{\\infty}\\sum_{j=1}^{\\infty}g(x_i,y_j) p_{ij}.\r
$$ \r
\r
2. 设$(X,Y)$是连续型随机变量，其概率密度为$f(x,y)$，如果反常积分$\\displaystyle\\int_{-\\infty}^{+\\infty}\\int_{-\\infty}^{+\\infty}g(x,y)f(x,y)dxdy$绝对收敛，则随机变量$Z=g(X,Y)$的**数学期望**为 \r
\r
$$\r
E(Z)=E[g(X,Y)]=\\displaystyle\\int_{-\\infty}^{+\\infty}\\int_{-\\infty}^{+\\infty}g(x,y)f(x,y)dxdy.\r
$$ \r
\r
## 随机变量的方差的概念及性质 \r
\r
### 方差及标准差的概念 \r
\r
1. 设$X$是一个随机变量，若$E\\left\\[(X-EX)^2\\right\\]$存在，则称之为$X$的**方差**，记为$D(X)$，即\r
\r
$$\r
D(X)=E\\left\\[(X-EX)^2\\right\\].\r
$$ \r
\r
显然有，$D(X)\\geq 0$.\r
\r
且称$\\sqrt{D(X)}$为$X$的**标准差**或**均方差**，记为$\\sigma(X)$. \r
\r
称$X^*=\\frac{X-EX}{\\sqrt{DX}}$为$X$的**标准化随机变量**，此时$E(X^*)=0,D(X^*)=1$. \r
\r
### 方差的计算公式 \r
\r
$$\r
DX=E(X^2)-(EX)^2.\r
$$\r
\r
### 方差的重要性质 \r
\r
1. $D(C)=0$，其中$C$为常数. $DX$为$0$只能推出$X$几乎处处为某个常数而不能推出$X$为常数.\r
\r
2. $D(aX+b)=a^2DX$，其中$a,b$为常数，$X$为随机变量. \r
\r
3. $D(X\\pm Y)=DX+DY\\pm 2Cov(X,Y)$，其中$X,Y$为任意两个随机变量. \r
\r
$D\\left(\\displaystyle{\\sum_{i=1}^n}a_iX_i\\right)=\\displaystyle{\\sum_{i=1}^n}a_i^2DX_i+2{\\sum_{1\\leq i<j<\\leq n}}a_ia_jCov(X_i,X_j).$ \r
\r
当随机变量$X,Y$**相互独立**时 \r
\r
有$Cov(X,Y)=0$，此时有$D(X\\pm Y)=DX+DY$. \r
\r
\r
且有$D(XY)=DXDY+DX(EY)^2+DY(EX)^2\\geq DXDY.$ \r
\r
> [注]\r
> \r
> $DX=0$的充要条件是$X$以概率$1$取常数$C$，即$P\\left\\\\{X=C\\right\\\\}=1$，这里$C=EX.$ \r
> \r
> 对任意常数$c$，有$DX\\leq E[(X-c)^2]$.\r
\r
## 常见的随机变量的数学期望和方差 \r
\r
<table >\r
  <thead>\r
        <tr>\r
         <th>分布</th>\r
         <th>分布列或概率密度</th>\r
         <th>数学期望</th>\r
         <th>方差</th>\r
        </tr> \r
    </thead>\r
    <tr>\r
        <td>0-1分布</td>\r
        <td>$P\\left\\{X=k\\right\\}=p^k(1-p)^{1-k},k=0,1$</td>\r
        <td>$p$</td>\r
        <td>$p(1-p)$</td>\r
    </tr>\r
    <tr>\r
        <td>$B(n,p)$</td>\r
        <td>$P\\left\\{X=k\\right\\}=C_n^kp^k(1-p)^{n-k},k=0,1,\\cdots,n$</td>\r
        <td>$np$</td>\r
        <td>$np(1-p)$</td>\r
    </tr>\r
    <tr>\r
        <td>$P(\\lambda)$</td>\r
        <td>$P\\left\\{X=k\\right\\}=\\frac{\\lambda^k}{k!}e^{-\\lambda},k=0,1,\\cdots$</td>\r
        <td>$\\lambda$</td>\r
        <td>$\\lambda$</td>\r
    </tr>\r
    <tr>\r
        <td>$G(p)$</td>\r
        <td>$P\\left\\{X=k\\right\\}=(1-p)^{k-1}p,k=1,2,\\cdots$</td>\r
        <td>$\\frac{1}{p}$</td>\r
        <td>$\\frac{1-p}{p^2}$</td>\r
    </tr>\r
    <tr>\r
        <td>$N(\\mu,\\sigma^2)$</td>\r
        <td>$f(x)=\\frac{1}{\\sqrt{2\\pi}\\sigma}\\exp\\left\\{-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right\\},-\\infty&lt;x&lt;+\\infty$</td>\r
        <td>$\\mu$</td>\r
        <td>$\\sigma^2$</td>\r
    </tr>\r
    <tr>\r
        <td>$U(a,b)$</td>\r
        <td>$f(x)=\\frac{1}{b-a},a&lt;x&lt;b$</td>\r
        <td>$\\frac{a+b}{2}$</td>\r
        <td>$\\frac{(b-a)^2}{12}$</td>\r
    </tr>\r
    <tr>\r
        <td>$E(\\lambda)$</td>\r
        <td>$f(x)=\\lambda e^{-\\lambda x},x>0$</td>\r
        <td>$\\frac{1}{\\lambda}$</td>\r
        <td>$\\frac{1}{\\lambda^2}$</td>\r
    </tr>\r
</table>\r
\r
## 协方差与相关系数 \r
\r
### 协方差 \r
\r
#### 协方差的概念 \r
\r
设$(X,Y)$是二维随机变量，如果$E[(X-EX)(Y-EY)]$存在，则称它为随机变量$X$与$Y$的**协方差**，记作$Cov(X,Y)$，即\r
\r
$$\r
Cov(X,Y)=E[(X-EX)(Y-EY)]=E(XY)-EXEY.\r
$$ \r
\r
#### 协方差的性质 \r
\r
1. $Cov(X,Y)=Cov(Y,X).$\r
\r
2. $Cov(aX,BY)=abCov(X,Y)$，其中$a,b$为常数. \r
\r
3. $Cov(X_1+X_2,Y)=Cov(X_1,Y)+Cov(X_2,Y).$ \r
\r
### 相关系数 \r
\r
#### 相关系数的概念 \r
\r
如果$X,Y$的方差都存在且都不等于零，则称$\\frac{Cov(X,Y)}{\\sqrt{DX}\\sqrt{DY}}$为随机变量$X$与$Y$的**相关系数**，记作$\\rho_{XY}$，即\r
\r
$$\r
\\rho_{XY}=\\frac{Cov(X,Y)}{\\sqrt{DX}\\sqrt{DY}}.\r
$$ \r
\r
#### 相关系数的性质 \r
\r
1. $|\\rho_{XY}|\\leq 1$.\r
1. $|\\rho_{XY}|=1$的充要条件是，存在常数$a,b$，使得$P\\left\\\\{Y=aX+b\\right\\\\}=1$. \r
\r
#### 随机变量$X$与$Y$不相关 \r
\r
如果随机变量$X$与$Y$的相关系数$\\rho_{XY}=0$(即$Cov(X,Y)=0$)，则称$X$与$Y$**不相关**.关于随机变量$X$与$Y$的独立性与相关性,有如下结论:\r
\r
1. 若随机变量$X$与$Y$**独立**，则$X$与$Y$一定**不相关**;但是若$X$与$Y$**不相关**，则$X$与$Y$**不一定独立**.\r
\r
2. 若随机变量$X$与$Y$的联合分布是**二维正态分布**，则$X$与$Y$独立的充要条件是$X$与$Y$**不相关**. \r
\r
3. 若随机变量$X$与$Y$都服从**0-1分布**，则$X$与$Y$独立的充要条件是$X$与$Y$**不相关**. \r
\r
#### 对于随机变量$X$与$Y$，下面四个结论是等价的 \r
\r
$Cov(X,Y)=0 \\iff X$与$Y$不相关$\\iff EXY = EXEY \\iff D(X+Y)=DX+DY$ \r
\r
## 随机变量的矩 \r
\r
设$(X,Y)$是二维随机变量.如果$E(X^kY^l)$存在，则称$E(X^k)(k=1,2,\\cdots)$为$X$的$k$阶**原点矩**;\r
\r
称$E(X-EX)^k(k=2,3,\\cdots)$为$X$的$k$阶**中心矩**; \r
\r
称$E(x^kY^l)$为$X$与$Y$的$k+l$阶**混合原点矩**;\r
\r
称$E\\left\\[(X-EX)^k(Y-EY)^l\\right\\](k,l=1,2,\\cdots)$为$X$与$Y$的$k+l$阶**混合中心矩**. \r
\r
从上述定义看出:数学期望$EX$是$X$的一阶原点矩，方差$DX$是$X$的二阶中心矩，协方差$Cov(X,Y)$是$X$与$Y$二阶混合中心矩. `;export{$ as default};
