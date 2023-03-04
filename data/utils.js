export { getRandomColor, modesArray, randomIntFromInterval, clickToCopy }

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