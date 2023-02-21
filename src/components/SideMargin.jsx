import "../styling/SideMargin.css"

import {getWeatherData, getGeolocationByPlace, getGeolocationByPostcode, findWeather} from "../ApiFunctions"
import {useState, useEffect} from "react"
import SideMarginCard from "./SideMarginCard"
import SideMarginSearch from "./SideMarginSearch"


const SideMargin = () => {

    const [postCode, setPostcode] = useState("BS5 7US")
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [place, setPlace] = useState("")
    const [weatherdata, setWeatherData] =  useState(null)
    const [searchOn, setSearchOn] = useState(true)
    const [isLoading, setIsLoading] = useState(false)  
    
    

    useEffect(() => {
        if(lat && long){
            getWeatherData()
        }
    }, [lat, long])

    const getWeatherData = async() => {       
        const weatherData = await findWeather(lat, long)  
        setWeatherData(weatherData.data)  
        setIsLoading(false) 
    }

    const geocodePostcode = async() => {       
        const latitudeAndLongitude = await getGeolocationByPostcode(postCode)

        let latitude = latitudeAndLongitude[0].center[1]
        let longitude = latitudeAndLongitude[0].center[0]       

        setLat(latitude)
        setLong(longitude)   
        
        //When setting lat and long state, it is set but because it's done asynchronously, it hasn't set in time for when it gets called on line 28. Solved by using useEffect()             
    }   

    
    
    const geocodePlace =async() => {       
      const latitudeAndLongitude = await getGeolocationByPlace(place)
     
      let latitude = latitudeAndLongitude[0].center[1]
      let longitude = latitudeAndLongitude[0].center[0]
      setLat(latitude)
      setLong(longitude)
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