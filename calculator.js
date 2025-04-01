container = document.querySelector(".container")
display = document.querySelector(".display")


let string = "";
var i = 0;
var isComputed = false;
const operators = ["*", "-", "+", "/"]

container.addEventListener("click", (e) =>
{
    userInput = e.target.textContent;
    switch(e.target.id)
    {
        case "percentage":
            addPercentage();
            //stringAddPercentage();
            break;
        case "plus-minus":
            plusMinus();
            break;
        case "dot":
            addFloatSeparator()
            break;
        case "clear":
            clearInput(e);
            break;
        case "equal":
            handleEqual(e);
            break;
        case "division":
        case "multiply":
        case "minus":
        case "plus":   
            handleOperator(e);
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
            handleNumber()
            break;
        case "backspace":
            handleBackspace();
            break;
        default:
            console.log("Do Nothing");
    };
    i++;
});

function handleBackspace()
{
    if(string.split(" ").length < 2)
    {
        display.textContent = string.slice(0,-1);
        string = string.slice(0,-1);
    }
    else
    {
        let input = string.split(" ")
        let a = input[0];
        let s = input[1];
        let b = input[2];

        res = b.slice(0,-1)
        display.textContent=res;
        string=a + " " + s + " " + res; 

    }



}
function handleNumber()
{
    if(!isOperatorIncluded(string) && isComputed)
        clearInput();
    string += userInput;
    // This technique is sloppy but works
    //console.log(string);
    if (isOperatorIncluded(string))
        display.innerHTML = string.split(" ")[2];
    else
        if(i == 0)
            display.textContent = userInput;
        else
            display.textContent += userInput;
    
}

function handleOperator(e)
{
       //console.log(userInput);
       if (isOperatorIncluded(string))
        {
            string = evaluateExpr(e);
            display.textContent = string;
        }
        string += " " + userInput + " ";
}
function handleEqual(e)
{
    if (isOperatorIncluded(string))
        {
            string = evaluateExpr(e);
            display.textContent = string;
        }
}

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

            if (right == 0 && op == "/")
                return "Nice Try"
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

function processStringPercentage(str)
{



    idx = str.indexOf(".");
    if (idx != -1)
    { 
        s = str.slice(0,idx);
        n = Math.min(s.length,2)
        // s1 = s.slice(0,-n) + "." + s.slice(-n) + string.slice(idx+1) //handles strings for n>=2
        // s2 = s.slice(0,-n) + ".0" + s.slice(-n) + string.slice(idx+1) //handles strings for n<2
        // res = n>q=2? s1 : s2;    
        res = s.slice(0,-n) + `${n>=2? "." : n==1? ".0" : ".00"}` + s.slice(-n) + str.slice(idx+1)
    }
    else 
        res = str.slice(0,-2) + `${str.length>=2? "." : str.length==1? ".0" : ".00"}` + str.slice(-2);
    return res
    
}

function stringAddPercentage()
{
    let startsWithMinus = false;

    if(string.split(" ").length <2)
    {
        if(string[0] == "-")
            startsWithMinus = true
    

        console.log(string, typeof(string)); 
        if(startsWithMinus) 
            {
                res = processStringPercentage(string.slice(1));
                display.textContent="-"+res;
                string= "-"+res;
            } 
            
        else
        {
            res = processStringPercentage(string);
            display.textContent=res;
            string= res;
        }
            
    }
    else
        {
            let input = string.split(" ");
            let a = input[0];
            let s = input[1];
            let b = input[2];

            if (b[0] == "-")
                startsWithMinus = true
            if (startsWithMinus)
                {res = processStringPercentage(b.slice(1));
                    display.textContent="-" + res;
                    string=a + " " + s + " " + "-"+ res; }
            else 
                {          res = processStringPercentage(b);
                    display.textContent=res;
                    string=a + " " + s + " " + res; }
  
        }

}

function addPercentage()
{
    //actually, this function is harder than it seems if you want to convert from strings.
    //the solutions are different depending on where the floating point is on the string
    if(string.split(" ").length<2)
    {
    num = parseFloat(string)
    console.log("Num is:",num); //lets do a little trick
    num /=100;
    res = num.toString();
    console.log("resulting string is:", res)
    display.textContent=res;
    string= res; 
    }
    else {
        let input = string.split(" ")
        let a = input[0];
        let s = input[1];
        let b = input[2];

        num = parseFloat(b);
        num /=100;
        res = num.toString();

        display.textContent=res;
        string=a + " " + s + " " + res; 
      
    }
}
function addFloatSeparator()
{

    if(!isOperatorIncluded(string)) // only left input
    {
        if (!string.includes("."))
        {
            display.textContent+=userInput;
            string+=userInput;
        }}
    else // second input
    {
        if(!string.split(" ")[2].includes("."))
        {
            display.textContent+=userInput;
            string+=userInput;
        } };
}

function clearInput() {

    string = "";
    i = -1;
    display.innerHTML = "0";
    isComputed = false;
}

function roundResult(num) {
    let remainder = num % 1
    if (remainder == 0)
        return num
    let text = remainder.toString().split(".")[1];

    idx = !text.includes("0")? 6 : text.search("0") > 6? 6: text.search("0");

    return num.toFixed(idx);

}

function plusMinus()
{
    if(!isOperatorIncluded(string.slice(1))) // only left input & we ignore first index
    {
        if (string[0] == "-")
            res = string.slice(1);
        else 
            res = "-" + string;

        display.textContent=res;
        string=res;   
        console.log("Plusminus", string, typeof(string));

}
    else // second input
    {
        let input = string.split(" ")
        let a = input[0];
        let s = input[1];
        let b = input[2];

    if (string[0] == "-")
         res = b.slice(1);

    else 
        res = "-" + b;

    display.textContent=res;
    string = a + " " + s + " " + res;
   

    };

}