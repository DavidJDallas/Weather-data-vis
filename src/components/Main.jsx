import {useMediaQuery} from 'react-responsive'
import React from 'react'
import "../styling/Main.css"
import MainCard from "./MainCard"

const Main = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}) => { 
    
  
        const hourlyWeatherData = weatherdata.hourly
        const temp = hourlyWeatherData.temperature_2m
        const apparentTemp = hourlyWeatherData.apparent_temperature
        const cloudCover = hourlyWeatherData.cloudcover
        const rain = hourlyWeatherData.rain
        const time  = hourlyWeatherData.time
        const today = new Date()
        const hour = today.getHours()
    
        let arrOfWeatherObjects = []    

        //The data given by the API is formatted inconveniently for my purposes of displaying specific cards, so below I create an array of objects which all have the relevant data for the card which is dispalyed for 2 hour increments. 

        for(let i=0; i<10; i++){
            if(i%2 ===0){
            arrOfWeatherObjects.push(
                {
                    temperature: temp[i],
                    apparentTemperature: apparentTemp[i],
                    cloudCoverPercentage: cloudCover[i],
                    rainInMillimetres: rain[i],
                    time: time[i]
                }
                )
            }       
        }
        
   
    
    if(isMobile && searchOn){
        return null
    }

    return(
        <>    
        <h2>Today</h2>   
       
        <section className="container-Main-Display">
        {weatherdata && !searchOn && !errorInSearch ? 
        <div className="flexParent-Maincard">
            {arrOfWeatherObjects.map((card, index) => {
                return(<ul key={index}>
                    <div className="flexChild-Maincard">   
                    <li id='maincard-list'>
                        <MainCard  weatherdata={weatherdata} displayCelsius={displayCelsius} isMobile={isMobile} hour={hour} card={card}/>
                    </li>
                    </div>
                    </ul>
                    )
                })}
        </div>
         
        : 
        <h3>Please enter a location or postcode</h3>}
         </section> 
        
        </>
    )
}

export default Main
