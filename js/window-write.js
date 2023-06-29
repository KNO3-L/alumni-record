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
    change() {
        this.box_height = this.maskBox.offsetHeight
        let h = (this.box_height) * 0.5
        this.maskBox.style.marginTop = `calc(50vh - ${h}px)`
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
            }
        }, false)
        this.closeIcon.addEventListener("click", () => {
            this.hidden();
        })
        this.cancleBtn.addEventListener("click", () => {
            this.cancle && this.cancle instanceof Function && this.cancle() || this.hidden();
        })
    }
    render(domTemp) {
        if (domTemp instanceof HTMLElement) {
            // value = 0
            domTemp.offsetParent.removeChild(domTemp)
            domTemp = this.domTostring(document.importNode(domTemp, true))
        }
        this.maskBody.innerHTML = domTemp
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
}
let mask = new Maskdialog();
draw_box = document.querySelector("#draw")
mask.render(draw_box);
mask.hidden();