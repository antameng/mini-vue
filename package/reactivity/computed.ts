import {effect} from "./effect";

export  const  computed=(getter:Function)=>{
        let dirty=true // 缓存 已有依赖的值发生改变才调用
        let value:any
        const _value =  effect(getter,{
            lazy:true,
            scheduler:()=>{
                dirty=true
                console.log('computed')
            }
        })

        class computeRefImp{
            get value() {
                if(dirty){
                    value = _value()
                    dirty=false
                }
                return _value
            }
        }
        return new computeRefImp()
}