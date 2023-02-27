import { getRandomColor, modesArray, randomIntFromInterval } from "./data/utils.js"

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
        colorHtml += `
        <div class="generator-color" style='background-color:${color.hex.value}'></div>
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