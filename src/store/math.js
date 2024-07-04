import { defineStore } from 'pinia'
import { useRoute } from "vue-router";

export const useMathStore = defineStore('math', {
    state: () => ({
        data: [
            {
                id: 15 ,
                tags: '定积分',
                sort: '1?3',
                link: '/math/details/15',
                from:'330(数一)'
            },
            {
                id: 14 ,
                tags: '极限',
                sort: '1?1',
                link: '/math/details/14',
                from:''
            },
            {
                id: 13 ,
                tags: '定积分',
                sort: '1?3',
                link: '/math/details/13',
                from:'330(数一)'
            },
            {
                id: 12  ,
                tags: '极限',
                sort: '1?1',
                link: '/math/details/12',
                from:'330(数一)'
            },
            {
                id: 11,
                tags: '曲线积分',
                sort: '1?6',
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
                sort: '1?7',
                link: '/math/details/9',
                from:''
            },
            {
                id: 8,
                tags: '二次型',
                sort: '2?6',
                link: '/math/details/7',
                from:''
            },
            {
                id: 7,
                tags: '随机变量与分布',
                sort: '3?2',
                link: '/math/details/7',
                from:'数一真题'
            },
            {
                id: 6,
                tags: '数学期望?方差?随机变量与分布',
                sort: '3?4',
                link: '/math/details/6',
                from:''
            },
            {
                id: 5,
                tags: '条件概率',
                sort: '3?1',
                link: '/math/details/5',
                from:''

            },
            {
                id: 4,
                tags: '条件概率?全概率公式',
                sort: '3?1',
                link: '/math/details/4',
                from:''
            },
            {
                id: 3,
                tags: '偏导数',
                sort: '1?5',
                link: '/math/details/3',
                from:''
            },
            {
                id: 2,
                tags: '无穷级数?幂级数',
                sort: '1?7',
                link: '/math/details/2',
                from:''
            },
            {
                id: 1,
                tags: '导数?泰勒公式',
                sort: '1?2',
                link: '/math/details/1',
                from:''
            },


        ],
        current_data: {
            tag:'',
            search:'',
            sort:'',
            data:[]
        }
    }),
    actions: {
        get_tags() {
            let tags_map = new Map();
            for (let index = 0,len = this.data.length; index < len; index++) {
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
        select_all(tag,search,page,sort) {

            if(sort != null && sort != '' && sort != this.current_data.sort){
                this.current_data.data = []
                for (let index = 0,len = this.data.length; index < len; index++) {
                    const el = this.data[index];
                    if(el.sort == sort){
                        this.current_data.data.push(el)
                    }
                }
            }
            else if(this.current_data.tag !=tag || this.current_data.search !=search){
                this.current_data.data = []
                if(tag == 'all'){
                    if(search == null || search == ''){
                    this.current_data.data = this.data
                    }else{
                        for (let index = 0,len = this.data.length; index < len; index++) {
                            const el = this.data[index];
                            if(el.tags.includes(search) || el.id.toString() == search || el.from.includes(search)){
                                this.current_data.data.push(el)
                            }
                        }
                    }
                }else{
                    for (let index = 0,len = this.data.length; index < len; index++) {
                        const el = this.data[index];
                        if(el.tags.includes(tag)){
                            this.current_data.data.push(el)
                        }
                    }
                }
                this.current_data.tag = tag
                this.current_data.search = search
                this.current_data.sort = sort
            }
            return this.current_data.data.slice((page - 1) * 10, page * 10)
        }

    }
})