import {tracker,trigger} from "./effect";
// T extends Object 泛型约束
export const reactive = <T extends object>(target:T) => {
    return new Proxy(target, {
        get(target: T, key: string | symbol, receiver: any): any {
          let res=Reflect.get(target,key,receiver)
            tracker(target,key)  // 追踪依赖， 对象和key
            return res
        },

        set(target, key,value, receiver) {
            let res=Reflect.set(target, key,value, receiver)
            trigger(target,key) // 触发依赖更新 对象和key
            return  res
        }
    })
}