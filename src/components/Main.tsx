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
    const [formattedDataBySeasons, setFormmatedDataBySeasons] = useState([])

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

        //Group data by year
        const dataByYearFunction = d3.group(modifiedData, (d) => d.time.getFullYear())

        const dataByMonthFunction = d3.group(modifiedData, (d) => d.time.getMonth())

        const arrOfGroupedObjectsByYear = Array.from(dataByYearFunction).map((element, i) => ({
            year: element[0],
            data: element[1]
        }))

        //Group data by month
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

        //Group data by season

        let seasonTranslator = {
            January: 'Winter',
            February: 'Winter',
            March: 'Spring',
            April: 'Spring',
            May: 'Spring',
            June: 'Summer',
            July: 'Summer',
            August: 'Summer',
            September: 'Autumn',
            October: 'Autumn',
            November: 'Autumn',
            December: 'Winter'
        }

        //create initial object

        let groupedBySeasonStep1 = arrOfGroupedObjectsByMonth.map((element) => ({
            season: seasonTranslator[element.month],
            data: element.data
        }))

        //group using d3, which creates a map, and then change this map into an array.

        let groupedBySeasonArr = Array.from(d3.group(groupedBySeasonStep1, d => d.season))

        //change into the final arr of objects. 

        let groupedBySeasonFin = groupedBySeasonArr.map((element) => ({
            season: element[0],
            data: element[1].flatMap((element) => element.data)
            }        
        ))
        

       setFormattedDataByYear(arrOfGroupedObjectsByYear)
       setFormattedDataByMonth(arrOfGroupedObjectsByMonth)
       setFormmatedDataBySeasons(groupedBySeasonFin)
       

    
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
        formattedDataBySeasons = {formattedDataBySeasons}
        width = {850}
        height={220}
        />
       </div>
         
        </>
    )
}

export default Main
