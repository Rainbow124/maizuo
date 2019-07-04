const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const update = multer({
  dest: "./tmp"
});
const url = "mongodb://127.0.0.1:27017/maizuo";

//引入controller
const userController = require("./controllers/user");

//创建 express 实例
const server = express();

//连接数据库mongodb
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("链接数据成功 OK"); //eslint-disable-line
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
    console.log("链接数据失败 哭"); //eslint-disable-line
  });

//各种中间件的使用与配置
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static("public"));
server.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type");
  next();
});

// 路由的设置
server.post("/sign-up", userController.postSignUp);
server.post("/sign-in", userController.postSignIn);
server.post(
  "/user/profile",
  update.single("avatar"),
  userController.postUpdAvatar
);

//监听端口
server.listen(9090);
