//创建webpack.config.js
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const __dirname = path.resolve()

console.log('----', __dirname)
export default {
    //入口文件
    entry: './src/index.js',
    mode:'development',
    devtool:'inline-source-map',
    output: {
        //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径 
         //输出位置
        path: path.join(__dirname, './dist'),
         //输出文件的文件名配置,
        filename: 'build.js',
        // 每次输出清理输出文件夹；
        clean: true,
        // 静态资源的导出规则；
        // 需要module配置配合；
        assetModuleFilename:'images/[cotenthash][ext]'
    },
    module: {
        // loaders: [
        //     {
        //         test: /\.css$/,//支持正则
        //         loader: 'style-loader!css-loader'
        //     }
        // ]
        rules:[
            //静态资源的打包；asset/ resource: 打包到文件 asset/inline:编译成base64; asset/source:资源的源代码； 
            // asset：通用自动加载；默认8K为临界点,自定义设置：
            // parser：{
            //     dataUrlCondition:{
            //         maxSize: 4 * 1024 * 1024
            //     }
            // }
            {
                test: /\.png$/,
                type:'asset/resource',
                // generator配置的优先级比output优先级高
                generator:{
                    filename:'imgaes/[contenthash][ext]'
                }
            }
        ]
    },
    //其他解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.css', '.scss']//添加在此的后缀所对应的文件可以省略后缀
    },
    //插件
    plugins: [
        new webpack.BannerPlugin('This file is created by ly'),
        // doc: https://webpackjs.com/plugins/html-webpack-plugin/；
        // 自动把script文件注入到html文件中；
        new HtmlWebpackPlugin({
            inject:true,
            filename:'template.html',
            template:'./demo/index.html'
        })
    ],
    // 本地开发服务器，监测变化，自动编译，自动刷新浏览器；
    devServer:{
        static:'./demo'
    }

}