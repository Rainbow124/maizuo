// 用户相关的控制器代码
const UserModel = require("../models/User");

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
            username: data.username
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
  postSignIn
};
