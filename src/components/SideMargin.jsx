import "../styling/SideMargin.css"
import "../styling/weather-icons.css"
import {getWeatherData, getGeolocationByPlace, getGeolocationByPostcode, findWeather} from "../ApiFunctions"
import {useState} from "react"

const SideMargin = () => {

    const [postCode, setPostcode] = useState("BS5 7US")
    const[lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [place, setPlace] = useState("")
    const [weatherdata, setWeatherData] =  useState("")


    const getWeatherData = async() => {
        const weatherData = await findWeather(lat, long)        
        setWeatherData(weatherData.data)     

      }

    const geocodePostcode = async() => {     
        const latitudeAndLongitude = await getGeolocationByPostcode(postCode)

        let latitude = latitudeAndLongitude[0].center[1]
        let longitude = latitudeAndLongitude[0].center[0]      

        setLat(latitude)
        setLong(longitude)    
          
    }
    
      

    
    
    const geocodePlace =async() => {
      const latitudeAndLongitude = await getGeolocationByPlace(place)
    
      return latitudeAndLongitude
    }
    
     
      
     
    const handleSubmitPostCode =  (event) => {
       
        geocodePostcode()
        getWeatherData()
        event.preventDefault()

         

    }

    
    return(
        <div id="maincontentsidebar">
           
        <form onSubmit = {handleSubmitPostCode}>

            <label></label>
            <textarea onChange={(event) => setPostcode(event.target.value)}></textarea>
            <button id = "searchbutton" type="submit">Search for places</button>

        </form>
           
       

        <div id="weather-icon"><i className="wi wi-day-snow"></i></div>

        </div>
    )
}

export default SideMargin