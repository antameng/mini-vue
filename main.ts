import { reactive } from "./package/reactivity/reactive";
import { computed } from "./package/reactivity/computed";
import {traverse, watch} from "./package/reactivity/watch";
import {ref} from "./package/reactivity/ref";
import {effect} from "./package/reactivity/effect";
import {createApp} from "./package/render/renderer";
import {Vnode} from "./package/render/vnode";

let app=document.querySelector("#app");
let obj=reactive({
    name:'张三',
    age:18
})

let aaa=ref('123')

// effect(()=>{
//     app.innerHTML=aaa.value;
// })
// setTimeout(()=>{
//     aaa.value='3333333333'
// },1000)


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




let obj1=reactive({
    a:{
        b:{
            c:{
                d:{
                    kk:798
                },
                h:423
            },
            f:{
                g:333
            }
        },
        e:123
    }
})

watch(obj,(newValue,oldValue) => {
    console.log(newValue,oldValue,75)
})

watch(()=>obj.name,(newValue,oldValue) => {
    console.log(newValue,oldValue,79)
})

const abv = traverse(obj1)
console.log(abv,'traverse返回啥')
// obj1.a.b.c.h=123
obj.name='张三1111'

effect(() => {
    let vnode1:Vnode={
        tag:'div',
        children:[
            {
                tag:'h1',
                text:'hello'
            },
            {
                tag:'h2',
                text:'world'
            }
        ]
    }
    let vnode2:Vnode={
        tag:'div',
        children:[
            {
                tag:'h1',
                text:'hello'
            },
            {
                tag:'h2',
                text:'world'
            },
            {
                tag:'h2',
                text:'wo3333rld'
            }
        ]
    }
    createApp(vnode1).mount('#app')
    createApp(vnode2).mount('#app')
})

