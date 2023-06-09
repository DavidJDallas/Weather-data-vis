import * as React from 'react';
import {Form} from 'react-bootstrap';
import { CheckFormProps } from '../../../Types/GraphsTypes'
import '../../../styling/CheckForm.css'

const CheckForm = ({setDisplayRainBySeason, setDisplayRainByYear, displayRainByYear, displayRainBySeason, setDisplayRainDryDays, displayRainDryDays}: CheckFormProps) => {

    const handleChangeRainByYear = (event): void => {
        setDisplayRainByYear(!displayRainByYear)    
    }
    const handleChangeRainByMonth = (): void => {
        setDisplayRainBySeason(!displayRainBySeason)
    }
    const handleChangeDisplayRainDryDays = (): void => {
      setDisplayRainDryDays(!displayRainDryDays)
    }

    return(
        <>
       <Form>
        <div className="mb-3">
          <Form.Check
            inline = {true}
            label="Total Rainfall Grouped By Year"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-1`}
            onChange={handleChangeRainByYear}
            defaultChecked
            
          />
          <Form.Check
            inline = {true}
            label="Average Rain Grouped by Month or Season"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-2`}
            onChange={handleChangeRainByMonth}
            defaultChecked
          />
          <Form.Check
            inline = {true}          
            label= 'Amount of Dry Days per Month and Season'
            type={'checkbox'}
            id={`inline-${'checkbox'}-3`}
            onChange = {handleChangeDisplayRainDryDays}
            defaultChecked

          />
        </div>
    </Form>
      </>
    )
}

export default CheckForm