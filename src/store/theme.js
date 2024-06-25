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
                    ['text_title','#cdd1d3'],
                    ['text_subtitle','#cdd1d3'],
                    ['text_secondary','#cdd1d3'],
                    ['text_placeholder','#cdd1d3'],
                    ['text_link','#a4ccdc'],
                    ['fill','#131824'],
                    ['fill_body','#0f1423'],
                ])
            }
        ],
        light:[
            {
                theme_name:'经典紫',
                color_dict:new Map([
                    ['primary','#9966ff'],
                    ['fill_primary','#ffff'],
                    ['text','#4a5a6a'],
                    ['text_title','#3a4a5a'],
                    ['text_subtitle','#5a6a7a'],
                    ['text_secondary','#8491a5'],
                    ['text_placeholder','#9966ff'],
                    ['text_link','#9966ff'],
                    ['fill','#ffff'],
                    ['fill_body','#ffff'],
                ])
            },
            {
                theme_name:'霁青',
                color_dict:new Map([
                    ['primary','#63bbd0'],
                    ['fill_primary','#ffff'],
                    ['text','#152a1f'],
                    ['text_title','#7c9faa'],
                    ['text_subtitle','#7c9faa'],
                    ['text_secondary','#7c9faa'],
                    ['text_placeholder','#7c9faa'],
                    ['text_link','#a4ccdc'],
                    ['fill','#ffff'],
                    ['fill_body','#daebec'],
                ])
            }
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