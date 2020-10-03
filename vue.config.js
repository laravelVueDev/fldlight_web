module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/test": {
        target: "https://sskslfdz49.execute-api.us-west-2.amazonaws.com/"
      },
      "/dev": {
        target: "https://3skr9kw2xe.execute-api.us-west-2.amazonaws.com/ "
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        sassOptions: {
          fiber: require("fibers")
        }
      },
      scss: {
        prependData: `@import "~@/assets/styles/_variables.scss"; @import "~@/assets/styles/_mixins.scss";`
      }
    }
  },
  pwa: {
    themeColor: "#B53647",
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon.png"
    }
  }
};
