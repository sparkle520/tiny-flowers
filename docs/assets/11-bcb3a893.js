const t=`**解：**\r
\r
取圆的圆心角 $\\theta$ 作参数, 则曲线 $L: x^2+(y+1)^2=1$ 的参数方程为: $x=\\cos \\theta, y+1=\\sin \\theta(0 \\leq \\theta \\leq 2 \\pi)$. 因为 $\\mathrm{d} x=-\\sin \\theta \\mathrm{d} \\theta, \\mathrm{d} y=\\cos \\theta \\mathrm{d} \\theta$, 所以\r
$$\r
I=\\int_0^{2 \\pi} \\frac{1-\\sin \\theta}{|\\sin \\theta|}(-\\sin \\theta) \\mathrm{d} \\theta+\\int_0^{2 \\pi} f(\\cos \\theta) \\cos \\theta \\mathrm{d} \\theta .\r
$$\r
\r
其中第一项为\r
 \r
$$\r
I_1=\\int_0^{2 \\pi} \\frac{-(1-\\sin \\theta)}{|\\sin \\theta|} \\sin \\theta \\mathrm{d} \\theta=-\\int_0^\\pi(1-\\sin \\theta) \\mathrm{d} \\theta+\\int_\\pi^{2 \\pi}(1-\\sin \\theta) \\mathrm{d} \\theta=4,\r
$$\r
 \r
第二项为\r
$$\r
\\begin{aligned}\r
I_2 & =\\int_0^{2 \\pi} f(\\cos \\theta) \\cos \\theta \\mathrm{d} \\theta=\\int_0^\\pi f(\\cos \\theta) \\cos \\theta \\mathrm{d} \\theta+\\int_\\pi^{2 \\pi} f(\\cos \\theta) \\cos \\theta \\mathrm{d} \\theta \\\\\\\\\\\\\r
& =\\int_0^\\pi f(\\cos \\theta) \\cos \\theta \\mathrm{d} \\theta+\\int_0^\\pi f(\\cos (t+\\pi)) \\cos (t+\\pi) \\mathrm{d} t \\\\\\\\\\\\\r
& =\\int_0^\\pi f(\\cos \\theta) \\cos \\theta \\mathrm{d} \\theta-\\int_0^\\pi f(-\\cos t) \\cos t \\mathrm{~d} t=0,\r
\\end{aligned}\r
$$\r
\r
因此，原积分=4`;export{t as default};
