import { defineStore } from 'pinia'

export const useTopicStore = defineStore('topic', {
    state: () => ({
        classification:['学习笔记','技术分享','生活随想'],
        data: [

           

            {
                id: 5,
                title: '从n维向量空间到线性无关和线性相关',
                link: '/article/topic/5',
                create_date: '2024?06?23?15:20',
                img: 'https://pic.imgdb.cn/item/6677ef4ad9c307b7e9c1e371.png',
                author: '',
                tags: 'math?向量空间?线性无关?线性相关',
                classification: '学习笔记',
                short_message: '本章节先研究数域K上n维向量及其子空间的结构和性质，再研究线性相关与线性无关的向量组.',
                update_date: '',
                is_visible: true
            },
            {
                id: 4,
                title: '绝对值不等式',
                link: '/article/topic/4',
                create_date: '2024?06?19?20:00',
                img: 'https://pic.imgdb.cn/item/66746ba6d9c307b7e9af3651.png',
                author: '',
                tags: 'math?绝对值不等式',
                classification: '学习笔记',
                short_message: '本章节介绍一下绝对值不等式及其证明.',
                update_date: '',
                is_visible: true
            },
            {
                id: 3,
                title: '卷积公式',
                link: '/article/topic/3',
                create_date: '2024?03?31?12:06',
                img: 'https://pic.imgdb.cn/item/6608c4649f345e8d0324925c.jpg',
                author: '',
                tags: 'math?卷积',
                classification: '学习笔记',
                short_message: '在多维随机变量变量当中，大家都会需要用到二重积分或者卷积的公式，今天我们就来学习一下卷积的公式。',
                update_date: '',
                is_visible: true
            },
            {
                id: 2,
                title: '最长回文子序列',
                link: '/article/topic/2',
                create_date: '2024?01?14?11:06',
                img: 'https://pic.imgdb.cn/item/65dde3fe9f345e8d03c4a596.jpg',
                author: '',
                tags: 'c++?algorithm',
                classification: '学习笔记',
                short_message: '给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度.子序列定义为：不改变剩余字符顺序的情况下删除某些字符或者不删除任何字符形成的一个序列。',
                update_date: '',
                is_visible: true
            },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/article/topic/1', author: '', create_date: '2024?01?19?21:00', img: 'https://pic.imgdb.cn/item/65dddcc99f345e8d03a86db7.jpg', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '', is_visible: true },



        ],




        current_data: [],
        mems: new Set(),
        current_topic_index:-1,
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
        select_all(classification,search) {
            this.current_data = []
            if (classification === 'all') {
                for (let index = 0; index < this.data.length; index++) {
                    const element = this.data[index];
                if(search == null || search == ''){
                    this.current_data.push(element)
                }else{
                    if(element.tags.includes(search)){
                        this.current_data.push(element)
                    }else if(element.title.includes(search)){
                        this.current_data.push(element)
                    }else if(element.short_message.includes(search)){
                        this.current_data.push(element)
                    }
                }        
            }
             } else {
                this.current_data = []
               for (let index = 0; index < this.data.length; index++) {
                const element = this.data[index];
                if(element.classification === classification){
                    if(search == null || search == ''){
                        this.current_data.push(element)
                    }else{
                        if(element.tags.includes(search)){
                            this.current_data.push(element)
                        }else if(element.title.includes(search)){
                            this.current_data.push(element)
                        }else if(element.short_message.includes(search)){
                            this.current_data.push(element)
                        }
                    }        
                }
                
               }
            }

        },
        // ...
    }
})
