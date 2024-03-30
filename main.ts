import {reactive} from "./package/reactivity/reactive";
import {effect} from "./package/reactivity/effect";

const app=document.getElementById("app");
const obj=reactive({
    name:'张三',
    age:18
})

effect((obj) => {
    app.innerHTML=obj.name;
})
