import "../styling/Main.css"
import {useMediaQuery} from 'react-responsive'

const MainCard = ({weatherdata, displayCelsius, isMobile, card, hour}) => {    
    

    
    
    return(
        <>             
            
            {/* Lines 42-47 : time is conditionally rendered depending on whether it not it goes larger than 24. At 24, clock starts again at 01.00. */}
            <h3>{ 
            (hour + parseInt(card.time.slice(-4,-3))) > 24 ? 
            (hour + parseInt(card.time.slice(-4,-3))) - 24
            : 
            (hour + parseInt(card.time.slice(-4,-3)))
           }:00  </h3> 
            
            {/* Lines 49-56: Conditional rendering to get the logo to correspond to the correct weather data.*/}
            {card.rainInMillimetres > 0 ?   
           <img id="weather-image-main"src={ require('../styling/icons/rain.png')} alt="rain"/>  : 
           card.cloudCoverPercentage >= 70 ? 
           <img id="weather-image-main"src={ require('../styling/icons/cloudy.png')} alt="clouds"/> :
           card.cloudCoverPercentage <70 && card.cloudCoverPercentage >= 30 ?
           <img id="weather-image-main"src={ require('../styling/icons/cloudy-sun.png')} alt="clouds and sun"/>:
           card.cloudCoverPercentage < 30 ? 
           <img id="weather-image-main"src={ require('../styling/icons/sunny.png')} alt="sun"/> : null}
            
            {/*Lines 58-66: Conditional rendering depending on whether user wants to display in degrees F or degrees C*/}
           {displayCelsius ? 
           <>
           <h3 id = "current-temp">{card.temperature}°C </h3>           
           <h4>Feels like {card.apparentTemperature} °C</h4>  
           </>           
           : 
           <>
            <h3 id = "current-temp">{card.temperature}°F </h3>       
            <h4>Feels like: {card.apparentTemperature} °F</h4>        
           </>
           }           
           <h4>Cloud cover: {card.cloudCoverPercentage}%</h4>        
           <h4>Rain: {card.rainInMillimetres}mm</h4>   
       
       
          
       
    
       </>
    )
}

export default MainCard