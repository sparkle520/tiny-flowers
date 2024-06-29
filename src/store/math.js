import { defineStore } from 'pinia'
import { useRoute } from "vue-router";

export const useMathStore = defineStore('math', {
    state: () => ({
        data: [
            {
                id: 11,
                tags: '曲线积分',
                sort: '概率论与数理统计',
                link: '/math/details/11',
                from:''
            },
            {
                id: 10,
                tags: '几何概型',
                sort: '3?1',
                link: '/math/details/10',
                from:''
            },
            {
                id: 9,
                tags: '无穷级数?幂级数',
                sort: '高等数学',
                link: '/math/details/9',
                from:''
            },
            {
                id: 8,
                tags: '二次型',
                sort: '概率论与数理统计',
                link: '/math/details/7',
                from:''
            },
            {
                id: 7,
                tags: '随机变量与分布',
                sort: '概率论与数理统计',
                link: '/math/details/7',
                from:''
            },
            {
                id: 6,
                tags: '期望?方差?随机变量与分布',
                sort: '概率论与数理统计',
                link: '/math/details/6',
                from:''
            },
            {
                id: 5,
                tags: '条件概率',
                sort: '概率论与数理统计',
                link: '/math/details/5',
                from:''

            },
            {
                id: 4,
                tags: '条件概率?全概率公式',
                sort: '概率论与数理统计',
                link: '/math/details/4',
                from:''
            },
            {
                id: 3,
                tags: '偏导数',
                sort: '高等数学',
                link: '/math/details/3',
                from:''
            },
            {
                id: 2,
                tags: '无穷级数?幂级数',
                sort: '高等数学',
                link: '/math/details/2',
                from:''
            },
            {
                id: 1,
                tags: '导数?泰勒公式',
                sort: '[]',
                link: '/math/details/1',
                from:''
            },


        ],
        current_data: {
            tag:'',
            search:'',
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
        select_all(tag,search,page) {
            this.current_data = []
            if(this.current_data.tag!=tag || this.current_data.search!=search){
                if(tag == 'all'){
                    if(search == null || search == ''){
                    this.current_data.data = this.data
                    }else{
                        this.current_data.data = this.data.filter((el) => {
                                if(!el.tags.includes(tag)){
                                    return false
                                }else{
                                    if(el.id == search || el.from.includes(search)){
                                        return true
                                    }else{
    
                                        return false
                                    }
                                }
                          })
                    }
                }else{
                    this.current_data.data = this.data.filter((el) => {
                        if(search == null || search == ''){
                            return el.tags.includes(tag)
                        }else{
                            if(!el.tags.includes(tag)){
                                return false
                            }else{
                                if(el.id == search || el.from.includes(search)){
                                    return true
                                }else{

                                    return false
                                }
                            }
                            
                        }
                      })
                }
              
                this.current_data.tag = tag
                this.current_data.search = search
            }
            return this.current_data.data.slice((page - 1) * 10, page * 10)
        }

    }
})