import {effect} from "./effect";
import {reactive} from "./reactive";

interface  Options{
    immediate?: boolean
    flush: 'sync'|'post'|'pre'
}

export const traverse = (target,seen=new Set()) => {
    if(typeof target!=='object'||target==null||seen.has(target)){
            return
    }
    seen.add(target)
    for(let key in target){
        traverse(target[key],seen)
    }
    return seen
    // return target
}

export const watch = (target:any,cb:Function,options?:Options) => {
        // 格式化参数，格式化成 getter 函数
        let getter:Function
        if(typeof target==='function'){
            getter=target
        } else {
            getter=()=>traverse(target)
        }
        // 2、返回值
        let newValue,oldValue
        const job = () =>{
            newValue=effectFn()
            cb(newValue,oldValue)
            oldValue=newValue
        }
        // 依赖发生变化，执行job
        const effectFn = effect(getter,{
            lazy:true,
            scheduler:job
        })
        //3、immediate
        if(options && options.immediate){
            job()
        } else {
            oldValue = effectFn()
        }
        
}