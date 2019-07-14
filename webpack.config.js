const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: "production",
    entry: {
        markdown_it: './src/markdown_it.ts',
        gist: './src/gist.ts',
        // inject: './src/inject.ts',
        background: './src/background.ts',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    output: {
        path: path.resolve("dist"),
        filename: "[name].js",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/manifest.json" },
            { from: "./src/inject.js" },
        ])
    ],
};