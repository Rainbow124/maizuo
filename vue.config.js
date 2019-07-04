const LessFunc = require("less-plugin-functions");

module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      less: {
        plugins: [new LessFunc()]
      }
    }
  }
};
