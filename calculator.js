container = document.querySelector(".container")
display = document.querySelector(".display")


let op = "";
let string = "";
const operators = ["*", "-", "+", "/"]
var i = 0;


//TODO -> Clear trailing 0 from display
//TODO ->Add logic and swtch from a to op to b when user provides operator
//TODO -> evaluate expression when any of the operators is being provided

container.addEventListener("click", (e) =>
{
    userInput = e.target.textContent;
    classValue = e.target.classList.value;
    switch(e.target.id)
    {
        case "dot":
            addFloatSeparator(e)
            break;
        case "clear":
            clearInput(e);
            break;
        case "equal":
            if (isOperatorIncluded(string))
            {
                string = evaluateExpr(e);
                console.log(string);
                display.textContent = string;
            }

            break;
        case "division":
        case "multiply":
        case "minus":
        case "plus":   
            console.log("op was pressed") ;
            if (isOperatorIncluded(string))
            {
                console.log(string)
                string = evaluateExpr(e);
                console.log(string)
                display.textContent = string;
            }
            string += " " + userInput + " ";
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
            // This technique is sloppy ..
            console.log(string);
            if (isOperatorIncluded(string))
                display.innerHTML = string.split(" ")[2];
            else
                if(i == 0)
                    display.textContent = userInput;
                else
                    display.textContent += userInput;
            
            break;
        default:
            console.log("Do Nothing");
    
    };
    i++;

});


function isOperatorIncluded(str)
{
    console.log("Type of string is ", typeof(str))
    return operators.some((item) => str.includes(item))
}
function evaluateExpr(e)
{
    calc = new Calculator();
    result = calc.calculate(string)
    return result.toString()
}

function Calculator()
{
    this.calculate = function (str)
    {
        let input =  str.split(" ");
        left = parseFloat(input[0]);
        op = input[1];
        right = parseFloat(input[2]);
        if (isNaN(right))
        {
            console.log("Am i retruning>")
            return left
        }
         
        console.log("right member is: ", right)
        result = this.methods[op](left,right)

        if(result%1 == 0)
            return result
        return result.toFixed(6);

    };

    this.methods ={
        "+" : (a,b) => a+b,
        "-" : (a,b) => a-b,
        "/" : (a,b) => a/b,
        "*" : (a,b) => a*b,
        };

}


function addFloatSeparator(e)
{
    let input = string;
    if (input.includes("."))
        return
    display.textContent += e.target.textContent
}

function clearInput() {

    console.log(string);
    string = "";
    op = "";
    i = -1;
    display.innerHTML = "0";
}