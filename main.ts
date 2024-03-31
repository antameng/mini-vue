import { reactive } from "./package/reactivity/reactive";
import { computed } from "./package/reactivity/computed";
import { watch } from "./package/reactivity/watch";
import {ref} from "./package/reactivity/ref";
import {effect} from "./package/reactivity/effect";

let app=document.querySelector("#app");
let obj=reactive({
    name:'张三',
    age:18
})

let aaa=ref('123')

effect(()=>{
    app.innerHTML=aaa.value;
})
setTimeout(()=>{
    aaa.value='3333333333'
},1000)

// watch(obj,(newValue,oldValue) => {
//     console.log(newValue,oldValue)
// })
//
// watch(()=>{  //监听单一制
//     obj.name
// },(newValue,oldValue) => {
//     console.log(newValue,oldValue)
// })
//
// let  a=computed(()=>{
//     console.log('计算了')
//     return obj.name+'1888'
// })
// obj.name='xixi'
// obj.age
// effect(() => {
//     app.innerHTML=obj.name;
// })
