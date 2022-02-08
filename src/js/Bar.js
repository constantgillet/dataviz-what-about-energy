import * as THREE from 'three'

export default class Bar {
  constructor(_scene, _height) {    
    this.geometry = new THREE.BoxGeometry(
        5,
        _height,
        5
    )
    this.material = new THREE.MeshStandardMaterial(0xffffff)
    this.bar = new THREE.Mesh(this.geometry, this.material)

    _scene.add(this.bar)
  }

  populate() {
  }
}
