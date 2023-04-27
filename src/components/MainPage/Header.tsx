import "../../styling/Header.css"
import "../../styling/General.css"
import { useEffect } from "react"
import * as React from 'react'

const Header = ({ displayLocation, displayPostcode, errorInSearch, searchOn}) => {
   
    let postCodeCaps: string
    let rectifiedLocation: string   
    //Below ensures that if user types postcode in anything other than all caps, the correct format of all caps is nonetheless displayed.
    if(displayPostcode){
       postCodeCaps = displayPostcode.toUpperCase()
    }

    //Below ensures that if user types location in anything other than capital first letter and lowercase for the rest, the correct format is nonetheless displayed.
    if(displayLocation){
        rectifiedLocation = displayLocation[0].toUpperCase() + displayLocation.slice(1).toLowerCase()
    }    

    //UseEffect below ensures that the title that tells the user where they have searched for is updated every time the user searches for a different place. 
    useEffect(() => {
        
    }, [displayLocation, displayPostcode]) 
    
   
    return(
        <section>   
        {displayLocation && !errorInSearch && !searchOn ? <h1 >{rectifiedLocation}</h1>: 
        displayPostcode && !errorInSearch && !searchOn ? <h1>{postCodeCaps} </h1> :
        <h1> Historical Weather Data</h1>
        }
        </section>
    )
}

export default Header