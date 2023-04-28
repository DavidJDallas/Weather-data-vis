import * as React from 'react';
import {Form} from 'react-bootstrap';
import { CheckFormProps } from '../../../Types'

const CheckForm = ({setDisplayRainBySeason, setDisplayRainByYear, displayRainByYear, displayRainBySeason}: CheckFormProps) => {
    
    const handleChangeRainByYear = (): void => {
        setDisplayRainByYear(!displayRainByYear)
    }

    const handleChangeRainByMonth = (): void => {
        setDisplayRainBySeason(!displayRainBySeason)
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
          {/* <Form.Check
            inline = {true}
            disabled
            label="3 (disabled)"
            type={'checkbox'}
            id={`inline-${'checkbox'}-3`}
          /> */}
        </div>
      
    </Form>
      </>
      
    
    
    
        )
}

export default CheckForm