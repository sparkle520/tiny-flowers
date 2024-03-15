import { defineStore } from 'pinia'

export const useMathDirectoryStore = defineStore('MathDirectory', {
    state: () => ({
        data:[
            {
                id:1,
                name: "高等数学",
                children: [
                  { name: "函数与极限" },
                  { name: "导数与微分" },
                  { name: "微分中值定理与导数的应用" },
                  { name: "不定积分" },
                  { name: "定积分" },
                  { name: "定积分的应用" },
                  { name: "微分方程" },
                  { name: "向量代数与空间解析几何" },
                  { name: "多元函数微分法及其应用" },
                  { name: "重积分" },
                  { name: "曲线积分与曲面积分" },
                  { name: "无穷级数" },
                ],
              },
              {
                id:2,
                name: "线性代数",
                children: [
                  { name: "行列式" },
                  { name: "矩阵及其计算" },
                  { name: "矩阵的初等变换与线性方程组" },
                  { name: "向量组的线性相关性" },
                  { name: "相似矩阵及二次型" },
                  { name: "线性空间与线性变换" },
                ],
              },
              {
                id:3,
                name: "概率论与数理统计",
                children: [
                  { name: "随机事件与概率" },
                  { name: "随机变量及其分布" },
                  { name: "多维随机变量及其分布" },
                  { name: "随机变量的数字特征" },
                  { name: "大数定律及中心极限定理" },
                  { name: "样本及抽样分布" },
                  { name: "参数估计" },
                  { name: "假设检验" },
                  { name: "方差分析及回归分析" },
                ],
              },
        ]

    }),
    actions: {

    }
})