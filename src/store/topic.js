import { defineStore } from 'pinia'

export const useTopicStore = defineStore('topic', {
    state: () => ({
        classification:['学习笔记','技术分享','生活随想'],
        data: [

           

            {
                id: 10,
                title: 'node 包管理工具 nvm',
                link: '/article/topic/10',
                create_date: '2024?07?07?20:14',
                img: 'https://pic.imgdb.cn/item/668a9d17d9c307b7e96a608d.png',
                author: '',
                tags: 'node?包管理?nvm',
                classification: '学习笔记',
                short_message: 'node 版本切换简洁的方式 nvm (Node Version Manager).',
                update_date: '',
                is_visible: true
            },
            {
                id: 9,
                title: 'spring 事务',
                link: '/article/topic/9',
                create_date: '2024?07?06?21:23',
                img: 'https://pic.imgdb.cn/item/66890d67d9c307b7e902003a.png',
                author: '',
                tags: '事务?java',
                classification: '学习笔记',
                short_message: '事务是指是程序中一系列严密的逻辑操作，而且所有操作必须全部成功完成，否则在每个操作中所作的所有更改都会被撤消.即要么都完成，要么都失败.',
                update_date: '',
                is_visible: true
            },
            {
                id: 8,
                title: 'IOC (Inversion of Control)',
                link: '/article/topic/8',
                create_date: '2024?07?05?17:23',
                img: 'https://pic.imgdb.cn/item/6687064ad9c307b7e9c83a34.png',
                author: '',
                tags: 'IOC?java',
                classification: '学习笔记',
                short_message: 'IOC (控制反转) 是一种设计模式，通过将控制权交给第三方来达到解耦.',
                update_date: '',
                is_visible: true
            },
            {
                id: 7,
                title: 'AOP (Aspect Orient Programming)',
                link: '/article/topic/7',
                create_date: '2024?07?04?18:20',
                img: 'https://pic.imgdb.cn/item/6686bc04d9c307b7e9594ac0.png',
                author: '',
                tags: 'AOP?java',
                classification: '学习笔记',
                short_message: 'Aspect Oriented Programming（面向切面编程），OOP是面向对象编程，AOP是在OOP基础之上的一种更高级的设计思想.',
                update_date: '',
                is_visible: true
            },
            {
                id: 6,
                title: '数据校验JSR303',
                link: '/article/topic/6',
                create_date: '2024?07?04?18:20',
                img: 'https://pic.imgdb.cn/item/6686eb30d9c307b7e9aceded.png',
                author: '',
                tags: '数据校验?JSR303?java',
                classification: '学习笔记',
                short_message: 'JSR是Java Specification Requests的缩写，意思是Java规范提案.是指向JCP(Java Community Process)提出新增一个标准化技术规范的正式请求.',
                update_date: '',
                is_visible: true
            },
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
