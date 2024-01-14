// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
// });

// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/documentation/" : "/",
// };

const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "./docs"),
  publicPath:
    process.env.NODE_ENV !== "development" ? "/documentation/" : "/home",
});
