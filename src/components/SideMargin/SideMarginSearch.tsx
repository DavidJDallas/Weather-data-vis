import "../../styling/SideMargin.css"
import * as React from 'react'
import { SideMarginSearchProps } from "../../Types/PropsTypes"

const SideMarginSearch = ({setPostcode, handleSubmitPostCode, handleSubmitPlace, setPlace}: SideMarginSearchProps) => {

    const handlePlaceTextChange = (event) => {
        if (event.keyCode === 13 || event.which === 13){
            event.preventDefault()
            handleSubmitPlace(event)
        }      
    };
    const handlePostcodeTextChange = (event) => {
        if(event.keyCode === 13 || event.which === 13){
            event.preventDefault()
            handleSubmitPostCode(event)
        } 
    };

    return(
    <>
        <form className="grid-item" id="postcode"onSubmit =     {handleSubmitPostCode}>
            <textarea 
            className="text-area" 
            onChange={(event) =>setPostcode(event.target.value)}
            onKeyDown ={handlePostcodeTextChange}           
            >
            </textarea>
            <button id = "searchbutton" type="submit">Search by postcode</button>
        </form> 

        <form className="grid-item" id="place" onSubmit = {handleSubmitPlace}>                
            <textarea className="text-area" 
            onChange = {(event) => setPlace (event.target.value)}
             onKeyDown={handlePlaceTextChange}         
             >
            </textarea>
            <button id = "searchbutton" type="submit">Search by places</button>                
        </form>                
    </>
    )
}

export default SideMarginSearch