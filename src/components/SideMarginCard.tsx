import { useMediaQuery } from "react-responsive"
import "../styling/SideMarginCard.css"
import * as React from 'react'
import { SideMarginCardProps } from "../Types"

const SideMarginCard = ({displayCelsius, weatherdata, handleSearchAgain, isMobile}: SideMarginCardProps) => {
       
    const hourlyWeatherData = weatherdata.hourly
    const currentTemp = hourlyWeatherData.temperature_2m[0]
    const currentApparentTemp = hourlyWeatherData.apparent_temperature[0]
    const currentCloudCover = hourlyWeatherData.cloudcover[0]
    const currentRain = hourlyWeatherData.rain[0]

  
    return( 
        <>
        <div className="SideMarginCard">
            {/* Line below displays currently if and only if user is on deskptop view*/}
            {!isMobile ? <h2>Currently</h2> : null}
            
            {/* Code below is to conditionally render the image depending on what weather data is received.*/}

             {currentRain > 0 ?   
            <img id="weather-image"src={ require('../styling/icons/rain.png')} alt="rain"/>  : 
            currentCloudCover > 70 ? 
            <img id="weather-image"src={ require('../styling/icons/cloudy.png')} alt="clouds"/> :
            currentCloudCover <70 && currentCloudCover > 30 ?
            <img id="weather-image"src={ require('../styling/icons/cloudy-sun.png')} alt="clouds and sun"/>:
            currentCloudCover < 30 ? 
            <img id="weather-image"src={ require('../styling/icons/sunny.png')} alt="sun"/> : null}

            {/* Code below conditionally renders depending on whether user wants to display in degrees F or degrees C*/}
            {displayCelsius === true ? <> <h3 id = "current-temp">{currentTemp}°C </h3>
            
            <h4>Feels like {currentApparentTemp} °C</h4>
                     
            </>
            :   <> 
            <h3 id = "current-temp">{currentTemp}°F </h3>
            
            <h4>Feels like {currentApparentTemp} °F</h4>
            <br></br>
            </>
            }
            {/* Code direclty below displays cloud cover data only if user is not in mobile mode.*/}
            {!isMobile ? <h4>Cloud cover<br></br> {currentCloudCover}%</h4> :  null}
            
            
            <h4>Rain: {currentRain}mm</h4>
            

            <form className="grid-item" id="place"onSubmit = {handleSearchAgain}>
                    <label></label>                   
                    <button id = "searchbutton" type="submit">Search Again</button>
            </form>          

        </div> 
        </>
    )
}

export default SideMarginCard