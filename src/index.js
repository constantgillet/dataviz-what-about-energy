import './styles/style.scss'

import Scene from './js/Scene'
const scene = new Scene()

import DataDisplay from './js/DataDisplay'
const dataDisplay = new DataDisplay()

//Change text data on click
window.addEventListener('click', () => {
    dataDisplay.setData(scene.currentObject)
})
