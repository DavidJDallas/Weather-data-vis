import * as React from 'react'
import "../styling/Main.css"
import * as d3 from 'd3'
import { useState, useEffect } from 'react'
import DataVisualisation from './DataVisualisation'
import {MainProps} from '../Types'
import RainByYear from './Graphs/RainByYear'

const Main = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}: MainProps) => { 

    const [formattedData, setFormattedData] = useState([])

    //Suitable data object made for the charts. 

    useEffect(() => {
        const parsedTime = d3.timeParse('%Y-%m-%d');
        const dates = weatherdata.daily.time.map(parsedTime)

        let modifiedData = dates.map((date, i) => ({
                time : date,
                temperature_2m_max : weatherdata.daily.temperature_2m_max[i],
                temperature_2m_min: weatherdata.daily.temperature_2m_min[i],
                rain_sum: weatherdata.daily.rain_sum[i],
                windspeed_10m_max: weatherdata.daily.windspeed_10m_max[i]

            }))

        const dataByYearFunction = d3.group(modifiedData, (d) => d.time.getFullYear())

        const arrOfGroupedObjects = Array.from(dataByYearFunction).map((element, i) => ({
            year: element[0],
            data: element[1]

        }))

       setFormattedData(Array.from(arrOfGroupedObjects))
    
    },[weatherdata])


    if(isMobile && searchOn){
        return null
    }


    return(
        <>    
         <h2>The data that is visualised here goes back to April of 1945. The aim is to be able to show trends and patterns in weather over the last 80 or so years. </h2> 

        <RainByYear formattedData={formattedData} 
        width={700} 
        height={400} 
        />
       
         
        </>
    )
}

export default Main
