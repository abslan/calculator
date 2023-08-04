

/**
 * The Button component is a React component that renders a clickable div with a display name and
 * value, and calls a handleClick function when clicked.
 * @returns a JSX element.
 */
export default function Button({displayName, value, btnID, handleClick}){
    return (
        <div className="button" onClick={(e) => handleClick(e, value, btnID)}
        data-value={value} id={btnID? btnID: undefined}>
            <span>{displayName}</span>
        </div>
    )
}