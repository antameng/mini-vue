import {reactive} from "./reactive";
import {tracker, trigger} from "./effect";

const isObject = (value: any): boolean =>{
    return value!==null &&typeof value === 'object'
}

const toReactive = (value) => {
    return isObject(value)?reactive(value):value;
}
export  const ref = <T>(value:T)  => {
  return new RefTmpl<T>(value)
}

class RefTmpl<T> {
    private  _value:T
    constructor(value) {
        this._value=toReactive(value)
    }
    get value() {
        tracker(this,'value')
        return this._value
    }
    set value(value) {
        if(this._value==value){
            return
        }
        this._value=toReactive(value)
        trigger(this,'value')
    }
}