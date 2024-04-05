// 容器存放依赖
// WeakMap key只能是对象或者symbol 不能遍历 弱引用 不稳定  垃圾回收200-300ms执行一次
let targetMap=new WeakMap()
let activeEffect
// const test = new WeakMap()
// test.set({name: '张三', age: 18},new Map())
interface Options{
    lazy:boolean
    scheduler:()=>void
}
// 收集依赖
export const tracker = (target,key )=> {
    let depsMap = targetMap.get(target)
    // 因为第一次没有值，默认值
    if(!depsMap){
         depsMap=new Map()  //new一个Map类型的数据
         targetMap.set(target,depsMap)  // 给targetMap添加key，key为target对象， value 值是一个Map()类型
    }
    let depsSet = depsMap.get(key)
    if(!depsSet){
        depsSet=new Set()  // new一个Set类型的数据，存effect函数
        depsMap.set(key,depsSet)   // set方法给Set类型的数组添加一对键值对
    }
    depsSet.add(activeEffect)    // add对Set类型的数据添加键值对
}
// 更细依赖
export const trigger = (target,key )=> {
    let depsMap = targetMap.get(target)
    let depsSet:Set<any> = depsMap.get(key)
    depsSet.forEach(effect=>{
        if(effect.options&&effect.options.scheduler){
            effect.options.scheduler(effect)
        }else {
            effect()
        }
    })
}
// 副作用函数
export const effect = ( fn:Function,options?:Options )=> {
    const _effect=()=>{
        activeEffect = _effect
        // fn()
        const res = fn()
        return res
    }

    _effect.options = options

    if(options && options.lazy){
        return _effect
    } else {
        _effect()
        return _effect
    }
}
