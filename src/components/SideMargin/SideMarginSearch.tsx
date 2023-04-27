import "../../styling/SideMargin.css"
import * as React from 'react'
import { SideMarginSearchProps } from "../../Types"

const SideMarginSearch = ({setPostcode, handleSubmitPostCode, handleSubmitPlace, setPlace}: SideMarginSearchProps) => {

    return(
    <>
        <form className="grid-item" id="postcode"onSubmit =     {handleSubmitPostCode}>
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