import "../styling/SideMargin.css"

import {getWeatherData, getGeolocationByPlace, getGeolocationByPostcode, findWeather} from "../ApiFunctions"
import {useState, useEffect} from "react"
import SideMarginCard from "./SideMarginCard"
import SideMarginSearch from "./SideMarginSearch"
import ErrorHandler from "./ErrorHandler"
import SideMarginToggleSwitch from "./SideMarginToggleSwitch"


const SideMargin = ({displayCelsius, setDisplayCelsius, setWeatherData, weatherdata, setDisplayLocation, setDisplayPostcode}) => {

  

    const [postCode, setPostcode] = useState("")
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [place, setPlace] = useState("")    
    const [searchOn, setSearchOn] = useState(true)
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setError] = useState(null)  
    
   
  

    //Bug: app breaks if you don't change the postcode after re-setting it. Fixed by setting lat and long to null on the 'handlesearchagain' function. 

    useEffect(() => {
        if(lat && long){            
            getWeatherData()
        }
    }, [lat, long])

    const getWeatherData = async() => {   
        try{
            if(displayCelsius==true){
                const weatherData = await findWeather(lat, long, 'celsius')
                setWeatherData(weatherData.data) 
                setIsLoading(false)   
            } else if(displayCelsius==false){
                const weatherData = await findWeather(lat, long, 'fahrenheit')
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
        
        //When setting lat and long state, it is set but because it's done asynchronously, it hasn't set in time for when it gets called on line 28. Solved by using useEffect()             
    }    
    
    const geocodePlace =async() => {  
        try{
            const latitudeAndLongitude = await getGeolocationByPlace(place) 
            let latitude = latitudeAndLongitude[0].center[1]
            let longitude = latitudeAndLongitude[0].center[0]
            setLat(latitude)
            setLong(longitude)
            
        }  
        catch(error){
            setIsLoading(false)
            setError(error)
        }        
    }       
     
    const handleSubmitPostCode =  (event) => {
        
        setSearchOn(false)
        setIsLoading(true)
        setDisplayPostcode(postCode)
        geocodePostcode()       
        event.preventDefault()      
    }

    const handleSubmitPlace = (event) => {
        
        setSearchOn(false)
        setIsLoading(true)
        setDisplayLocation(place)
        geocodePlace()  
        event.preventDefault()    
    }

    const handleSearchAgain = (event) => {        
        setSearchOn(true)  
        setLat(null)
        setLong(null)      
    }

  
    if(error){
        return (<>
            <ErrorHandler error={error}/>           
            <form className="grid-item" id="place"onSubmit =            {handleSearchAgain}>
                <label></label>                   
                <button id = "searchbutton" type="submit">Search Again</button>
            </form>
            </>
        )
    }
    if (isLoading){
        return (
            <p> Loading...</p>
        )
    }  
    
    return(       
        <div className="container">  
            {searchOn ? (                   
                <>
                <SideMarginSearch setPostcode={setPostcode} handleSubmitPlace={handleSubmitPlace} handleSubmitPostCode={handleSubmitPostCode} setPlace={setPlace}/> 
                <SideMarginToggleSwitch displayCelsius={displayCelsius} setDisplayCelsius={setDisplayCelsius}/>  
                </>            
                ) : 
                <>                 
                <SideMarginCard displayCelsius={displayCelsius} weatherdata={weatherdata} handleSearchAgain={handleSearchAgain}/> 
                
                                      
                </>}


                   
            
            
            </div>  
            
            
    )
}

export default SideMargin