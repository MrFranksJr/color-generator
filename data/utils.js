export { getRandomColor, modesArray, randomIntFromInterval, clickToCopy, responsiveMenu, refreshButton, windowChanges, bodyResizer }

const modesArray = [
    "monochrome",
    "monochrome-dark",
    "monochrome-light",
    "analogic",
    "complement",
    "analogic-complement",
    "triad",
    "quad",
]

function getRandomColor() {
    const letters = '0123456789ABCDEF'.split('')
    let color = '#'
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)]
    }
    return color
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function clickToCopy(elementId) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(document.getElementById(elementId).previousElementSibling.textContent)
    document.getElementById(elementId).textContent = "Copied!"
    //reset
    setTimeout(function() {
        document.getElementById(elementId).textContent = "Click to copy"
    }, 3000)
}

function responsiveMenu() {
        colorArea.classList.toggle('blur')
        document.getElementById('color-options').classList.toggle("active")
        document.getElementById('hamburger').classList.toggle("active")
}

let currentRotation = 0
function refreshButton() {
    currentRotation += 360
    document.getElementById('refresh-button').style.color = document.getElementById('color-picker').value
    document.getElementById('refresh-button').style.transform = `rotate(${currentRotation}deg)`
}



const colorArea = document.getElementById('color-area')
const generatorColors = document.getElementsByClassName('generator-color')
const allHsvText = document.getElementsByClassName('hsv-text')
const allHslText = document.getElementsByClassName('hsl-text')
const allRgbText = document.getElementsByClassName('rgb-text')
const allNameText = document.getElementsByClassName('name-text')
const allHexText = document.getElementsByClassName('hex-text')
const allCopyText = document.getElementsByClassName('copy-text')

function windowChanges() {
    bodyResizer()
    const pixelWidth = window.innerWidth
    const colorCount = document.getElementById('color-number').value
    if (pixelWidth/colorCount < 100) {
        addAllSmallClasses()
        removeAllMediumClasses()
    }
    else if (pixelWidth/colorCount > 100 && pixelWidth/colorCount < 140) {
        removeAllSmallClasses()
        addAllMediumClasses()
    }
    else if (pixelWidth/colorCount > 140 && pixelWidth > 630) {
        if (colorArea.classList.contains('blur')) {
            responsiveMenu()
        }
        removeAllSmallClasses()
        removeAllMediumClasses()
    }
    else if (pixelWidth/colorCount > 140) {
        removeAllSmallClasses()
        removeAllMediumClasses()
    }
}

function addAllSmallClasses() {
    colorArea.classList.add('small')
    addSmallClass(generatorColors)
    addSmallClass(allHslText)
    addSmallClass(allHsvText)
    addSmallClass(allNameText)
    addSmallClass(allRgbText)
    addSmallClass(allHexText)
}
function addSmallClass(elemArray) {
    for (let elem of elemArray) {
        elem.classList.add('small')
    }
}

function removeAllSmallClasses() {
    colorArea.classList.remove('small')
    removeSmallClass(generatorColors)
    removeSmallClass(allHslText)
    removeSmallClass(allHsvText)
    removeSmallClass(allNameText)
    removeSmallClass(allRgbText)
    removeSmallClass(allHexText)
}
function removeSmallClass(elemArray) {
    for (let elem of elemArray) {
        elem.classList.remove('small')
    }
}

function addAllMediumClasses() {
    colorArea.classList.add('medium')
    addMediumClass(allHslText)
    addMediumClass(allHsvText)
    addMediumClass(allNameText)
    addMediumClass(allRgbText)
    addMediumClass(allHexText)
    addMediumClass(generatorColors)
    addMediumClass(allCopyText)
}
function addMediumClass(elemArray) {
    for (let elem of elemArray) {
        elem.classList.add('medium')
    }
}

function removeAllMediumClasses() {
    colorArea.classList.remove('medium')
    removeMediumClass(generatorColors)
    removeMediumClass(allHslText)
    removeMediumClass(allHsvText)
    removeMediumClass(allNameText)
    removeMediumClass(allRgbText)
    removeMediumClass(allHexText)
    removeMediumClass(allCopyText)
}
function removeMediumClass(elemArray) {
    for (let elem of elemArray) {
        elem.classList.remove('medium')
    }
}

//SAFARI Bar Handler
const bodyResizer = () => {
    const height = window.innerHeight;
    document.body.style.height = `${height}px`
}