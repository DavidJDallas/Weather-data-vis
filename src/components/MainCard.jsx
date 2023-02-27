import "../styling/Main.css"

const MainCard = ({weatherdata, displayCelsius}) => {    
    
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
   
    
    return(
        <div className="flexParent-Maincard">
       {arrOfWeatherObjects.map((card) => {
        return <>
        <div className="flexChild-Maincard">
            
            <h4>{hour + parseInt(card.time.slice(-4,-3))}:00 </h4>
            
            {card.rainInMillimetres > 0 ?   
           <img id="weather-image-main"src={ require('../styling/icons/rain.png')} alt="rain"/>  : 
           card.cloudCoverPercentage > 70 ? 
           <img id="weather-image-main"src={ require('../styling/icons/cloudy.png')} alt="clouds"/> :
           card.cloudCoverPercentage <70 && card.cloudCoverPercentage > 30 ?
           <img id="weather-image-main"src={ require('../styling/icons/cloudy-sun.png')} alt="clouds and sun"/>:
           card.cloudCoverPercentage < 30 ? 
           <img id="weather-image-main"src={ require('../styling/icons/sunny.png')} alt="sun"/> : null}

           {displayCelsius === true ? 
           <>
           <h3 id = "current-temp">{card.temperature}°C </h3>
           <br></br>

           <h4>Feels like {card.apparentTemperature} °C</h4>
           <br></br>
           </>           
           : 
           <>
            <h3 id = "current-temp">{card.temperature}°F </h3>
           <br></br>

           <h4>Feels like: {card.apparentTemperature} °F</h4>
           <br></br>
           </>
           }

           
           <h4>Cloud cover: {card.cloudCoverPercentage}%</h4>
           <br></br>
           <h4>Rain: {card.rainInMillimetres}mm</h4>
           <br>
           </br> 
          

       </div>
        </>    
       })}
    
    </div>
    )

}

export default MainCard