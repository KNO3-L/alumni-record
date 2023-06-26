const background = document.getElementById("background")
const range = document.getElementById("range")
const color = document.getElementById("color")
const main = document.getElementById("main")

const file_input = document.getElementById("file-input")
const img_preview = document.getElementById("img-preview")

const input_name = document.getElementById("input-name")

input_name.value = localStorage.name

if (localStorage.name == undefined) {
    window.location.href = "../index.html"
}
console.log(localStorage.k);
if (localStorage.k === "3") { background.src = `../images/background-images/accounts-background-images/${localStorage.filename}` }
else { background.src = `../images/background-images/${localStorage.k}.jpeg` }

range.addEventListener("input", () => {
    var opacity = range.value / 100
    background.style.opacity = opacity
    color.style.opacity = opacity
    main.style.color = color.value
})
color.addEventListener("input", () => {
    main.style.color = color.value
})

color.addEventListener("mouseenter", () => {
    color.style.opacity = "1"
})
color.addEventListener("mouseleave", () => {
    color.style.opacity = range.value / 100
})

file_input.addEventListener("change", () => {

    const reader = new FileReader();
    reader.onload = function () {
        console.log(0);
        const image = new Image();
        image.src = reader.result;
        img_preview.src = reader.result;
    };
    reader.readAsDataURL(file_input.files[0]);
})
img_preview.addEventListener("click", () => {
    file_input.click()
})