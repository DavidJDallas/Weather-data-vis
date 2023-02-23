import "../styling/SideMarginCard.css"
import { useState } from "react"

const SideMarginCard = ({displayCelsius, weatherdata, handleSearchAgain}) => {

   
    const hourlyWeatherData = weatherdata.hourly
    const currentTemp = hourlyWeatherData.temperature_2m[0]
    const currentApparentTemp = hourlyWeatherData.apparent_temperature[0]
    const currentCloudCover = hourlyWeatherData.cloudcover[0]
    const currentRain = hourlyWeatherData.rain[0]

   
    return( 

        <>
        <div className="SideMarginCard">
            
             {currentRain > 0 ?   
            <img id="weather-image"src={ require('../styling/icons/rain.png')} alt="rain"/>  : 
            currentCloudCover > 70 ? 
            <img id="weather-image"src={ require('../styling/icons/cloudy.png')} alt="clouds"/> :
            currentCloudCover <70 && currentCloudCover > 30 ?
            <img id="weather-image"src={ require('../styling/icons/cloudy-sun.png')} alt="clouds and sun"/>:
            currentCloudCover < 30 ? 
            <img id="weather-image"src={ require('../styling/icons/sunny.png')} alt="sun"/> : null}

            {displayCelsius == true ? <> <h3 id = "current-temp">{currentTemp}°C </h3>
            <br></br>

            <h3>Feels like: {currentApparentTemp} °C</h3>
            <br></br>
            
            </>
            :   <> 
            <h3 id = "current-temp">{currentTemp}°F </h3>
            <br></br>

            <h3>Feels like: {currentApparentTemp} °F</h3>
            <br></br>
            
            </>
            
            }
           
            <h3>Cloud cover: {currentCloudCover}%</h3>
            <br></br>
            <h3>Rain: {currentRain}mm</h3>
            <br>
            </br>

            <form className="grid-item" id="place"onSubmit = {handleSearchAgain}>
                    <label></label>                   
                    <button id = "searchbutton" type="submit">Search Again</button>
            </form>
           
           

        </div>
 
        </>

    )

}

export default SideMarginCard