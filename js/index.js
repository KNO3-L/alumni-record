// 要操作到的元素
const toLogin = document.getElementById('login');
const toRegister = document.getElementById('register');
const form_box = document.getElementsByClassName('form-box')[0];
const register_box = document.getElementsByClassName('register-box')[0];
const login_box = document.getElementsByClassName('login-box')[0];

const login_input_boxs = [...document.querySelectorAll(`.login-box > input`)]
const register_input_boxs = [...document.querySelectorAll(`.register-box > input`)]

login_input_boxs[0].addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        login_input_boxs[1].focus()
    }
})

register_input_boxs[0].addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        register_input_boxs[1].focus()
    }
})

login_input_boxs[1].addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        clickEvent("login")
    }
})

register_input_boxs[1].addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        clickEvent("register")
    }
})


// 去注册按钮点击事件
toRegister.addEventListener('click', () => {
    form_box.style.transform = 'translateX(80%)';
    login_box.classList.add('hidden');
    register_box.classList.remove('hidden');
})
// 去登录按钮点击事件
toLogin.addEventListener('click', () => {
    form_box.style.transform = 'translateX(0%)';
    register_box.classList.add('hidden');
    login_box.classList.remove('hidden');
})
// 登录&注册事件
function clickEvent(type) {
    let info = [...document.querySelectorAll(`.${type}-box > input`)].map(e => { return e.value });
    if (info.some(e => { return e === '' })) {
        confirm("请检查信息是否有遗漏");
    }
    else if (info[1].length < 5) {
        confirm("密码不得少于5个字符");
    }
    else {
        let data_send = {
            name: info[0],
            password: info[1],
        };
        fetch(`http://127.0.0.1:5000/${type}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_send),
        })
            .then(response => response.json())
            .then(data => {
                var data = data;
                switch (data.stautes) {
                    case 0:
                        localStorage.setItem("name", data_send.name)
                        window.location.href = "./htmls/chosePage.html"
                        break;
                    case -1:
                        confirm("密码错误")
                        break;
                    case -2:
                        confirm("请输入真实的姓名")
                        break;
                    case -3:
                        confirm("该用户已注册，请直接登录")
                        form_box.style.transform = 'translateX(0%)';
                        register_box.classList.add('hidden');
                        login_box.classList.remove('hidden');
                        login_input_boxs.forEach((e, i) => { e.value = info[i] })
                        break;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}