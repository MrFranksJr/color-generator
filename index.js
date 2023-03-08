import { getRandomColor, modesArray, randomIntFromInterval, clickToCopy, responsiveMenu, refreshButton, windowChanges } from "./data/utils.js"
import invert from 'invert-color'

//consts and lets
const colorApiUrl = 'https://www.thecolorapi.com/scheme'
const inputForm = document.getElementById('color-options-form')
let colorsArray = []

////////////////////////FUNCTIONS////////////////////
function fetchColors() {
    const color = document.getElementById('color-picker').value.slice(1)
    const mode = document.getElementById('color-options-dd').value
    const count = document.getElementById('color-number').value

    fetch(colorApiUrl + '?hex=' + color + '&mode=' + mode + '&count=' + count)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors
            renderColors(colorsArray)
        })
}

function renderColors(arr) {
    document.getElementById('color-area').innerHTML = buildColorHtml(arr)
    const allColorBlocks = document.getElementsByClassName('generator-color')
    for (let colorBlock of allColorBlocks) {
        setTimeout( () => {
            colorBlock.style.opacity = '100'
        }, randomIntFromInterval(50, 350))
    }
}

function buildColorHtml(array) {
    let colorHtml = ''
    for (let color of array) {
        const counterColor = invert(color.hex.value, true)
        colorHtml += `
        <div class="generator-color" style='background-color:${color.hex.value};'>
            <div class="color-text rgb-text" style='color:${counterColor}'><p data-clickable="${color.rgb.value}">${color.rgb.value}</p><span class="copy-text" id="${color.rgb.value}">Click to copy</span></div>
            <div class="color-text hsl-text" style='color:${counterColor}'><p data-clickable="${color.hsl.value}">${color.hsl.value}</p><span class="copy-text" id="${color.hsl.value}">Click to copy</span></div>
            <div class="color-text hsv-text" style='color:${counterColor}'><p data-clickable="${color.hsv.value}">${color.hsv.value}</p><span class="copy-text" id="${color.hsv.value}">Click to copy</span></div>
            <div class="color-text hex-text" style='color:${counterColor}'><p data-clickable="${color.hex.value}">${color.hex.value}</p><span class="copy-text" id="${color.hex.value}">Click to copy</span></div>
            <div class="color-text name-text" style='color:${counterColor}'><p data-clickable="${color.name.value}">${color.name.value}</p><span class="copy-text" id="${color.name.value}">Click to copy</span></div>
        </div>
        `
    }
    return colorHtml
}

function onLoadState() {
    document.getElementById('color-picker').value = getRandomColor()
    document.getElementById('color-options-dd').value = modesArray[randomIntFromInterval(0,7)]
    fetchColors()
    refreshButton()
    windowChanges()
}

window.onload = function () {
    setTimeout( () => {
        document.getElementsByTagName('header')[0].style.transform = 'unset'
        document.getElementsByTagName('main')[0].style.opacity = '100'
    }, 800)
    onLoadState()
}

//eventlisteners
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        onLoadState()
    }
  }

inputForm.addEventListener('change', fetchColors)

document.addEventListener("click", function(e) {
    if (e.target.dataset.clickable) {
        clickToCopy(e.target.dataset.clickable)
    }
})

document.getElementById('hamburger').addEventListener("click", responsiveMenu)
document.getElementById('refresh-button').addEventListener("click", onLoadState)

window.addEventListener("resize", () => {
    windowChanges()
})