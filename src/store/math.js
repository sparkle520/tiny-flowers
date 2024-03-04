import { defineStore } from 'pinia'

export const useMathStore = defineStore('math', {
    state: () => ({
        data: [
            {
                id: 3,
                question: "求幂级数\\sum_{n=1}^{\\infty}\\frac{(-1)^{n-1}x^{2n}}{n(2n-1)}的收敛域及其和函数.",
                tags:'无穷级数?幂级数',
                difficulty: '简单',
                link: '/math/details/3'
            },
            {
                id: 2,
                question: "求\\sum_{n=1}^{\\infty}\\frac{(-1)^n(n+1)}{(2n+1)!}x^{2n+1}的和函数.",
                tags:'无穷级数?幂级数',
                difficulty: '简单',
                link: '/math/details/2'
            },
            {
                id: 1,
                question: "设f(x)在[0,1]上有二阶导，|f(x)|≤a,|f^{''}(x)|≤b,其中ab是非负数 \\cdots",
                tags:'导数?泰勒公式',
                difficulty: '中等',
                link: '/math/details/1'
            },
            
       
        ]
    }),
    actions: {
        get_tags(){
            let tags_map = new Map();
            for (let index = 0; index < this.data.length; index++) {
                const element = this.data[index];
                element.tags.split('?').forEach((el)=>{
                    if(tags_map.has(el)){
                         tags_map.set(el,tags_map.get(el)+1)
                    }else{
                         tags_map.set(el,1)
                    }
                })
            }
            return [...tags_map].map((el)=>el)
        },
    }
})