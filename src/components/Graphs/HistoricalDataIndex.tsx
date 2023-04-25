
import * as d3 from 'd3'
import { useState, useEffect, useRef } from 'react'
import * as React from 'react'
import DataVisualisation from '../DataVisualisation'
import { findHistoricalWeather } from '../../ApiFunctions'
import { HistoricalWeatherDataType, HistoricalData, DailyData } from '../../Types'

const HistoricalDataIndex = () => {

    const [historicalWeatherData, setHistoricalWeatherData] = useState<DailyData | object>({})
    const [lat, setLat] = useState('51.468985');
    const [long, setLong] = useState('-2.546166');
    const [place, setPlace] = useState(null)
    

    // useEffect(() => {
    //     const getHistoricalweatherData = async() => {
    //         try{
    //             const weatherData: HistoricalWeatherDataType = await findHistoricalWeather(lat, long)
    //             setHistoricalWeatherData(weatherData.data.daily)
           
    //         }
    //         catch(err){
    //             console.log(err)
    //         }
    //     }
    //     getHistoricalweatherData()
    // }, [lat, long])

    console.log(historicalWeatherData)

    return(<>
   <h1>Historical Data</h1>
        <br></br>
   <h2>The data that is visualised here goes back to April of 1945. The aim is to be able to show trends and patterns in weather over the last 80 or so years. </h2>

    
    </>
    )
}

export default HistoricalDataIndex