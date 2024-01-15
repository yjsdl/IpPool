const path = require('path');
module.exports = {
    mode: 'production',//指定用哪种模式编译，默认是production
    devtool: 'source-map',//用来控制生成那种粒度
    entry: './00_first/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}

// webpack ./00_first/index.js -o ./dist --mode=development