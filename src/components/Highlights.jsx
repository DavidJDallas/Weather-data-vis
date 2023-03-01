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
 
   let arrOfWeatherObjects = []
    {/* for loop below pushes to the assigned empty array just above, and creates a more suitable array of objects to map over. */}
   for(let i=0; i<120; i++){    
        if(i%24 ===0){
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
        <h2>This week</h2>

        <div className="flexParent-Highlightcard">
        {arrOfWeatherObjects.map((card, index) => {

            return(<ul key={index}>
             <div className="flexChild-Highlightcard">
                    
                <li>
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