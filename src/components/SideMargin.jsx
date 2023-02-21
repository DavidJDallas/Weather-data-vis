import "../styling/SideMargin.css"

import {getWeatherData, getGeolocationByPlace, getGeolocationByPostcode, findWeather} from "../ApiFunctions"
import {useState, useEffect} from "react"
import SideMarginCard from "./SideMarginCard"
import SideMarginSearch from "./SideMarginSearch"
import ErrorHandler from "./ErrorHandler"


const SideMargin = ({setWeatherData, weatherdata}) => {

    const [postCode, setPostcode] = useState("")
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [place, setPlace] = useState("")    
    const [searchOn, setSearchOn] = useState(true)
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setError] = useState(null)  

    useEffect(() => {
        if(lat && long){
            getWeatherData()
        }
    }, [lat, long])

    const getWeatherData = async() => {   
        try{
            const weatherData = await findWeather(lat, long)  
            setWeatherData(weatherData.data)  
            setIsLoading(false)  
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
        geocodePostcode()       
        event.preventDefault()      
    }

    const handleSubmitPlace = (event) => {
        setSearchOn(false)
        setIsLoading(true)
        geocodePlace()  
        event.preventDefault()    
    }

    const handleSearchAgain = (event) => {        
        setSearchOn(true)        
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
                </>            
                ) : 
                <>                 
                <SideMarginCard weatherdata={weatherdata} handleSearchAgain={handleSearchAgain}/>                     
                </>                  
                }     
            </div>
    )
}

export default SideMargin