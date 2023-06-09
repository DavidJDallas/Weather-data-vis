import * as React from 'react'
import {Form} from 'react-bootstrap/'
import { useContext} from 'react'
import {YearContext} from '../../../Context'
import {YearContextType} from '../../../Types/ContextTypes'
import '../../../styling/Range-Slider.css'




const RangeSlider = () => {   

   const {yearValue, setYearValue} = useContext<YearContextType>(YearContext)

    let years = [];
    for (let i = 1945; i <= 2023; i++) {
       years.push(i);
    }

    const handleSliderChange = (event) => {
        setYearValue(event.target.value)
    }


    return(
        <>
        <Form.Label>Select how far back you would like to see data for</Form.Label>
        <Form.Range 
        value = {yearValue}
        onChange={handleSliderChange}
        min={1945}
        max = {2022}
        step={1}
        className='custom-range'
        
        />
        <div>{yearValue}</div>
        </>
    )

}

export default RangeSlider