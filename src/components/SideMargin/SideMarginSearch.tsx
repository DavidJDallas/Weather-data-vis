import "../../styling/SideMargin.css"
import * as React from 'react'
import { SideMarginSearchProps } from "../../Types/PropsTypes"
import { Form, Button } from "react-bootstrap"

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
        {/* <form className="grid-item" id="postcode"onSubmit =     {handleSubmitPostCode}>
            <textarea 
            className="text-area" 
            onChange={(event) =>setPostcode(event.target.value)}
            onKeyDown ={handlePostcodeTextChange}           
            >
            </textarea>
            <button id = "searchbutton" type="submit">Search by postcode</button>
        </form>  */}

      <Form onSubmit = {handleSubmitPostCode}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{fontSize: '1.854rem'}}
        >Search By Postcode</Form.Label>
        <Form.Control type="postcode" placeholder="Enter Postcode" 
        onChange={(event) =>setPostcode(event.target.value)}
        onKeyDown ={handlePostcodeTextChange} 
        
        />     
      </Form.Group>
      
      </Form>

      

         <Form onSubmit = {handleSubmitPlace}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{fontSize: '1.854rem', textAlign: 'center'}}
        >Search By Place</Form.Label>
        <Form.Control type="place" placeholder="Enter Place" 
        onChange={(event) =>setPlace(event.target.value)}
        onKeyDown ={handlePlaceTextChange} 
        className=''
        />      
      </Form.Group>
      
      </Form>            
    </>
    )
}

export default SideMarginSearch