import './styles/style.scss'

import Scene from './js/Scene'
const scene = new Scene()

window.addEventListener('click', () => {
    console.log(scene.currentObject)
})
