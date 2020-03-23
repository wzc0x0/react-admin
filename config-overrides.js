const {
    override,
    fixBabelImports,
    addWebpackPlugin,
    addLessLoader,
    addWebpackAlias
} = require("customize-cra");
const path = require("path");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
    }),
    addLessLoader({
        javascriptEnabled: true
    }),
    addWebpackAlias({
        "@": path.resolve(__dirname, "./src/")
    }),
    addWebpackPlugin(new AntdDayjsWebpackPlugin())
);