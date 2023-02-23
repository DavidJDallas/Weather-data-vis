import "../styling/SideMarginToggleSwitch.css"

const SideMarginToggleSwitch = ({displayCelsius, setDisplayCelsius}) => {


    return(   <>
       { displayCelsius ? <p> displaying in degrees celsius</p>
            : <p> displaying in degrees farenheit</p>

            }
            <label onChange ={(event) => setDisplayCelsius(!displayCelsius)} class="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
            </label>
    
    
    </>
)
 

}

export default SideMarginToggleSwitch