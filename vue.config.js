let path = require("path");
let outputDir = "dist/static";
module.exports = {
  publicPath: "./",
  outputDir: outputDir,
  lintOnSave: false,
  // pages: {
  //   index: {
  //     entry: "./src/main.js",
  //     template: `./public/index.html`,
  //     filename: "index.html"
  //   }
  // },
  devServer: {
    open: true,
    // host: "0.0.0.0",
    port: 8081,
    // contentBase: path.resolve(__dirname, "public"),
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://10.0.0.21:8080/CSC/",
        ws: false,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
       }
      },
      // '/img':{
      //    changeOrigin:true,
      //    secure:false,//https
      //    ws: false,
      //    target:'http://10.0.0.24:8080/CSC/',
      //    pathRewrite:{
      //      '^/img':''
      //    }
      // }
    }
    //before: app => {}
  },
  css: { 
    sourceMap: true,
    // sass-loader, use { sass: { ... } }
    // 配置css-loader
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/mainfont.scss";`
      }
    },
    // 是否为所有css或css预编译文件使用modules模式
    modules: false
  },

};
