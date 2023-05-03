import "../../styling/SideMargin.css"
import {getGeolocationByPlace, getGeolocationByPostcode,  findHistoricalWeather} from "../../ApiFunctions"
import {useState, useEffect} from "react"

import SideMarginSearch from "./SideMarginSearch"
import ErrorHandler from "../ErrorHandler"
import SideMarginToggleSwitch from "./SideMarginToggleSwitch"
import * as React from 'react'
import { SideMarginProps } from "../../Types"

const SideMargin = ({displayCelsius, setDisplayCelsius, setWeatherData,  setDisplayLocation, setDisplayPostcode, searchOn, setSearchOn, isLoading, setIsLoading, setErrorInSearch}: SideMarginProps) => {

    const [postCode, setPostcode] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [place, setPlace] = useState('')   
    const [error, setError] = useState('')     
   
    useEffect(() => {
            if(lat && long){            
                getWeatherData()
            }
        }, [lat, long])

    const getWeatherData = async() => {   
        try{
            if(displayCelsius===true){
                const weatherData = await findHistoricalWeather(lat, long, 'celsius')
                setWeatherData(weatherData.data) 
                setIsLoading(false) 
               
            } else if(displayCelsius===false){
                const weatherData = await findHistoricalWeather(lat, long, 'fahrenheit')
                setWeatherData(weatherData.data) 
                setIsLoading(false)  
            }            
        }    
        catch{
            setIsLoading(false)
            setError(error)           
        }        
    }    

    const geocodePostcode = async() => {   
        try{            
            const latitudeAndLongitude = await getGeolocationByPostcode(postCode)         
            let latitude = latitudeAndLongitude[0].center[1]
            let longitude = latitudeAndLongitude[0].center[0]
            setLat(latitude)
            setLong(longitude)            
        }  
        catch (error){
            setIsLoading(false)
            setError(error)
        }                   
    }    
    
    const geocodePlace = async() => {  
        try{
            const latitudeAndLongitude = await getGeolocationByPlace(place) 
            let latitude = latitudeAndLongitude[0].center[1]
            let longitude = latitudeAndLongitude[0].center[0]
            console.log(latitude)
            setLat(latitude)
            setLong(longitude)            
        }  
        catch(error){
            setIsLoading(false)
            setError(error)            
        }        
    }       
     
    const handleSubmitPostCode =  (event: React.SyntheticEvent) => {
        //The code immediately below checks that the postcode entered is valid via the regex check below. Unfortunately this is needed since the geolocation API was returning data despite postcodes clearly not existing. 

        let postcodeRegEx = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/gm

        if(postcodeRegEx.test(postCode) === true){            
            setSearchOn(false)
            setIsLoading(true)
            setDisplayPostcode(postCode)
            setDisplayLocation(null)
            geocodePostcode()       
            event.preventDefault() 
        } else{
            setError("Invalid Postcode format. Please enter a valid format.")
        }            
    }

    const handleSubmitPlace = (event: React.SyntheticEvent) => {        
        setSearchOn(false)
        setIsLoading(true)
        setDisplayLocation(place)
        setDisplayPostcode(null)
        geocodePlace()  
        event.preventDefault()    
        //event.preventDefault() stops the default behaviour of a page. Here it's invoked to stop the page refreshing. 
    }

    const handleSearchAgain = (event: React.SyntheticEvent) => {        
        setSearchOn(true)  
        setLat(null)
        setLong(null)
        setWeatherData(null)      
    }
    console.log(place)
    console.log(postCode)
   
  
    if(error){
        setErrorInSearch(true)
        return (<>
            <ErrorHandler error={error}/>           
            <form className="grid-item" id="place"onSubmit = {handleSearchAgain}>
                <label></label>                   
                <button id = "searchbutton" type="submit">Search Again</button>
            </form>
            </>
        )
    }
    if (isLoading){
        return (
            <span className="loader"></span>
        )
    }  
    
    return(       
        <div className="container">
            {/*The code below conditionally renders either the search bar or the current temperature depending on whether or not the user has clicked the search button. Initially the search bar will be display, alongside the ability to toggle between celsisus and farenheit (SideMarginToggleSwitch). The conditionality is dependent on searchOn being true.*/}  
            {searchOn ? (                   
                <>
                <SideMarginSearch setPostcode={setPostcode} handleSubmitPlace={handleSubmitPlace} handleSubmitPostCode={handleSubmitPostCode} setPlace={setPlace}/> 
              
                <SideMarginToggleSwitch displayCelsius={displayCelsius} setDisplayCelsius={setDisplayCelsius}/>  
                </>            
                ) : 
                <>    
            <form className="grid-item" id="place"onSubmit = {handleSearchAgain}>
                <label></label>                   
                <button id = "searchbutton" type="submit">Search Again</button>
            </form>
               
                                                      
                </>}            
            </div>         
            
    )
}

export default SideMargin