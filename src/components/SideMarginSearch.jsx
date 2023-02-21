import "../styling/SideMargin.css"
import { useState } from "react"

const SideMarginSearch = ({setPostcode, handleSubmitPostCode, handleSubmitPlace, setPlace}) => {  

    //DESTRUCTURE PROPS! approx 3 hour bug-search trying to work out why setState wasn't being correctly passed down, and it's because props are passed down on an object and thus need to be correctly destructured.

    return(
    <>
        <form className="grid-item" id="postcode"onSubmit =           {handleSubmitPostCode}>
        
            <textarea className="text-area"onChange={(event) =>setPostcode(event.target.value)}></textarea>
            <button id = "searchbutton" type="submit">Search by postcode</button>
                
        </form> 

        <form className="grid-item" id="place"onSubmit = {handleSubmitPlace}>
                
            <textarea className="text-area" onChange={(event) => setPlace(event.target.value)}></textarea>
            <button id = "searchbutton" type="submit">Search by places</button>
                
        </form>
                
    </>
                
               
                

    
    
)

}


export default SideMarginSearch