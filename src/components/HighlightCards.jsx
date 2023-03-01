import "../styling/HighlightCards.css"


const HighlightCards = ({weatherdata, displayCelsius, card, time}) => {

    return(<>               
        <h3>{card.time.slice(8, 10) + "." + (card.time.slice(5,7))}</h3>        

        {/* The code on the following lines is a conditional logic block which tells the programme which weather logo to use, depending on the data that the weather API gives us.*/}
                    
        {card.rainInMillimetres > 0 ?   
        <img id="weather-image-highlight"src={ require('../styling/icons/rain.png')} alt="rain"/>  
        : 
        card.cloudCoverPercentage >= 70 ? 
        <img id="weather-image-highlight"src={ require('../styling/icons/cloudy.png')} alt="clouds"/> :
        card.cloudCoverPercentage <70 && card.cloudCoverPercentage > 30 ?
        <img id="weather-image-highlight"src={ require('../styling/icons/cloudy-sun.png')} alt="clouds and sun"/>:
        card.cloudCoverPercentage <= 30 ? 
        <img id="weather-image-highlight"src={ require('../styling/icons/sunny.png')} alt="sun"/> 
        : 
        null}

        {/* The next few lines of code conditionally renders depending on whether or not the user has selected the display to be in degrees celsius or degrees fahrenheit.*/}

        {displayCelsius === true ?
        <>
        <h3 id = "current-temp">{card.temperature}°C </h3>
        <br></br>           
        </>
        : 
        <>
        <h3 id = "current-temp">{card.temperature}°F </h3>
        <br></br>                
        </>                
        }               
        </>    
    )
}


export default HighlightCards