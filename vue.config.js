const webpack = require("webpack");
module.exports = {
  pwa: {
    iconPaths: {
        favicon32: 'favi.ico',
        favicon16: 'favi.ico',
        appleTouchIcon: 'favi.ico',
        maskIcon: 'favi.ico',
        msTileImage: 'favi.ico'
    }
  },
  publicPath: "./",
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
      // src下的文件夹
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
      },
    },
  },
};
