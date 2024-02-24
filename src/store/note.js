import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', {
    state: () => ({
        classification: ['学习笔记', '技术分享', '生活随想'],
        data: [

         
            
            {
                id: 1,
                name: '概率论与数理统计',
                link: '/note/noteInfo/1',
                create_date: '2024?01?14?11:06',
                img: '',
                author: '',
                tags: '概率论?数理统计',
                classification: '数学',
                short_message: '概率论与数理统计是研究随机现象客观规律的数学学科.',
                update_date: '2024?01?14?11:06',
                is_visible: true,
                is_finished: false,
                directory_list: [
                    {
                        name: '第一章节 事件的概率',
                        children: [
                            { name: '1.1 随机事件' },
                        ]
                    },
                    {
                        name: '第二章节 随机变量及概率分布',
                        children: [
                        ]
                    },
                   
                    
                   
                   
                ]
            },

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
                    if (element.classification === classification) {
                        this.current_data.push(element)
                    }

                }
            }

        },
        get_note_by_id(id) {
            if (this.data.length == 0) return -1;
            let l = 0;
            let r = this.data.length;
            while (l < r) {
                let mid = l + Math.floor((r - l) / 2);
                if (this.data[mid].id == id) return this.data[mid];
                else if (this.data[mid].id > id) l = mid + 1;
                else r = mid;
            }
            return -1;
        }
        // ...
    }
})
