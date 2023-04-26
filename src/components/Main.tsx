import * as React from 'react'
import "../styling/Main.css"
import * as d3 from 'd3'
import { useState, useEffect } from 'react'
import DataVisualisation from './DataVisualisation'
import {MainProps} from '../Types'
import RainByYear from './Graphs/RainByYear'
import RainBySeason from './Graphs/RainBySeason'

const Main = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}: MainProps) => { 

    const [formattedDataByYear, setFormattedDataByYear] = useState([])
    const [formattedDataByMonth, setFormattedDataByMonth] = useState([])

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

        const dataByMonthFunction = d3.group(modifiedData, (d) => d.time.getMonth())

        console.log(Array.from(dataByMonthFunction))

        const arrOfGroupedObjectsByYear = Array.from(dataByYearFunction).map((element, i) => ({
            year: element[0],
            data: element[1]
        }))

        let numberToMonthTranslator = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        }


        let arrOfGroupedObjectsByMonth = Array.from(dataByMonthFunction)
        .map((element) => ({
            month: numberToMonthTranslator[element[0]],
            data: element[1]
        }))


       setFormattedDataByYear(arrOfGroupedObjectsByYear)
       setFormattedDataByMonth(arrOfGroupedObjectsByMonth)
       

    
    },[weatherdata])


    if(isMobile && searchOn){
        return null
    }


    return(
        <>    
         <h2>Data</h2> 
        <div className= 'h-100 w-100'>
        <RainByYear formattedDataByYear={formattedDataByYear} 

        width={850} 
        height={220} 
        />
        <RainBySeason 
        formattedDataByMonth = {formattedDataByMonth}
        width = {850}
        height={220}
        />
       </div>
         
        </>
    )
}

export default Main
