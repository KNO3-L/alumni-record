from flask import Flask,Response,request,jsonify
import json
import os

app=Flask(__name__)

with open("../accounts/accontList.txt","r") as f:
    accountList = f.readlines()

@app.route("/login",methods=["POST","OPTIONS"])
def login():
    """

    0 : Success
    -1: Password Error
    -2: Account Error

    """
    resp = Response()
    if request.method == "POST":
        resp.headers["Access-Control-Allow-Origin"] = "*"
        data = request.json

        body = {"stautes": None}

        try:
            with open(f"../accounts/{data['name']}.json","r") as f:
                if json.loads("".join(f.readlines()))['password'] == data['password']:
                    body["stautes"] = 0
                else:
                    body["stautes"] = -1
        except:
            body["stautes"] = -2
        
        resp.data = json.dumps(body)

    # 处理 options 请求
    elif request.method == "OPTIONS":
        # 设置响应头
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"

    return resp


@app.route("/register",methods=["POST","OPTIONS"])
def register():
    """

    0 : Success
    -1: Password Error
    -2: Account Error
    -3: Already Registered

    """

    resp = Response()
    if request.method == "POST":
        resp.headers["Access-Control-Allow-Origin"] = "*"
        data = request.json
        accounts = os.listdir("../accounts")
        print(accounts)

        body = {"stautes": None}
        
        if data['name']+"\n" in accountList:
            if data['name']+".json" in accounts:
                body["stautes"] = -3
            else:
                with open(f"../accounts/{data['name']}.json","w") as f:
                    f.write(json.dumps(data))
                body["stautes"] = 0

        else:
            body["stautes"] = -2

        resp.data = json.dumps(body)
    # 处理 options 请求
    elif request.method == "OPTIONS":
        # 设置响应头
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"

    return resp

@app.route("/save_img",methods=["POST","OPTIONS"])
def save_img():
    """
    """
    resp = Response()
    if request.method == "POST":
        resp.headers["Access-Control-Allow-Origin"] = "*"

        image = request.files["image"]
        username = image.filename.split(".")[0]
        background_images = os.listdir("../images/background-images/accounts-background-images")
        for i in background_images:
            if username in i:
                os.remove("../images/background-images/accounts-background-images/"+i)
        image.save(f"../images/background-images/accounts-background-images/{image.filename}")

        body = {"stautes": 0}

        resp.data = json.dumps(body)

    # 处理 options 请求
    elif request.method == "OPTIONS":
        # 设置响应头
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"

    return resp

@app.route("/save_msg",methods=["POST","OPTIONS"])
def save_msg():
    """
    """
    resp = Response()
    if request.method == "POST":
        resp.headers["Access-Control-Allow-Origin"] = "*"

        # image = request.files["image"]
        # username = image.filename.split(".")[0]
        # background_images = os.listdir("../images/background-images/accounts-background-images")
        # for i in background_images:
        #     if username in i:
        #         os.remove("../images/background-images/accounts-background-images/"+i)
        # image.save(f"../images/background-images/accounts-background-images/{image.filename}")
        # print(request.get_json())

        body = {"stautes": 0}

        resp.data = json.dumps(body)

    # 处理 options 请求
    elif request.method == "OPTIONS":
        # 设置响应头
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"

    return resp

if __name__ == "__main__":
    app.run(debug=True)