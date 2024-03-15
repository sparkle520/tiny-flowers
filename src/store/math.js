import { defineStore } from 'pinia'
import { useRoute } from "vue-router";

export const useMathStore = defineStore('math', {
    state: () => ({
        data: [
            {
                id: 11,
                tags: '曲线积分',
                classification: '概率论与数理统计',
                link: '/math/details/11'
            },
            {
                id: 10,
                tags: '几何概型',
                classification: '3?1',
                link: '/math/details/10'
            },
            {
                id: 9,
                tags: '无穷级数?幂级数',
                classification: '高等数学',
                link: '/math/details/9'
            },
            {
                id: 8,
                tags: '二次型',
                classification: '概率论与数理统计',
                link: '/math/details/7'
            },
            {
                id: 7,
                tags: '随机变量与分布',
                classification: '概率论与数理统计',
                link: '/math/details/7'
            },
            {
                id: 6,
                tags: '期望?方差?随机变量与分布',
                classification: '概率论与数理统计',
                link: '/math/details/6'
            },
            {
                id: 5,
                tags: '条件概率',
                classification: '概率论与数理统计',
                link: '/math/details/5'
            },
            {
                id: 4,
                tags: '条件概率?全概率公式',
                classification: '概率论与数理统计',
                link: '/math/details/4'
            },
            {
                id: 3,
                tags: '偏导数',
                classification: '高等数学',
                link: '/math/details/3'
            },
            {
                id: 2,
                tags: '无穷级数?幂级数',
                classification: '高等数学',
                link: '/math/details/2'
            },
            {
                id: 1,
                tags: '导数?泰勒公式',
                classification: '[]',
                link: '/math/details/1'
            },


        ],
        current_data: {
            tag:'',
            data:[]
        }
    }),
    actions: {
        get_tags() {
            let tags_map = new Map();
            for (let index = 0; index < this.data.length; index++) {
                const element = this.data[index];
                element.tags.split('?').forEach((el) => {
                    if (tags_map.has(el)) {
                        tags_map.set(el, tags_map.get(el) + 1)
                    } else {
                        tags_map.set(el, 1)
                    }
                })
            }
            return [...tags_map].map((el) => el)
        },
        get_data(route) {
            const tag = route.query.tag;
            const page = route.params.page;
            if(this.current_data.tag!=tag){
                this.current_data.data = this.data.filter((el) => {
                    if(tag!= null && tag!=''&&tag!='undefined'){
                        return el.tags.split('?').includes(tag)
                    }else{
                        return true
                    }
                })
                this.current_data.tag = tag
            }
            return this.current_data.data.slice((page - 1) * 10, page * 10)
        }

    }
})