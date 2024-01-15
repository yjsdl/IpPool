import helloworld from "./helloworld";
const helloworldstr = helloworld()
function component() {
    const element = document.createElement("div");

    element.innerHTML = helloworldstr;

    return element;
}
document.body.appendChild(component());