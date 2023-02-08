import "../styling/SideMargin.css"
import "../styling/weather-icons.css"
import {getWeatherData, getGeolocationByPlace, getGeolocationByPostcode, findWeather} from "../ApiFunctions"
import {useState, useEffect} from "react"
import {flushSync} from "react-dom"

const SideMargin = () => {

    const [postCode, setPostcode] = useState("BS5 7US")
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [place, setPlace] = useState("")
    const [weatherdata, setWeatherData] =  useState("")
    const [searchOn, setSearchOn] = useState(false)



    useEffect(() => {
        if(lat && long){
            getWeatherData()
        }
    }, [lat, long])

     
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
       
        geocodePostcode()
        // getWeatherData()
        event.preventDefault()      

    }

    const handleSubmitPlace = (event) => {


        geocodePlace()
  
        event.preventDefault()
        

    }

    
    return(
        <div class="grid-sideMargin">
            <div class="container">
           
                <form class="grid-item" id="postcode"onSubmit = {handleSubmitPostCode}>

                    <label></label>
                    <textarea class="text-area"onChange={(event) => setPostcode(event.target.value)}></textarea>
                    <button id = "searchbutton" type="submit">Search by postcode</button>

                </form>

                <form class="grid-item" id="place"onSubmit = {handleSubmitPlace}>

                    <label></label>
                    <textarea class="text-area" onChange={(event) => setPlace(event.target.value)}></textarea>
                    <button id = "searchbutton" type="submit">Search by places</button>

                </form>

                {/* <div class="grid-item"id="weather-icon"><i className="wi wi-day-snow"></i></div>     */}

            

            </div>
        </div>
    )
}

export default SideMargin