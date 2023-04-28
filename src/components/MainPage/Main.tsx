import * as React from 'react';
import "../../styling/Main.css";
import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import {FormattedDataByMonth, FormattedDataByYear, MainProps, FormattedDataBySeasons} from '../../Types';
import {Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import RainIndex from '../Graphs/Rain/RainIndex';
import TemperatureIndex from '../Graphs/Temperature/TemperatureIndex';
import WindIndex from '../Graphs/Wind/Windindex';
import {Container, Row, Col} from 'react-bootstrap';

const Main = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}: MainProps) => { 

    const [formattedDataByYear, setFormattedDataByYear] = useState<FormattedDataByYear[]>([])
    const [formattedDataByMonth, setFormattedDataByMonth] = useState<FormattedDataByMonth[]>([])
    const [formattedDataBySeasons, setFormmatedDataBySeasons] = useState<FormattedDataBySeasons[]>([])


    //**Suitable data object made for the charts**.// 

    useEffect((): void => {
        const parsedTime = d3.timeParse('%Y-%m-%d');
        const dates: Date[] = weatherdata.daily.time.map(parsedTime)

        let modifiedData = dates.map((date, i) => ({
                time : date,
                temperature_2m_max : weatherdata.daily.temperature_2m_max[i],
                temperature_2m_min: weatherdata.daily.temperature_2m_min[i],
                rain_sum: weatherdata.daily.rain_sum[i],
                windspeed_10m_max: weatherdata.daily.windspeed_10m_max[i]

            }))

        //1. Group data by year
        const dataByYearFunction = d3.group(modifiedData, (d) => d.time.getFullYear())

        const dataByMonthFunction = d3.group(modifiedData, (d) => d.time.getMonth())

        const arrOfGroupedObjectsByYear = Array.from(dataByYearFunction).map((element, i) => ({
            year: element[0],
            data: element[1]
        }))

        //2. Group data by month
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

        //3. Group data by season

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

        //3i.create initial object

        let groupedBySeasonStep1 = arrOfGroupedObjectsByMonth.map((element) => ({
            season: seasonTranslator[element.month],
            data: element.data
        }))

        //3ii. Group using d3, which creates a map, and then change this map into an array.

        let groupedBySeasonArr = Array.from(d3.group(groupedBySeasonStep1, d => d.season))

        //3iii. Change into the final arr of objects. 

        let groupedBySeasonFin = groupedBySeasonArr.map((element) => ({
            season: element[0],
            data: element[1].flatMap((element) => element.data)
            }        
        ))
        
        //4. Set relevant states

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
            <Container>
                <Row style={{height: '40px'}}>
                    <NavBar/> 
                </Row>
                <Row>
                    <Routes>
                                    
                        <Route path='/rain' 
                            element={<RainIndex 
                            formattedDataByMonth={formattedDataByMonth} formattedDataBySeasons={formattedDataBySeasons} formattedDataByYear={formattedDataByYear}/>}                                    />                
                        <Route path = '/Temperature' 
                            element={<TemperatureIndex                          formattedDataByMonth={formattedDataByMonth} formattedDataBySeasons={formattedDataBySeasons} formattedDataByYear={formattedDataByYear}/>}
                                    />
                        <Route path= '/wind' element={<WindIndex/>}/>

                    </Routes> 
                </Row>
          
            </Container>
         
       </div>         
        </>
    )
}

export default Main
