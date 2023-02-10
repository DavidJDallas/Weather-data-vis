import "../styling/SideMarginCard.css"
import { useState } from "react"

const SideMarginCard = (weatherdata) => {

    const hourlyWeatherData = weatherdata.weatherdata.hourly
    const currentTemp = hourlyWeatherData.temperature_2m[0]
    const currentApparentTemp = hourlyWeatherData.apparent_temperature[0]
    const currentCloudCover = hourlyWeatherData.cloudcover[0]
    const currentRain = hourlyWeatherData.rain[0]

    const [rain, setRain] = useState(false)
    const [sunDay, setSunDay] = useState(false)
    const [sunNight, setSunNight] = useState(false)
    const [cloudy, setCloudy] = useState(false)


    return(

        <>
        <div className="SideMarginCard">

            <h3>Current Temperature: {currentTemp}</h3>
            <br></br>

            <h3>Feels like: {currentApparentTemp}</h3>
            <br></br>
            <h3>Cloud cover: {currentCloudCover}%</h3>
            <br></br>
            <h3>Rain: {currentRain}mm</h3>
        
            <img id="weather-image"src={ require('../styling/icons/rain.png')} alt="picture of rain"/> 

        </div>
 
        </>

    )

}

export default SideMarginCard