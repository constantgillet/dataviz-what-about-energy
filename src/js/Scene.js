import * as THREE from 'three'
import Bar from './Bar'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"



export default class Scene {
    constructor() {
        this.canvas = document.querySelector('canvas.webgl')

        //SCENE
        this.scene = new THREE.Scene()
        // this.scene.background = new THREE.Color(0x000000)

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
        this.camera = new THREE.PerspectiveCamera( 45, this.sizes.width / this.sizes.height, 1, 1000 )
        this.camera.position.set(150, 100, 100)
        this.camera.updateProjectionMatrix()


        //Controls


        this.move = 0


        //Lights
        this.addLights()

        //Elements
        this.populate()


        this.clock = new THREE.Clock()
        this.handleResize()
        this.addRenderer()
        this.controls = new OrbitControls( this.camera, this.renderer.domElement )
        // this.controls.enableDamping = true
        this.addTick()

    }

    populate() {
        const data = require('./../../data.json')
        data.forEach((d, i) => {
            console.log(d.consumption)
            const h = d.consumption / 1.4
            let x = (i % 15) * 5
            const y = h / 2
            const z = (i / 15) * 5
            this.bar = new Bar(this.scene, h)
            const _this = this.bar
            _this.bar.position.set(x, y, z)
        })
    }

    addLights(){
        const ambiantLight = new THREE.AmbientLight(new THREE.Color(0xffffff), .1)
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.0)

        this.scene.add(ambiantLight, hemisphereLight)
    }

    addRenderer() {
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    addTick() {
        const elapsedTime = this.clock.getElapsedTime()

        this.controls.addEventListener( 'change', ()=>{this.renderer.render(this.scene, this.camera)} )
        this.controls.update()

        
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
            this.camera.updateProjectionMatrix()
            
            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

    }
}