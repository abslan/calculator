import Button from "./Button";

/* The code is defining a React functional component called `UI` that represents the user interface of
a calculator. */
/** Calculator UI */
export default function UI({buttons, handleClick}){
    return (
            <div id="buttons-container">
                {buttons.map((button) => 
                    <Button key={button.displayName}
                            displayName={button.displayName}
                            value ={button.value}
                            btnID = {button.btnID ? button.btnID : undefined}
                            handleClick = {handleClick}
                    />
                )}
            </div>
    )
}