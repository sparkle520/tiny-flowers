import{E as s}from"./index-bd42a444.js";const r=s("note",{state:()=>({classification:["学习笔记","技术分享","生活随想"],data:[{id:1,name:"概率论与数理统计",link:"/note/noteInfo/1",create_date:"2024?01?14?11:06",img:"",author:"",tags:"概率论?数理统计",classification:"数学",short_message:"概率论与数理统计是研究随机现象客观规律的数学学科.",update_date:"2024?01?14?11:06",is_visible:!0,is_finished:!1,directory_list:[{name:"第一章节 事件的概率",children:[{name:"1.1 随机事件"}]},{name:"第二章节 随机变量及概率分布",children:[]}]}],current_data:[],mems:new Set}),actions:{length(){return this.data.length},init(){this.current_data.length===0&&this.current_data.push(...this.data)},get_all(){return this.data},select_all_from_classification(a){if(a==="all")this.current_data=this.data;else{this.current_data=[];for(let t=0;t<this.data.length;t++){const e=this.data[t];e.classification===a&&this.current_data.push(e)}}},get_note_by_id(a){if(this.data.length==0)return-1;let t=0,e=this.data.length;for(;t<e;){let i=t+Math.floor((e-t)/2);if(this.data[i].id==a)return this.data[i];this.data[i].id>a?t=i+1:e=i}return-1}}});export{r as u};
