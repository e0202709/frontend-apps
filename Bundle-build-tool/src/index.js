import {camelCase} from "lodash"
import vars from "./style.scss"

console.log('TEST')
console.log(camelCase("hello world"));

console.log(vars.primaryColor)

window.addEventListener("load", function() {
    alert("It's loaded!");
    document.getElementsByTagName("body")[0].style.color = vars.primaryColor;
})