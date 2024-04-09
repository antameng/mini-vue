import { Vnode } from "./vnode";


const createRenderer = () => {
    const setElementText=(el:HTMLElement,text)=>{
        el.textContent = text
    }

    const insert=(el: HTMLElement,parent,anchor=null) =>{
        parent.insertBefore(el,anchor||null)
        // el,插入的新元素
        // anchor 插入元素的位置 null表示新元素插入末尾 如果指定了，就会插入到指定的元素前面
    }

    const createElement = (tag) => {
        return document.createElement(tag)
    }

    const mountElement = (vnode:Vnode,container)=>{
        const root= createElement(vnode.tag)
        if(typeof vnode.children==='string'){
            // 字符串给元素插入文本
            setElementText(root,vnode.children)
        } else {
           // 递归遍历 创建子节点插入父级
            vnode.children.forEach((child)=>{
                patch(null,child,root)
            })
        }
        insert(root,container)
        console.log(root,container)
    }

    /**
     * @param n1 旧的虚拟Dom
     * @param n2 新的虚拟Dom
     * @param container 挂载点
     */
    const patch = (n1,n2,container)=>{
        if(!n1){
            // 没n1表示没旧的，即新挂载
            mountElement(n1,container)
        } else {
          //有n1表示有旧的，即更新
        }
    }

    const renderer = (vnode,container) => {
        if(vnode){
            patch(container._vnode,vnode,container)
        } else {
            // TODO:
        }
        container._vnode = vnode; // 挂载旧的虚拟Dom
        console.log(vnode,container,'11111111')
    }

    return {
        renderer
    }
}

export const createApp=(vnode)=> {
    const renderer = createRenderer()
    return {
        mount: (container) =>{
            renderer.renderer(vnode,container)
        }
    }
}
