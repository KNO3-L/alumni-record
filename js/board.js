const cvs = document.getElementById("mycanvas");
const plt = cvs.getContext("2d");
const btn_1 = document.getElementById("reset");
const pen_color = document.getElementById("pen-color");
const wth_1 = document.getElementById("wth_1");
const wth_2 = document.getElementById("wth_2");
const wth_3 = document.getElementById("wth_3");
const eraser = document.getElementById("eraser");
const save = document.getElementById("save");
is_eraser = false;



function getElementAxis(e) {
    function getParentLeft(e) {
        if (!e.offsetParent) {
            return 0
        }
        return e.offsetLeft + getParentLeft(e.offsetParent)
    }
    function getParentTop(e) {
        if (!e.offsetParent) {
            return 0
        }
        return e.offsetTop + getParentTop(e.offsetParent)
    }

    return [getParentLeft(e), getParentTop(e)]
}

//PC
cvs.onmouseover = function (ev) {
    ev.preventDefault();
}
cvs.onmousedown = function (ev) {
    console.log(0);
    var pageX = ev.pageX || ev.changedTouches[0].pageX;
    var pageY = ev.pageY || ev.changedTouches[0].pageY;

    //每次都从一个新起点开始，会默认结束上一个。写restore的话会闭合图像
    [eX, eY] = getElementAxis(cvs)
    plt.beginPath();
    plt.moveTo(pageX - eX, pageY - eY);

    cvs.onmousemove = function (ev) {
        var pageX = ev.pageX || ev.changedTouches[0].pageX;
        var pageY = ev.pageY || ev.changedTouches[0].pageY;
        [eX, eY] = getElementAxis(cvs)
        plt.lineTo(pageX - eX, pageY - eY);
        plt.stroke();
    }
}
cvs.onmouseup = function () {
    cvs.onmousemove = null;
}
document.ontransitionend = function () {
    cvs.onmousemove = null;
}

//Mobile Phone
cvs.ontouchstart = cvs.onmousedown
cvs.ontouchmove = function (ev) {
    // console.log(1);
    var pageX = ev.pageX || ev.changedTouches[0].pageX;
    var pageY = ev.pageY || ev.changedTouches[0].pageY;
    [eX, eY] = getElementAxis(cvs)
    plt.lineTo(pageX - eX, pageY - eY);
    plt.stroke();
}

btn_1.onclick = function () {
    plt.clearRect(0, 0, 600, 500);
}

// plt.strokeStyle = "#ccc"
pen_color.oninput = function () {
    if (!is_eraser) {
        plt.strokeStyle = pen_color.value;
    }
}

wth_1.onclick = function () {
    if (!is_eraser) {
        plt.lineWidth = 1;
    }
}
wth_2.onclick = function () {
    if (!is_eraser) {
        plt.lineWidth = 3;
    }
}
wth_3.onclick = function () {
    if (!is_eraser) {
        plt.lineWidth = 5;
    }
}

eraser.onclick = function () {
    if (!is_eraser) {
        plt.save();
        plt.strokeStyle = "rgb(255,255,255)";
        plt.lineWidth = 12;
        eraser.innerHTML = "画笔";
        is_eraser = true;
    } else {
        plt.restore();
        eraser.innerHTML = "橡皮擦";
        is_eraser = false;
    }
}

save.onclick = function () {
    var image = cvs.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
}