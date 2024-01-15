// 将js源码转成语法树
var parser = require("@babel/parser");
// 为parser提供模板引擎
var template = require('@babel/template').default;
// 遍历ast节点
var traverse = require("@babel/traverse").default;
// 操作节点，判断节点类型，输出节点的值
var t = require('@babel/types');
// 将ast语法树转成源代码
var generator = require("@babel/generator").default;

// 读取源文件
var fs = require('fs');
var jscode = fs.readFileSync('F:\\mysubject\\AST\\01_ast_start\\00_demo1.js', {encoding:'utf-8'})
console.log('原始文件为：', jscode);

// 对原始文件进行操作，使用traverse遍历语法树，对节点进行处理
var ast = parser.parse(jscode);
var traverse_1 = {
    VariableDeclarator(path){
        var cur_node = path.node;
        // 修改变量值
        cur_node.init = t.stringLiteral('testtest');

    }
}
var traverse_2 = 

traverse(ast, traverse_1);
// 生成还原后的js文件
var ast_jscode = generator(ast)
console.log('还原后的js:', ast_jscode.code);