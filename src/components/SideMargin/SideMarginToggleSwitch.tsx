import "../../styling/SideMarginToggleSwitch.css"
import * as React from 'react'
import { SideMarginToggleSwitchProps } from "../../Types/PropsTypes"

const SideMarginToggleSwitch = ({displayCelsius, setDisplayCelsius}: SideMarginToggleSwitchProps) => {
    return(   <>        
       { displayCelsius ? <h3> Celsius</h3>
            : <h3> Fahrenheit</h3>
            }
            <label onChange ={(event) => setDisplayCelsius(!displayCelsius)} className="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
            </label>   
    </> 
    )
}

export default SideMarginToggleSwitch