import { useState } from 'react';
import './App.css';
import UI from './components/UI';

/* The `operators` array contains the mathematical operators that can be used in the calculator. These
operators are '+', '-', '/', '%', and '*'. */
const operators = ['+','-','/','%','*'];
/* The `buttonsData` array is an array of objects that represents the buttons on the calculator. Each
object in the array has three properties: */
const buttonsData= [
  {displayName: "AC", value: "AC", btnID : "ac_btn"},
  {displayName: "+/-", value: "+", btnID : "as_btn"},
  {displayName: "%", value: "%"},
  {displayName: "/", value: "/"},
  {displayName: "7", value: "7"},
  {displayName: "8", value: "8"},
  {displayName: "9", value: "9"},
  {displayName: "x", value: "*"},
  {displayName: "4", value: "4"},
  {displayName: "5", value: "5"},
  {displayName: "6", value: "6"},
  {displayName: "-", value: "-"},
  {displayName: "1", value: "1"},
  {displayName: "2", value: "2"},
  {displayName: "3", value: "3"},
  {displayName: "+", value: "+"},
  {displayName: "clr", value: "clr"},
  {displayName: "0", value: "0"},
  {displayName: ".", value: "."},
  {displayName: "=", value: "="},
  
]


//calculator initial state
/* The `const IS` is an object that represents the initial state of the calculator. It has the
following properties: */
const IS = {
  display : "",
  sum : 0,
  operand2 : null,
  operator : null,
  buttons : buttonsData,
  entered : false
}

function App() {
  const [state, setState] = useState(IS);

 /**
  * The function handles button clicks in a calculator, performing calculations based on the clicked
  * button and updating the display accordingly.
  * @param event - The `event` parameter represents the event object that triggered the function. It
  * can be used to access information about the event, such as the target element or any additional
  * data associated with the event.
  * @param value - The `value` parameter represents the value of the button that was clicked. It could
  * be a number, an operator, or a special button like "AC" or "CLR".
  * @param id - The `id` parameter is a string that represents the ID of the button that was clicked.
  * @returns The function does not explicitly return anything.
  */
  function handleClick(event, value, id ){

    let {sum, operand2, operator, display, entered} = state;
    // console.log(value, sum, operator, operand2, entered)
    if (id==='ac_btn'){
        setState(IS)
        return
    }
  
    /* This code block is checking if the clicked button value is one of the mathematical operators
    ('+', '-', '/', '%', '*'). */
    if (operators.includes(value)){
        operator = value;
        sum = parseFloat(display) ? parseFloat(display): sum;
        // display.innerText = '';
        setState(prev => {
          return {
            ...prev,
            display : value,
            sum : sum,
            operator: value
          }
        })
        //+/- button
        if (id==='as_btn'){
            if (value==='+'){
              setState(prev => {
                let buttons = prev.buttons;
                buttons = buttons.map(item => item.btnID === id ? {...item, value : "-"} : item);
                return {
                  ...prev,
                  buttons : buttons,
                  entered : false
                }
              })
            }else{
              setState(prev => {
                let buttons = prev.buttons;
                buttons = buttons.map(item => item.btnID === id ? {...item, value : "+"} : item);
                return {
                  ...prev,
                  buttons : buttons,
                  entered : false
                }
              })
            }
        }
        
    }
   /* This code block is executed when the user clicks on the "=" button, indicating that they want to
   perform an arithmetic operation. */
    else if (value ==='='){
        operand2 = !entered ? operand2 : parseFloat(display);
        if( isNaN(parseFloat(sum)) || !operator){
          return
        }
        var res = eval(sum+' '+operator+' '+ operand2);
        setState(prev => {
          return {
            ...prev,
            display : !isNaN(res) ? res : "",
            operand2: operand2,
            sum : !isNaN(res) ? res : sum,
            entered : false
          }
        })
  
    }/* The  block of code is executed when the user clicks on the "clr"
    button. It updates the `display` property of the state object to an empty string, effectively
    clearing the display on the calculator. */
     else if (value==='clr'){
        setState(prev => {
          return {
            ...prev,
            display : ""
          }
        })
    } /* This code block is executed when the user enters a number. It updates the display value by
    concatenating the current display value and the entered number. */
    else{
      setState(prev => {
        return {
          ...prev,
          display : (operators.includes(prev.display)? "" : prev.display) + value,
          entered : true
        }
      })
    }
  }

  return (
      <div id="calculator">
        <div id="name">
            <p>CALCULATOR</p>
        </div>
        <div id="display">
              <p className="bottom-right">{isNaN(parseFloat(state.display)) ? state.display : Number. isInteger(parseFloat(state.display)) ? parseFloat(state.display) : parseFloat(state.display).toFixed(3)}</p>
        </div>
        <UI handleClick={handleClick} buttons={state.buttons}/>
    </div>
  );
}

export default App;
