module.exports = {
    // 入口文件
    entry: {
        index: __dirname + '/client/src/index.js',
        user: __dirname + '/client/src/user.js'
    },
    // 打包输出
    output: {
        path: __dirname + '/client/dist',
        filename: 'js/[name].js'
    },
    // 模块加载
    module: {
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude:/node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
                loader: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,// 图片大小 > limit 使用file-loader, 反之使用url-loader
                        outputPath: 'images/'// 指定打包后的图片位置
                    }
                }
            },
            {
                test: /\.js|.jsx$/,
                loader: 'babel-loader',
                exclude:/node_modules/
            }     
         ]
    }
}