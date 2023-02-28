import { getRandomColor, modesArray, randomIntFromInterval } from "./data/utils.js"
import invert from 'invert-color'

//consts and lets
const colorApiUrl = 'https://www.thecolorapi.com/scheme'
const inputForm = document.getElementById('color-options-form')
let colorsArray = []

//eventlisteners
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        startUpState()
    }
  }

inputForm.addEventListener('change', fetchColors)

////////////////////////FUNCTIONS////////////////////
function fetchColors() {
    const color = document.getElementById('color-picker').value.slice(1)
    const mode = document.getElementById('color-options-dd').value
    const count = document.getElementById('color-number').value

    fetch(colorApiUrl + '?hex=' + color + '&mode=' + mode + '&count=' + count)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors
            console.log(colorsArray)
            renderColors(colorsArray)
            console.log(data.colors)
        })
}

function renderColors(arr) {
    const colorsHtml = buildColorHtml(arr)
    document.getElementById('color-area').innerHTML = colorsHtml
}

function buildColorHtml(array) {
    let colorHtml = ''
    for (let color of array) {
        const counterColor = invert(color.hex.value, true)
        colorHtml += `
        <div class="generator-color" style='background-color:${color.hex.value}'>
            <div class="rgb-text" style='color:${counterColor}'>${color.rgb.value}</div>
            <div class="color-text hsl-text" style='color:${counterColor}'>${color.hsl.value}</div>
            <div class="color-text hsv-text" style='color:${counterColor}'>${color.hsv.value}</div>
            <div class="color-text hex-text" style='color:${counterColor}'>${color.hex.value}</div>
            <div class="color-text name-text" style='color:${counterColor}'>${color.name.value}</div>
        </div>
        `
    }
    return colorHtml
}

function startUpState() {
    document.getElementById('color-picker').value = getRandomColor()
    document.getElementById('color-options-dd').value = modesArray[randomIntFromInterval(0,7)]
    fetchColors()
}

window.onload = startUpState()