const MainCard = ({weatherdata}) => {

    const hourlyWeatherData = weatherdata.hourly
    const temp = hourlyWeatherData.temperature_2m
    const apparentTemp = hourlyWeatherData.apparent_temperature
    const cloudCover = hourlyWeatherData.cloudcover
    const rain = hourlyWeatherData.rain
    console.log(typeof hourlyWeatherData)

    


    return(
        <div>
        {hourlyWeatherData.map((data, index) =>{
            return<>

            <p>temp: {data.temp}</p>
            
        
            </>

        }   )}
    
  
    
    </div>
    )

}

export default MainCard