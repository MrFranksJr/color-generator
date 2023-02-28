export { getRandomColor, modesArray, randomIntFromInterval }

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
    const num = Math.floor(Math.random() * (max - min + 1) + min)
    console.log(num)
    return num
}