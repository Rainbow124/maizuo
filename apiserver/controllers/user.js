// 用户相关的控制器代码
const UserModel = require("../models/User");
const fs = require("fs");
const path = require("path");

/**
 * 修改用户头像
 * @param req
 * @param res
 */
const postUpdAvatar = (req, res) => {
  //  1.得到用户传递过来的文件，并做到移动 public 目录下操作
  // console.log(req.file);
  // 1.1 设置文件的名字
  let newFileName = new Date().getTime() + "_" + req.file.originalname;
  // 1.2  设置文件移动的路径
  let newPath = path.resolve(__dirname, "../public", newFileName);
  // 1.3 读文件
  let fileData = fs.readFileSync(req.file.path);
  // 1.4 写文件
  fs.writeFileSync(newPath, fileData);
  //  2. 将数据库中当前用户的头像更新了
  // 2.1 得到用户id
  let userId = req.body.userId;
  let newAvatar = `http://localhost:9090/${newFileName}`;
  //2.2 更新数据库
  UserModel.updateOne(
    {
      _id: userId
    },
    {
      avatar: newAvatar
    }
  )
    .then(data => {
      if (data.nModified > 0) {
        res.send({
          code: 0,
          msg: "更新头像成功",
          data: newAvatar
        });
      } else {
        res.send({
          code: -1,
          msg: "更新头像失败"
        });
      }
    })
    .catch(error => {
      res.send({
        code: -1,
        msg: error.message
      });
    });
};

/**
 * 注册
 * @param {Object} req
 * @param {Object} res
 */
const postSignUp = (req, res) => {
  //    1.检验参数信息
  //         2.创建用户
  const user = new UserModel(req.body);

  user
    .save()
    .then(() => {
      res.send({
        code: 0,
        msg: "ok"
      });
    })
    .catch(error => {
      res.send({
        code: -1,
        msg: error.message
      });
    });
};

/**
 * 登录
 * @param {Object} req
 * @param {Object} res
 */
const postSignIn = (req, res) => {
  //    1.检验参数信息
  //         2.检查这个用户是否存在
  UserModel.findOne(req.body)
    .then(data => {
      if (data) {
        res.send({
          code: 0,
          msg: "ok",
          data: {
            nickname: data.nickname,
            userId: data._id,
            avatar: data.avatar
          }
        });
      } else {
        res.send({
          code: -1,
          msg: "用户名或密码错误"
        });
      }
    })
    .catch(error => {
      res.send({
        code: -1,
        msg: error.message
      });
    });
};

module.exports = {
  postSignUp,
  postSignIn,
  postUpdAvatar
};
