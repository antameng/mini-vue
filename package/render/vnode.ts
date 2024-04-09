export interface  Component {
    render():Vnode
    data:object
    setup:object
    create():void
    beforeCreate():void
    mounted():void
}

export class Vnode {
    tag:string|Component
    el?:HTMLElement  //真实Dom
    key?:string|number
    text?:string
    children?:Vnode[]|string
}