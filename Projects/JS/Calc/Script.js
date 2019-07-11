var isSecond=0;
var firstNumber=0.0;
var secondNumber=0.0;
var operationNumber=0;
var operationResult=0;
var hasDot=false;
var doubleClicked=false;
var plusminusNumber=0;

function Resetter(){    //Resets all variables.
    isSecond=0;
    firstNumber=0;
    secondNumber=0;
    operationNumber=0;
    operationResult=0;
    hasDot=false;
}
      
function NumberResetter(){   //Resets all after beginning a new operation.
    doubleClicked=false;
    if(operationNumber==4){
        document.getElementById('result').value='';    
            Float.hasDot=0;
            Resetter();
        }
}

function IfFirstChecker(){  //Prevents OperationExecute() from overriding firstNumber on first iteration.
    hasDot=false;           //Also resets hasDot.
    if(isSecond!=0&&doubleClicked==false){
        OperationExecute();
    }
}

function OperationMachine(){ //Heart of the calculator.
    if(isSecond==1||isSecond==2){   //Cleans the input after pressing an operation key.
        isSecond=2;
        if(operationNumber!=4){
            document.getElementById('result').value='';
        }
    }
    if(isSecond==0){    //Activates on first iteration, gets firstNumber.
        if(firstNumber==0){
            firstNumber=parseFloat(document.getElementById('result').value);
        }
        document.getElementById('result').value='';
        isSecond=1;
    }
}

function OperationExecute(){    //Math goes in here.
secondNumber=parseFloat(document.getElementById('result').value);
    switch(operationNumber){
        case 0://Divide
            document.getElementById('result').value=firstNumber/secondNumber;
            firstNumber/=secondNumber;
            if(isSecond==2){
                document.getElementById('result').value=firstNumber;
            }
            break;
        case 1://Multiply
            document.getElementById('result').value=firstNumber*secondNumber;
            firstNumber*=secondNumber;
            if(isSecond==2){
                document.getElementById('result').value=firstNumber;
            }
            break;
        case 2://Subtract
            document.getElementById('result').value=firstNumber-secondNumber;
            firstNumber-=secondNumber;
            if(isSecond==2){
                document.getElementById('result').value=firstNumber;
            }
            break;
        case 3://Add
            document.getElementById('result').value=firstNumber+secondNumber;
            firstNumber+=secondNumber;
            if(isSecond==2){
                document.getElementById('result').value=firstNumber;
            }
                break;
        case 4://Execute
            document.getElementById('result').value=firstNumber;
            break;
    }
}

function PlusMinus(){
    plusminusNumber=parseFloat(document.getElementById('result').value);
    if (plusminusNumber>0||plusminusNumber<0)
    {
        plusminusNumber=-plusminusNumber;
        document.getElementById('result').value=plusminusNumber;
    }
}

function Float(){
    firstNumber=parseFloat(document.getElementById('result').value);
    if (hasDot==false)
    {
        if(firstNumber>=0||firstNumber<=0)
            document.getElementById('result').value+='.';
        else{
            document.getElementById('result').value+='0';
            document.getElementById('result').value+='.';
        }
        hasDot=true;
        firstNumber=0;
    }
}

    //Button listener part is below.

var i=0;
var buttons = document.querySelectorAll("[data-button]");
for (i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click', ButtonSwitcher);
}


function ButtonSwitcher(){ 
    var buttonNumber = this.getAttribute("data-button")
    switch(buttonNumber){
        case '1':
            NumberResetter(); 
            document.getElementById('result').value+=1;
            break;
        case '2':
            NumberResetter(); 
            document.getElementById('result').value+=2;
            break;
        case '3':
            NumberResetter();
            document.getElementById('result').value+=3;
            break;
        case '4':
            NumberResetter();
            document.getElementById('result').value+=4;
            break;
        case '5':
            NumberResetter();
            document.getElementById('result').value+=5;
            break;
        case '6':
            NumberResetter();
            document.getElementById('result').value+=6;
            break;
        case '7':
            NumberResetter();
            document.getElementById('result').value+=7;
            break;
        case '8':
            NumberResetter();
            document.getElementById('result').value+=8;
            break;
        case '9':
            NumberResetter();
            document.getElementById('result').value+=9;
            break;
        case '0':
            NumberResetter();
            document.getElementById('result').value+=0;
            break;
        case 'C':
            Resetter(); 
            document.getElementById('result').value='';
            break;
        case '=':
            OperationExecute(); 
            operationNumber=4; 
            OperationMachine(); 
            isSecond=0;
            break;
        case '/':
            IfFirstChecker(); 
            operationNumber=0; 
            OperationMachine();
            doubleClicked=true;
            break;
        case 'X':
            IfFirstChecker(); 
            operationNumber=1;
            OperationMachine();
            doubleClicked=true;
            break;
        case '-':
            IfFirstChecker(); 
            operationNumber=2; 
            OperationMachine();
            doubleClicked=true;
            break;
        case '+':
            IfFirstChecker(); 
            operationNumber=3; 
            OperationMachine();
            doubleClicked=true;
            break;
        case '.':
            NumberResetter();
            Float();
        break;
        case '±':
            PlusMinus();
            break;
        default:
        return 0;
    }
}