let op = "";
let string = "";
container = document.querySelector(".container")
display = document.querySelector(".display")
const operators = ["*", "-", "+", "/"]



//TODO -> Clear trailing 0 from display
//TODO ->Add logic and swtch from a to op to b when user provides operator
//TODO -> evaluate expression when any of the operators is being provided


container.addEventListener("click", (e) =>
{
    userInput = e.target.textContent;
    classValue = e.target.classList.value;
    console.log(e.target.id);
    switch(e.target.id)
    {
        case "dot":
            addFloatSeparator(e)
            break;
        case "clear":
            clearInput(e);
            break;
        case "equal":
            evaluateExpr(e);
            break;
        case "division":
        case "multiply":
        case "minus":
        case "plus":
            string += " " + userInput + " ";
            // console.log("hey im not being called")
            break;
        case "zero":
        case "one":
        case "two":
        case "three":
        case "four":
        case "five":
        case "six":
        case "seven":
        case "eight":
        case "nine":
            string += userInput;
            // console.log(string.split(" "))
            if (operators.some((item) => string.includes(item)))
                display.innerHTML = string.split(" ")[2];
            else
            {
                display.textContent += userInput;
            }
        default:
            console.log("Do Nothing");

            // 

    }

});

function evaluateExpr(e)
{

}

function Calculator()
{
    this.calculate = function (str)
    {
        let input =  str.split(" ");
        left = parseFloat(input[0]);
        op = input[1];
        right = parseFloat(input[2]);
        this.left = methods[op](left,right)
        return String(this.left)
    };

    this.methods ={
        "+" : (a,b) => a+b,
        "-" : (a,b) => a-b,
        "/" : (a,b) => a/b,
        "*" : (a,b) => a*b,
        };

    this.addMethod = function (operator, callback) {
        thismethods[operator] = callback; }
    this.printMethods = () => Object.entries(methods).flat()
}


function addFloatSeparator(e)
{
    let input = display.textContent
    console.log(typeof(input));
    if (input.includes("."))
        return
    display.textContent += e.target.textContent
}

function clearInput() {

    console.log(string);
    string = "";
    op = "";
    display.innerHTML = "0";
}