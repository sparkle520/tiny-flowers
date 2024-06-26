import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        dark:[
            {
                theme_name:'槿紫',
                color_dict:new Map([
                    ['primary','#806d9e'],
                    ['fill_primary','#ffff'],
                    ['text','#fffefa'],
                    ['text_title','#beb3ce'],
                    ['text_subtitle','#9b93a8'],
                    ['text_secondary','#7a7384'],
                    ['text_placeholder','#5b5662'],
                    ['text_link','#b8a1cf'],
                    ['fill','#22202e'],
                    ['fill_body','#0f1423'],
                ])
            },
            {
                theme_name:'淡茜红',
                color_dict:new Map([
                    ['primary','#e77c8e'],
                    ['fill_primary','#ffff'],
                    ['text','#fffefa'],
                    ['text_title','#fbd4d8'],
                    ['text_subtitle','#ccadb0'],
                    ['text_secondary','#a0888a'],
                    ['text_placeholder','#756466'],
                    ['text_link','#a4ccdc'],
                    ['fill','#131824'],
                    ['fill_body','#0f1423'],
                ])
            },
        ],
        light:[
            {
                theme_name:'经典紫',
                color_dict:new Map([
                    ['primary','#9966ff'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#8076a3'],
                    ['text_subtitle','#958bb2'],
                    ['text_secondary','#a9a2c1'],
                    ['text_placeholder','#beb8d0'],
                    ['text_link','#a174f3'],
                    ['fill','#ffff'],
                    ['fill_body','#ffff'],
                ])
            },
            {
                theme_name:'霁青',
                color_dict:new Map([
                    ['primary','#63bbd0'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#7c9faa'],
                    ['text_subtitle','#92aeb8'],
                    ['text_secondary','#a7bec6'],
                    ['text_placeholder','#bdced4'],
                    ['text_link','#a4ccdc'],
                    ['fill','#ffff'],
                    ['fill_body','#fffef9'],
                ])
            },
            {
                theme_name:'淡菽红',
                color_dict:new Map([
                    ['primary','#ed4845'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#cc163a'],
                    ['text_subtitle','#db4e57'],
                    ['text_secondary','#e77576'],
                    ['text_placeholder','#f29896'],
                    ['text_link','#bf3553'],
                    ['fill','#ffff'],
                    ['fill_body','#f7f4ed'],
                ])
            },
            {
                theme_name:'金莲花橙',
                color_dict:new Map([
                    ['primary','#f86b1d'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#cb591c'],
                    ['text_subtitle','#d97542'],
                    ['text_secondary','#e69066'],
                    ['text_placeholder','#f0ac8b'],
                    ['text_link','#ed5126'],
                    ['fill','#ffff'],
                    ['fill_body','#f7f4ed'],
                ])
            },
            {
                theme_name:'蔻梢绿',
                color_dict:new Map([
                    ['primary','#5dbe8a'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#4e9c72'],
                    ['text_subtitle','#6dac88'],
                    ['text_secondary','#8bbd9f'],
                    ['text_placeholder','#a8cdb6'],
                    ['text_link','#16982b'],
                    ['fill','#ffff'],
                    ['fill_body','#fff'],
                ])
            },
            {
                theme_name:'淡绛红',
                color_dict:new Map([
                    ['primary','#ec7696'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#f6a5b8'],
                    ['text_subtitle','#f9b4c3'],
                    ['text_secondary','#fbc3cf'],
                    ['text_placeholder','#fdd2db'],
                    ['text_link','#e68ab8'],
                    ['fill','#ffff'],
                    ['fill_body','#fff'],
                ])
            },
            {
                theme_name:'深牵牛紫',
                color_dict:new Map([
                    ['primary','#1c0d1a'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#5f545d'],
                    ['text_subtitle','#786e76'],
                    ['text_secondary','#918990'],
                    ['text_placeholder','#aca5aa'],
                    ['text_link','#404040'],
                    ['fill','#ffff'],
                    ['fill_body','#fffef8'],
                ])
            },
        ],
        current_theme:'0?0'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }),
    actions: {
        change_theme(model,index){
            if(model == 0){
                this.light[index].color_dict.forEach((k,v)=>{
                    document.getElementsByTagName('body')[0].style.setProperty(`--${v}`, `${k}`);
                   })
            }else{
                this.dark[index].color_dict.forEach((k,v)=>{
                    document.getElementsByTagName('body')[0].style.setProperty(`--${v}`, `${k}`);
                   })
            }
           
        }
    }
})