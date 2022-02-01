import * as THREE from 'three'

export default class Scene {
    constructor() {

        this.canvas = document.querySelector('canvas.webgl')

        //SCENE
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)


        //SIZES
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        //RENDERER
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        })

        //CAMERA
        this.camera = new THREE.PerspectiveCamera( 45, this.sizes.width / this.sizes.height, 1, 1000 );
        this.camera.position.set(0, 5, 0)
        this.camera.updateProjectionMatrix()

        this.clock = new THREE.Clock()
        this.addTick()

    }

    addLights(){}

    addRenderer() {
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    addTick() {
        const elapsedTime = this.clock.getElapsedTime()
        
        // Render
        this.renderer.render(this.scene, this.camera)
        this.renderer.outputEncoding = THREE.sRGBEncoding
        
        // Call tick again on the next frame
        window.requestAnimationFrame(this.addTick.bind(this))
    }

    handleResize() {
        window.addEventListener('resize', () => {
            // Update sizes
            this.sizes.width = window.innerWidth
            this.sizes.height = window.innerHeight
            
            // Update camera
            this.camera.updateOnResize(this.sizes.width / this.sizes.height)
            
            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

    }
}