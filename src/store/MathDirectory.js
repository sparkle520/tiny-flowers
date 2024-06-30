import { defineStore } from 'pinia'

export const useMathDirectoryStore = defineStore('MathDirectory', {
    state: () => ({
        data:[
            {
                id:1,
                name: "高等数学",
                children: [
                  { name: "函数与极限" },
                  { name: "一元函数微分学" },
                  { name: "一元函数积分学" },
                  { name: "向量代数与空间解析几何" },
                  { name: "多元函数微分学" },
                  { name: "多元函数积分学" },
                  { name: "无穷级数" },
                  { name: "常微分方程" },
                ],
              },
              {
                id:2,
                name: "线性代数",
                children: [
                  { name: "行列式" },
                  { name: "矩阵" },
                  { name: "向量" },
                  { name: "线性方程组" },
                  { name: "特征值、特征向量、相似矩阵" },
                  { name: "二次型" },
                ],
              },
              {
                id:3,
                name: "概率论与数理统计",
                children: [
                  { name: "随机事件与概率" },
                  { name: "随机变量及其概率分布" },
                  { name: "多维随机变量及其分布" },
                  { name: "随机变量的数字特征" },
                  { name: "大数定律及中心极限定理" },
                  { name: "参数估计" },
                  { name: "假设检验" },
                ],
              },
        ]

    }),
    actions: {

    }
})