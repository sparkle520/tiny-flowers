import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', {
    state: () => ({
        classification: ['学习笔记', '技术分享', '生活随想'],
        data: [
            {
                id: 4,
                name: 'MySQL高级篇',
                link: '/note/noteInfo/4',
                create_date: '2024?03?017?11:16',
                img: 'https://pic.imgdb.cn/item/65f5d5bf9f345e8d03e639bd.png',
                author: '',
                tags: 'mysql',
                classification: '计算机',
                short_message: 'mysql高级教程,面向更高级的mysql.',
                update_date: '2024?03?17?11:01',
                is_visible: true,
                is_finished: false,
                directory_list: [
                   
                ]
            },
            {
                id: 3,
                name: '线性代数',
                link: '/note/noteInfo/3',
                create_date: '2024?02?02?11:06',
                img: 'https://pic.imgdb.cn/item/65e2eb629f345e8d031af15c.png',
                author: '',
                tags: '线性代数',
                classification: '数学',
                short_message: '线性代数是数学重要分支，在各学科中应用广泛.',
                update_date: '2024?02?02?11:06',
                is_visible: true,
                is_finished: false,
                directory_list: [
                    { name: "第一章 行列式" },
                    { name: "第二章 矩阵及其计算" },
                    { name: "第三章 向量组" },
                    { name: "第四章 线性方程组" },
                    { name: "第五章 特征值与特征向量" },
                    { name: "第六章 二次型" },
                ]
            },
            {
                id: 2,
                name: '高等数学',
                link: '/note/noteInfo/2',
                create_date: '2024?01?14?11:06',
                img: 'https://pic.imgdb.cn/item/65e2edd59f345e8d0321db0d.png',
                author: '',
                tags: '高等数学?微积分',
                classification: '数学',
                short_message: '高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科.',
                update_date: '2024?01?14?11:06',
                is_visible: true,
                is_finished: false,
                directory_list: [
                    {
                        name: '第一章 函数与极限',
                    },
                    {
                        name: '第二章 导数与微分',
                    },
                    {
                        name: '第三章 微分中值定理与导数的应用',
                    },
                    {
                        name: '第四章 不定积分',
                    },
                    {
                        name: '第五章 定积分',
                    },
                    {
                        name: '第六章 定积分的应用',
                    },
                    {
                        name: '第七章 微分方程',
                    },
                    {
                        name: '第八章 向量代数与空间解析几何',
                    },
                    {
                        name: '第九章 多元函数微分法及其应用',
                    },
                    {
                        name: '第十章 重积分',
                    },
                    {
                        name: '第十一章 曲线积分与曲面积分',
                    },
                    {
                        name: '第十二章节 无穷级数',
                    },





                ]
            },


            {
                id: 1,
                name: '概率论与数理统计',
                link: '/note/noteInfo/1',
                create_date: '2024?01?14?11:06',
                img: 'https://pic.imgdb.cn/item/65e2f0b89f345e8d0329f381.png',
                author: '',
                tags: '概率论?数理统计',
                classification: '数学',
                short_message: '概率论与数理统计是研究随机现象客观规律的数学学科.',
                update_date: '2024?05?17?11:04',
                is_visible: true,
                is_finished: false,
                directory_list: [
                    { name: "第一章 随机事件与概率" },
                    { name: "第二章 随机变量及其分布" },
                    { name: "第三章 多维随机变量及其分布" },
                    { name: "第四章 随机变量的数字特征" },
                    { name: "第五章 大数定律及中心极限定理" },
                    { name: "第六章 数理统计的基本概念" },
                    { name: "第七章 参数估计与假设检验" },
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
