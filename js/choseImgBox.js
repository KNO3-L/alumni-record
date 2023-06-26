const file_input_button = document.getElementById("file-input-button")
const img_name = document.getElementById("img-name")
const file_input = document.getElementById("file-input")
const image_preview = document.getElementById("image-preview")

file_input.addEventListener("change", (e) => {
    img_name.innerHTML = file_input.files[0].name
    const reader = new FileReader();
    reader.onload = function () {
        const image = new Image();

        image.src = reader.result;
        image.onload = () => {
            image_preview.style.display = "block"
            mask.change()
        };
        image_preview.src = reader.result;


        const file = e.target.files[0];
        reader.readAsDataURL(file);
    };
    reader.readAsDataURL(file_input.files[0]);
})
file_input_button.addEventListener("click", (e) => {
    file_input.click()
})

