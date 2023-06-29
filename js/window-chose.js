class Maskdialog {
    constructor(config = {}) {
        this.cancle = config.cancle || null;
        this.title = config.title || "";
        this.width = config.width || '80%';
        this.setProps()
        this.init();
        this.renderTitle();
        this.handle();
    }
    setProps() {
        this.mask = document.querySelector(".mask-wrapper");
        this.diaglogContent = document.querySelector(".mask-content");
        this.closeIcon = document.querySelector(".mask-header>.close");
        this.cancleBtn = document.querySelector(".mask-foot>.btn-close");
        this.maskBody = document.querySelector(".mask-body");
        this.titleNode = document.querySelector(".mask-header-title");
        this.tableWrapper = document.querySelector(".mask-body-content");
        this.maskBox = document.querySelector(".mask-box");
        this.submitBtn = document.querySelector(".btn-submit")


    }
    init() {
        this.diaglogContent.style.width = this.width;
    }
    show() {
        this.mask.style.display = "block";
        setTimeout(() => {
            this.diaglogContent.style.transform = "rotateX(0)"
        }, 100)
        this.change()
    }
    hidden() {
        this.mask.style.display = "none";
        setTimeout(() => {
            this.diaglogContent.style.transform = "rotateX(90deg)"
        }, 100)
        this.tableWrapper.innerHTML = "";

    }
    handle() {
        this.mask.addEventListener('click', event => {
            event.stopPropagation()
            if (event.target.classList.contains(".mask-wrapper") || event.target.classList.contains(".mask-box")) {
                this.hidden();
                restInput()
            }
        }, false)
        this.closeIcon.addEventListener("click", () => {
            this.hidden();
            restInput()
        })
        this.cancleBtn.addEventListener("click", () => {
            this.cancle && this.cancle instanceof Function && this.cancle() || this.hidden();
        })

        this.submitBtn.addEventListener("click", () => {
            this.submit()
        })
    }
    render(domTemp) {
        if (domTemp instanceof HTMLElement) {
            domTemp = this.domTostring(domTemp)
        }
        this.maskBody.innerHTML = domTemp
        document.querySelector("body").removeChild(domTemp)
    }
    domTostring(node) {
        let temNode = document.createElement('div');
        let clone_node = node.cloneNode(true);
        temNode.appendChild(clone_node);
        let str = temNode.innerHTML;
        temNode = clone_node = null;
        return str;
    }
    renderTitle() {
        this.titleNode.innerHTML = this.title;
    }
    change() {
        this.box_height = this.maskBox.offsetHeight
        let h = (this.box_height) * 0.5
        this.maskBox.style.marginTop = `calc(50vh - ${h}px)`
    }
    submit() {
        if (image_preview.src) {
            let formData = new FormData();
            let filename = localStorage.name + "." + file_input.files[0].name.split(".").slice(-1)
            formData.append('image', file_input.files[0], filename);
            fetch(`http://127.0.0.1:5000/save_img`, {
                method: 'POST', // or 'PUT'
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.stautes === 0) {
                        localStorage["filename"] = filename
                        window.location.href = "../htmls/writePage.html"
                    }
                })

        }
        else {
            confirm("未上传图片")
        }
    }
}

function restInput() {
    img_name.innerHTML = "空"
    image_preview.src = ""
    image_preview.style.display = "none"
}


let mask = new Maskdialog();
file_input_box = document.querySelector("#file-input-box")
mask.render(document.importNode(file_input_box, true));
// draw_init()
mask.hidden();

