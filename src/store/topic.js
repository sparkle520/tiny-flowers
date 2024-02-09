import { defineStore } from 'pinia'

export const useTopicStore = defineStore('topic', {
    state: () => ({

        acg: [
            { id: 1, title: 'Weathering With you(经典语录)', link: '/unknownWorldMap/topic/1', author: '', create_date: '2024?01?06?7:06', img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg', tags: 'weathering with you?天气の子', classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了', update_date: '' },
        ],
        technique: [
            { id: 1, title: '用pinia实现全局换肤功能', link: '/unknownWorldMap/topic/3', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '' },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/unknownWorldMap/topic/3', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '' },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/unknownWorldMap/topic/3', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '' },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/unknownWorldMap/topic/3', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '' },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/unknownWorldMap/topic/3', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '' },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/unknownWorldMap/topic/3', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '' },
            { id: 1, title: '用pinia实现全局换肤功能', link: '/unknownWorldMap/topic/3', author: '', create_date: '2024?01?19?21:00', img: '', tags: 'pinia?vue3', classification: '技术分享', short_message: '简易实现一下全局换肤功能', update_date: '' },
            { id: 1, title: 'Weathering With you(经典语录)', link: '/unknownWorldMap/topic/1', author: '', create_date: '2024?01?06?7:06', img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg', tags: 'weathering with you?天气の子', classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了', update_date: '' },

        ],
        study: [
            
            {
                id: 1,
                title: 'Rust写的第一个算法',
                link: '/unknownWorldMap/topic/2',
                create_date: '2024?01?14?11:06',
                img: '',
                author: '',
                tags: 'rust?algorithm',
                classification: '学习笔记',
                short_message: 'Given n, take the sum of the digits of n. If that value has more than one digit...',
                update_date: ''
            },
        ], life: [
            { id: 1, title: '谈谈建站初衷', link: '/unknownWorldMap/topic/4',create_date: '2024?01?20?16:16', author: '', img: '', tags: '感想', classification: '生活随想', short_message: '随便谈谈', update_date: '' },
        ],
        all: [],
        current_data:[]
    }),
    actions: {
        length() {
            return this.life.length + this.acg.length + this.study.length + this.technique.length
        },
        get_all() {
            if (this.all.length == 0 || this.all == undefined || this.all == null) {
                this.all = this.acg.concat(this.life, this.study, this.technique)
            }
            return this.all
        }
        // ...
    }
})
