if (localStorage.name == undefined) {
    window.location.href = "../index.html"
}

function clickEvent(n) {
    localStorage["k"] = n
    if (n === 3) {
        document.querySelector("#file-input-box").style.display = "block"
        mask.show();
        mask.change();
    }
    else {
        window.location.href = "../htmls/writePage.html"
    }
}