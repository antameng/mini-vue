// 容器存放依赖
// WeakMap key只能是对象或者symbol 不能遍历 弱引用 不稳定  垃圾回收200-300ms执行一次
let targetMap=new WeakMap()
let activeEffect
const test = new WeakMap()
test.set({name: '张三', age: 18},new Map())
interface Options{
    lazy:boolean
    scheduler:()=>void
}
// 收集依赖
export const tracker = (target,key )=> {
    let depsMap = targetMap.get(target)
    // 因为第一次没有值，默认值
    if(!depsMap){
         depsMap=new Map()
         targetMap.set(target,depsMap)  // value 值是一个Map()类型
    }
    let deps = depsMap.get(key)
    if(!deps){
        deps=new Set()
        depsMap.set(key,deps)
    }
    deps.add(activeEffect)
    console.log(deps,'deps111111111',targetMap)
}
// 更细依赖
export const trigger = (target,key )=> {
    let depsMap = targetMap.get(target)
    let deps:Set<any> = depsMap.get
    deps.forEach(effect=>{
        if(effect.options&&effect.options.scheduler){
            effect.options.scheduler(effect)
        }else {
            effect()
        }
    })
}
// 副作用函数
export const effect= ( fn:Function,options?:Options )=> {
    const _effect=()=>{
        activeEffect = _effect
        // fn()
        const res=fn()
        return res
    }
    console.log(fn,123)
    _effect().options=options

    if(options&&options.lazy){
        return effect
    } else {
        _effect()
        return _effect
    }


}