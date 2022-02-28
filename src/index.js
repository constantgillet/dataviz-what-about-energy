import './styles/style.scss'

import Scene from './js/Scene'
const scene = new Scene()

import DataDisplay from './js/DataDisplay'
const dataDisplay = new DataDisplay()

//Change text data on move
window.addEventListener('mousemove', () => {
    dataDisplay.setData(scene.currentObject)
})
