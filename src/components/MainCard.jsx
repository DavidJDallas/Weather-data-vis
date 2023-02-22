import "../styling/Main.css"

const MainCard = ({weatherdata}) => {

    
    
    const hourlyWeatherData = weatherdata.hourly
    const temp = hourlyWeatherData.temperature_2m
    const apparentTemp = hourlyWeatherData.apparent_temperature
    const cloudCover = hourlyWeatherData.cloudcover
    const rain = hourlyWeatherData.rain
    console.log(hourlyWeatherData)
    
 

   let arrOfWeatherObjects = []
    
   for(let i=0; i<10; i++){

    if(i%2 ==0){
         arrOfWeatherObjects.push(
           {
            temperature: temp[i],
            apparentTemperature: apparentTemp[i],
            cloudCoverPercentage: cloudCover[i],
            rainInMillimetres: rain[i]
           }
        )

    }
       
    }

    console.log(arrOfWeatherObjects)
    return(
        <div className="flexParent-Maincard">
       {arrOfWeatherObjects.map((card) => {
        return <>
        <div className="flexChild-Maincard">
            
            {card.rainInMillimetres > 0 ?   
           <img id="weather-image-main"src={ require('../styling/icons/rain.png')} alt="rain"/>  : 
           card.cloudCoverPercentage > 70 ? 
           <img id="weather-image-main"src={ require('../styling/icons/cloudy.png')} alt="clouds"/> :
           card.cloudCoverPercentage <70 && card.cloudCoverPercentage > 30 ?
           <img id="weather-image-main"src={ require('../styling/icons/cloudy-sun.png')} alt="clouds and sun"/>:
           card.cloudCoverPercentage < 30 ? 
           <img id="weather-image-main"src={ require('../styling/icons/sunny.png')} alt="sun"/> : null}

           <h3 id = "current-temp">{card.temperature}°C </h3>
           <br></br>

           <h3>Feels like: {card.apparentTemperature} °C</h3>
           <br></br>
           <h3>Cloud cover: {card.cloudCoverPercentage}%</h3>
           <br></br>
           <h3>Rain: {card.rainInMillimetres}mm</h3>
           <br>
           </br>

           
          
          

       </div>
        </>
        
        
        
           
        
       })}
    
    </div>
    )

}

export default MainCard