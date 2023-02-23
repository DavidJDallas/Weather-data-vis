import "../styling/Header.css"
import "../styling/General.css"
import { useEffect } from "react"

const Header = ({ displayLocation, displayPostcode}) => {
   
    let postCodeCaps = ""
    let rectifiedLocation =  ""
    //Ensures that if user types postcode in anything other than all caps, the correct format of all caps is nonetheless displayed.

    if(displayPostcode){
       postCodeCaps = displayPostcode.toUpperCase()
    }

    //Ensures that if user types location in anything other than capital first letter and lowercase for the rest, the correct format is nonetheless displayed.

    if(displayLocation){
        rectifiedLocation = displayLocation[0].toUpperCase() + displayLocation.slice(1).toLowerCase()
    }    

    //UseEffect below ensures that the title that tells the user where they have searched for is updated every time the user searches for a different place. 

    useEffect(() => {

    }, [displayLocation, displayPostcode])    

    return(
        <section>   
        {rectifiedLocation ? <h1>{rectifiedLocation}</h1>: 
        postCodeCaps ? <h1>{postCodeCaps} </h1> :
        <h1> Weather</h1>
        }
        </section>
    )
}

export default Header