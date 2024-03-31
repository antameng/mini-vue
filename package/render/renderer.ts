

const createRenderer = () => {
    const renderer = (vnode,container) => {
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
