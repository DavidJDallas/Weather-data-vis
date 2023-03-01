import HighlightCards from "./HighlightCards"
import { useMediaQuery } from "react-responsive"

const Highlights = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}) => {  

    const dailyWeatherData = weatherdata
    const hourlyWeatherData = weatherdata.hourly
    const temp = hourlyWeatherData.temperature_2m
    const apparentTemp = hourlyWeatherData.apparent_temperature
    const cloudCover = hourlyWeatherData.cloudcover
    const rain = hourlyWeatherData.rain  
    const time  = hourlyWeatherData.time
    const today = new Date()
    const date = today.getDate()
    const month = today.getMonth()   


    //The data given by the API is formatted inconveniently for my purposes of displaying specific cards, so below I create an array of objects which all have the relevant data for the card which is dispalyed for 24 hour (1 day) increments. 
 
   let arrOfWeatherObjects = []
    
   for(let i=0; i<120; i+=24){    
       
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

    if(isMobile && searchOn){
        return null
    }

    return(
        <>
        <h2>This week</h2>

        <div className="flexParent-Highlightcard">
        {arrOfWeatherObjects.map((card, index) => {

        return(<ul key={index}>
            <div className="flexChild-Highlightcard">
            <li id="highlightcard-list">
                <HighlightCards weatherdata={weatherdata} displayCelsius={displayCelsius} card={card} time={time}/> 
            </li>
            </div> </ul>
            )
        })}        
        </div>  
        </>
    )
}

export default Highlights