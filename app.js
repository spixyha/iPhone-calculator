const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".displayText");
const operations = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const minus = document.querySelector(".minus");
const percent = document.querySelector(".percent");
const dot = document.querySelector(".dot");

let valueMemory = [];
let operationMemory = "";
let typeOnClean = true;

function cleanMemory() {
    valueMemory = [];
    operationMemory = "";
}

numbers.forEach(number => number.addEventListener("click", e => {
    if (display.innerText.length < 6) {
        if (typeOnClean) {
            display.innerText = "";
            typeOnClean = false;
        }
        display.innerText += e.target.innerText;
    }
}))

operations.forEach(operation => operation.addEventListener("click", e => {
    if (operationMemory === "") {
        if (display.innerText.length > 5) { }
        valueMemory.push(Number(display.innerText));
        operationMemory = e.target.innerText;
        typeOnClean = true;
        e.target.classList.add("pressed");
    } else {
        operations.forEach(operation => operation.classList.remove("pressed"));
        operationMemory = "";
        e.target.classList.add("pressed");
        operationMemory = e.target.innerText;
    }
}))

equal.addEventListener("click", () => {
    if (valueMemory.length >= 1) {
        let result;
        valueMemory.push(Number(display.innerText))
        const [a, b] = valueMemory;
        switch (operationMemory) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "×":
                result = a * b;
                break;
            case "÷":
                result = a / b;
        }
        cleanMemory()
        display.innerText = "";
        typeOnClean = true;
        operations.forEach(operation => operation.classList.remove("pressed"));
        result.toString().length > 7 ? display.innerText = (Number(result.toString().slice(0, 7))) : display.innerText = (result);
    }
})

clear.addEventListener("click", () => {
    display.innerText = "0";
    cleanMemory();
    operations.forEach(operation => operation.classList.remove("pressed"));
    typeOnClean = true;
})

percent.addEventListener("click", () => {
    const result = parseInt(display.innerText) / 100;
    display.innerText = "";
    display.innerText = result;
    typeOnClean = true;
})

minus.addEventListener("click", () => {
    const result = parseInt("-" + display.innerText);
    display.innerText = "";
    display.innerText = result;
})

dot.addEventListener("click", () => {
    !display.innerText.includes(".") && display.append(".");
})