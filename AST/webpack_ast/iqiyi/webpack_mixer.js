const parser = require("@babel/parser");
const t = require("@babel/types");
const generator = require("@babel/generator");
const traverse = require("@babel/traverse").default;
const fs = require("fs");

function wtofile(path, flags, code) {
    var fd = fs.openSync(path,flags);
    fs.writeSync(fd, code);
    fs.closeSync(fd);
}

function run(loader_path, out_path, modular_path) {
    let js_code = fs.readFileSync(loader_path, {
        encoding: "utf-8"
    });

    // 转换为AST语法树
    let loader_ast = parser.parse(js_code);

    // 获取加载器代码
    let loader_body;
    if (loader_ast.program.body[0].expression.type === 'UnaryExpression'){
        loader_body = loader_ast.program.body[0].expression.argument.callee.body.body;
    }else{
        loader_body = loader_ast.program.body[0].expression.callee.body.body;
    }
    for (let i = 0; i < loader_body.length; i++){
        if (loader_body[i].type === 'VariableDeclaration'){
            let j = i + 1;
            while (j < loader_body.length){
                if (loader_body[j].type === 'VariableDeclaration'){
                    loader_body.splice(j, (loader_body.length - j));
                    loader_body.splice(0, i);
                    let tempname = '';
                    loader_body.forEach(function (item, index) {
                        if (item.type === 'FunctionDeclaration'){
                            tempname = item.id.name;
                        }
                    });
                    loader_body.push(t.assignmentExpression("=", t.identifier("export_function"), t.identifier(tempname)));
                }else {
                    j++;
                }
            }
            break;
        }
    }

    // 导入加载器中的函数体
    let loader_arguments;
    if (loader_ast.program.body[0].expression.type === 'UnaryExpression'){
        loader_arguments = loader_ast.program.body[0].expression.argument.arguments[0];
    }else{
        loader_arguments = loader_ast.program.body[0].expression.arguments[0];
    }
    if (loader_arguments.type === 'ArrayExpression'){
        let tempobjectexpression = t.objectExpression([]);
        loader_arguments.elements.forEach(function (item, index) {
            if (item && item.type === 'FunctionExpression'){
                tempobjectexpression.properties.push(t.objectProperty(
                    t.numericLiteral(index),
                    item,
                    false,
                    false
                ));
            }
        });
        loader_arguments = tempobjectexpression;
    }

    // 加载外部函数体
    modular_path.forEach(function (item, index) {

        var jscode = fs.readFileSync(item, {
            encoding: "utf-8"
        });

        let modular_ast = parser.parse(jscode);
        modular_ast.program.body[0].expression.arguments[0].elements.forEach(function (item2, index2) {
            if (item2.type === 'ArrayExpression'){
                item2.elements.forEach(function (item3, index3) {
                    if (item3 && item3.type === 'FunctionExpression'){
                        loader_arguments.properties.push(t.objectProperty(
                            t.numericLiteral(index3),
                            item3,
                            false,
                            false
                        ));
                    }
                });
            }else {
                item2.properties.forEach(function (item3, index3) {
                    loader_arguments.properties.push(item3)
                })
            }
        });
    });
    if (loader_ast.program.body[0].expression.type === 'UnaryExpression'){
        loader_ast.program.body[0].expression.argument.arguments[0] = loader_arguments;
    }else{
        loader_ast.program.body[0].expression.arguments[0] = loader_arguments;
    }

    // 申请全局导出函数
    loader_ast.program.body.splice(0, 0, t.variableDeclaration("var",[t.variableDeclarator(t.identifier("export_function"))]));
    // 导出函数
    loader_ast.program.body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.identifier("module"), t.identifier("exports"), false), t.identifier("export_function"))));



    let code = generator.default(loader_ast, {
        compact: false,  // 压缩格式
        comments: false,  // 注释
        jsescOption: {
            minimal: false // 转义
        }
    }).code;

    wtofile(out_path, 'w', code);
}

!function () {
    let loader_path, out_path;
    let modular_path = [];
    for(let i = 0; i < process.argv.length; i++){
        if (process.argv[i] === '-l'){
            loader_path = process.argv[i + 1];
            i += 1;
        }else if(process.argv[i] === '-m'){
            modular_path.push(process.argv[i + 1]);
            i += 1;
        }else if(process.argv[i] === '-o'){
            out_path = process.argv[i + 1];
            i += 1;
        }
    }
    if (loader_path && out_path){
        run(loader_path, out_path, modular_path)
    }
}();







