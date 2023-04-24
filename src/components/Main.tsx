import * as React from 'react'
import "../styling/Main.css"
import MainCard from "./MainCard"
import { useState } from 'react'
import DataVisualisation from './DataVisualisation'
import {Hourly, WeatherObject, MainProps, Hourly_Units} from '../Types'

const Main = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}: MainProps) => { 
       
    const [viewData, setViewData] = useState(false);
    const hourlyWeatherData: Hourly = weatherdata.hourly
    const temp: number[] = hourlyWeatherData.temperature_2m
    const apparentTemp: number[] = hourlyWeatherData.apparent_temperature
    const cloudCover: number[] = hourlyWeatherData.cloudcover
    const rain: number[] = hourlyWeatherData.rain
    const time: string[]  = hourlyWeatherData.time
    const today: Date = new Date()
    const hour: number = today.getHours()
    
    let arrOfWeatherObjects: WeatherObject[] = []    

    //The data given by the API is formatted inconveniently for my purposes of displaying specific cards, so below I create an array of objects which all have the relevant data for the card which is dispalyed for 2 hour increments. 

    for(let i=0; i<10; i+=2){           
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

    const handleDataDisplay = () => {
        setViewData(true)
    }
    
    if(isMobile && searchOn){
        return null
    }

    return(
        <>    
        <h2>Today</h2>  

       
       
        <section className="container-Main-Display">
        {weatherdata && !searchOn && !errorInSearch && !viewData ? 
        
        <div className="flexParent-Maincard">

<form onSubmit = {handleDataDisplay}>
                    <label></label>                   
                    <button id = "searchbutton" type="submit">View as Data</button>
            </form>   
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
        : !viewData ?
        <h3>Please enter a location or postcode</h3>
        : <DataVisualisation weatherdata={weatherdata}/>
    
    
    }
        </section>         
        </>
    )
}

export default Main
