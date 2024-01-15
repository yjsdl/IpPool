//正常代码
// var a = 2;
// var b = 3;
// var c = a+b;
// return c;


//在虚拟机运行过程//
// var opcodes = new Array();
var opcodes = [10, 2, 10, 3, 11, 12];
var operand_stack=[];
var index=0;

function AA(){
    var A = opcodes[index++];
    operand_stack[operand_stack.length - 1] && (index=A);
}

while(index != opcodes.length){
    let opcode = opcodes[index++];
    let number;
    switch (opcode){
        case 10:
            number = opcodes[index++];
            operand_stack.push(number);
            break;
        case 11:
            let num1 = operand_stack.pop();
            let num2 = operand_stack.pop();
            let num3 = num1 + num2;
            operand_stack.push(num3);
            break;
        case 12:
            number = operand_stack.pop();
            console.log(number);
            return number;

    }
}
