container = document.querySelector(".container")
display = document.querySelector(".display")


let op = "";
let string = "";

var i = 0;
var isComputed = false;

const operators = ["*", "-", "+", "/"]
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
                display.textContent = string;
            }

            break;
        case "division":
        case "multiply":
        case "minus":
        case "plus":   
            console.log(userInput);
            if (isOperatorIncluded(string))
            {
                string = evaluateExpr(e);
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
            if(!isOperatorIncluded(string) && isComputed)
                clearInput();
            string += userInput;
            // This technique is sloppy but works
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
    return operators.some((item) => str.includes(item))
}
function evaluateExpr(e)
{
    calc = new Calculator();
    result = calc.calculate(string)
    isComputed = true;
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
                return left
            

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
    isComputed = false;
}