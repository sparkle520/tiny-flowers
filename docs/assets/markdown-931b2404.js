import{h as l}from"./index-54028bc5.js";const o=l("math",{state:()=>({data:[{id:15,tags:"定积分",sort:"1?3",link:"/math/details/15",from:"330(数一)"},{id:14,tags:"极限",sort:"1?1",link:"/math/details/14",from:""},{id:13,tags:"定积分",sort:"1?3",link:"/math/details/13",from:"330(数一)"},{id:12,tags:"极限",sort:"1?1",link:"/math/details/12",from:"330(数一)"},{id:11,tags:"曲线积分",sort:"1?6",link:"/math/details/11",from:""},{id:10,tags:"几何概型",sort:"3?1",link:"/math/details/10",from:""},{id:9,tags:"无穷级数?幂级数",sort:"1?7",link:"/math/details/9",from:""},{id:8,tags:"二次型",sort:"2?6",link:"/math/details/7",from:""},{id:7,tags:"随机变量与分布",sort:"3?2",link:"/math/details/7",from:"数一真题"},{id:6,tags:"数学期望?方差?随机变量与分布",sort:"3?4",link:"/math/details/6",from:""},{id:5,tags:"条件概率",sort:"3?1",link:"/math/details/5",from:""},{id:4,tags:"条件概率?全概率公式",sort:"3?1",link:"/math/details/4",from:""},{id:3,tags:"偏导数",sort:"1?5",link:"/math/details/3",from:""},{id:2,tags:"无穷级数?幂级数",sort:"1?7",link:"/math/details/2",from:""},{id:1,tags:"导数?泰勒公式",sort:"1?2",link:"/math/details/1",from:""}],current_data:{tag:"",search:"",sort:"",data:[]}}),actions:{get_tags(){let s=new Map;for(let a=0,r=this.data.length;a<r;a++)this.data[a].tags.split("?").forEach(t=>{s.has(t)?s.set(t,s.get(t)+1):s.set(t,1)});return[...s].map(a=>a)},select_all(s,a,r,e){if(e!=null&&e!=""&&e!=this.current_data.sort){this.current_data.data=[];for(let t=0,d=this.data.length;t<d;t++){const i=this.data[t];i.sort==e&&this.current_data.data.push(i)}}else if(this.current_data.tag!=s||this.current_data.search!=a){if(this.current_data.data=[],s=="all")if(a==null||a=="")this.current_data.data=this.data;else for(let t=0,d=this.data.length;t<d;t++){const i=this.data[t];(i.tags.includes(a)||i.id.toString()==a||i.from.includes(a))&&this.current_data.data.push(i)}else for(let t=0,d=this.data.length;t<d;t++){const i=this.data[t];i.tags.includes(s)&&this.current_data.data.push(i)}this.current_data.tag=s,this.current_data.search=a,this.current_data.sort=e}return this.current_data.data.slice((r-1)*10,r*10)}}});export{o as u};