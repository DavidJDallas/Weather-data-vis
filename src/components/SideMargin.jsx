import "../styling/SideMargin.css"
import {getWeatherData, getGeolocationByPlace, getGeolocationByPostcode, findWeather} from "../ApiFunctions"
import {useState, useEffect} from "react"
import SideMarginCard from "./SideMarginCard"
import SideMarginSearch from "./SideMarginSearch"
import ErrorHandler from "./ErrorHandler"
import SideMarginToggleSwitch from "./SideMarginToggleSwitch"


const SideMargin = ({displayCelsius, setDisplayCelsius, setWeatherData, weatherdata, setDisplayLocation, setDisplayPostcode, searchOn, setSearchOn, isLoading, setIsLoading, setErrorInSearch, isMobile}) => {

    const [postCode, setPostcode] = useState("")
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [place, setPlace] = useState("")   
    const [error, setError] = useState(null)

    useEffect(() => {
            if(lat && long){            
                getWeatherData()
            }
        }, [lat, long])

    const getWeatherData = async() => {   
        try{
            if(displayCelsius===true){
                const weatherData = await findWeather(lat, long, 'celsius')
                setWeatherData(weatherData.data) 
                setIsLoading(false)   
            } else if(displayCelsius===false){
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

    const handleSubmitPlace = (event) => {        
        setSearchOn(false)
        setIsLoading(true)
        setDisplayLocation(place)
        setDisplayPostcode(null)
        geocodePlace()  
        event.preventDefault()    
    }

    const handleSearchAgain = (event) => {        
        setSearchOn(true)  
        setLat(null)
        setLong(null)
        setWeatherData(null)      
    }
  
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
                <SideMarginCard displayCelsius={displayCelsius} weatherdata={weatherdata} handleSearchAgain={handleSearchAgain} isMobile={isMobile}/> 
                                                      
                </>}            
            </div>         
            
    )
}

export default SideMargin