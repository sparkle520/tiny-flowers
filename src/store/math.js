import { defineStore } from 'pinia'

export const useMathStore = defineStore('math', {
    state: () => ({
        data: [
            {
                id: 1,
                question: "设f(x)在[0,1]上有二阶导，|f(x)|≤a,|f^{''}(x)|≤b,其中ab是非负数 \\cdots",
                tags:'text?s',
                difficulty: '简单',
                link: '/math/details/1'
            },
        ]
    }),
    actions: {

    }
})