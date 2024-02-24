import { defineStore } from 'pinia'

export const useTopicStore = defineStore('topic', {
    state: () => ({
        classification:['学习笔记','技术分享','生活随想'],
        data: [


           
            {
                id: 2,
                title: '最长回文子序列',
                link: '/article/topic/2',
                create_date: '2024?01?14?11:06',
                img: '',
                author: '',
                tags: 'c++?algorithm',
                classification: '学习笔记',
                short_message: '给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。',
                update_date: '',
                is_visible: true
            },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/article/topic/1', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '', is_visible: true },



        ],




        current_data: [],
        mems: new Set(),
    }),
    actions: {
        length() {
            return this.data.length
        },
        init() {
            if (this.current_data.length === 0) {
                this.current_data.push(...this.data)
            }
        },
        get_all() {
            return this.data
        },
        select_all_from_classification(classification) {
            if (classification === 'all') {
                this.current_data = this.data
            } else {
                this.current_data = []
               for (let index = 0; index < this.data.length; index++) {
                const element = this.data[index];
                if(element.classification === classification){
                    this.current_data.push(element)
                }
                
               }
            }

        },
        // ...
    }
})
