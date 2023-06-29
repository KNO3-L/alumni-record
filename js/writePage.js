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
        const image = new Image();
        image.src = reader.result;
        img_preview.src = reader.result;
    };
    reader.readAsDataURL(file_input.files[0]);
})
img_preview.addEventListener("click", () => {
    file_input.click()
})

function submit() {
    is_commit = confirm("确认要提交吗?")
    if (!is_commit) {
        return 0
    }

    const data = {}
    const info_inputs = [...document.querySelectorAll("#info>input")]
    const sex_inputs = [...document.querySelectorAll("#basic-info>input[name='sex']")]

    info_inputs.forEach((v) => {
        data[v.id] = v.value
    })
    data.name = localStorage.name

    data.sex = ""
    sex_inputs.forEach((v) => {
        if (v.checked) {
            data.sex = v.value
        }
    })
    // sex_inputs[0].checked == true ? data.sex = "男" : data.sex = "女"

    const formData = new FormData();
    formData.set(localStorage.name + ".jpg", cvs_save())

    data.darw_img = formData

    data.color = color.value

    data.alpha = range.value / 100

    data.advice = document.querySelector("#advice>textarea").value

    console.log(data);
    fetch(`http://127.0.0.1:5000/save_msg`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
        })
}