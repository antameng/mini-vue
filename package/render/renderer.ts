import { Vnode } from "./vnode";


const createRenderer = () => {
    const setElementText = (el: HTMLElement, text) => {
        el.textContent = text
    }

    const insert = (el: HTMLElement, parent, anchor = null) => {
        parent.insertBefore(el, anchor || null)
        // el,插入的新元素
        // anchor 插入元素的位置 null表示新元素插入末尾 如果指定了，就会插入到指定的元素前面
    }

    // 创建真实dom元素
    const createElement = (tag) => {
        return document.createElement(tag)
    }

    const mountElement = (vnode: Vnode, container) => {
        const root = createElement(vnode.tag)
        vnode.el = root  //挂载的时候，顺便把真实Dom添加上去
        if (typeof vnode.children === 'string') {
            // 字符串给元素插入文本
            setElementText(root, vnode.children)
        } else {
            // 递归遍历 创建子节点插入父级
            vnode.children.forEach((child) => {
                patch(null, child, root)
            })
        }
        insert(root, container)
        console.log(root, container)
    }

    /**
     * @param n1 旧的虚拟Dom
     * @param n2 新的虚拟Dom
     * @param container 挂载点
     */
    const patch = (n1, n2, container) => {
        if (!n1) {
            // 没n1表示没旧的，即新挂载
            mountElement(n1, container)
        } else {
            //有n1表示有旧的，即更新
            if (typeof n2.children === 'string') {
                patchChildren(n1, n2, container)
            } else {
                patchElement(n1, n2, container)
            }
        }
    }
    const unMount = (vnode: Vnode) => {
        const root = vnode.el.parentNode
        root && root.removeChild(vnode.el)
    }

    const patchChildren = (n1: Vnode, n2: Vnode, container) => {
        n2.el = n1.el
        // 只是文字变了
        if (typeof n2.children === 'string') {
            setElementText(container, n2.children)
        } else if (Array.isArray(n2.children)) {
            // 新增或者删除了
            if (Array.isArray(n1.children)) {
                n1.children.forEach(item => { unMount(item) })
                n2.children.forEach(item => patch(null, item, container))
            }
        }
    }
    const patchElement = (n1, n2, container) => {
        const el = n2.el = n1.el  // 将旧的el复制一份给新的el
        // patchChildren(n1, n2, el)
        patchKeyChildren(n1, n2, el)
    }

    const renderer = (vnode, container) => {
        if (vnode) {
            patch(container._vnode, vnode, container)
        } else {
            if (container._vnode) {
                unMount(vnode)
            }
        }
        container._vnode = vnode; // 挂载旧的虚拟Dom
    }

    const isSameVNodeType = (n1, n2) => {
        if (n1.key === n2.key) {
            return true
        }
        return false
    }

    const patchKeyChildren = (n1: Vnode, n2: Vnode, container) => {

        let j = 0 // 指针
        const oldChildren = n1.children as Vnode[] // 旧的vnode集合
        const newChildren = n2.children as Vnode[] // 新的vnode集合

        let e1 = oldChildren.length - 1
        let e2 = newChildren.length - 1
        // 前序
        while (j <= e1 && j <= e2) {
            const oldVnode = oldChildren[j]
            const newVnode = newChildren[j]
            if (isSameVNodeType(oldVnode, newVnode)) {
                // 一样就更新
                patch(oldVnode, newVnode, container)
            } else {
                break
            }
            j++
        }
        // 尾序
        while (j <= e1 && j <= e2) {
            const oldVnode = oldChildren[e1]
            const newVnode = newChildren[e2]
            if (isSameVNodeType(oldVnode, newVnode)) {
                // 一样就更新
                patch(oldVnode, newVnode, container)
            } else {
                break  //跳出循环
            }
            e1--
            e2--
        }
        //如果j>e1, 表示要新增了，因为新的vnode数量比旧的vnode多 新增
        if (j > e1) {
            if (j <= e2) {
                while (j <= e2) {
                    patch(null, newChildren[j], container)
                    j++
                }
            }
        } else if (j > e2) {  // 旧的比新的多，那就是删除
            // 这时候以旧的为准
            while (j <= e1) {
                unMount(oldChildren[j])
                j++
            }
        } else {
            // 移动的删除的新增的 修改的
            // 想办法找能复用的节点
            const s1 = j
            const s2 = j
            // 构建映射表  新节点的映射表
            const keytoNewIndexMap = new Map
            for (j = s2; j < s2; j++) {
                const newChild = newChildren[j]
                keytoNewIndexMap.set(newChild.key, j)
            }
        }

    }

    return {
        renderer
    }
}

export const createApp = (vnode) => {
    // const renderer = createRenderer()
    return {
        mount: (container) => {
            createRenderer().renderer(vnode, container)
        }
    }
}

// createApp(App).mount(container)
