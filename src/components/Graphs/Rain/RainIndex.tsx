import * as React from 'react';
import RainBySeason from './RainBySeason';
import RainByYear from './RainByYear';
import {Container, Row, Col, Form} from 'react-bootstrap'
import CheckForm from './CheckForm';
import {useState} from 'react'

const RainIndex = ({formattedDataByMonth, formattedDataByYear, formattedDataBySeasons}) => {

   const [displayRainBySeason, setDisplayRainBySeason] = useState(true);
   const [displayRainByYear, setDisplayRainByYear] = useState(true);

   console.log(displayRainBySeason);
   console.log(displayRainByYear)
    return(
        <>
        <Container>
            
            <Row>
                <CheckForm 
                setDisplayRainByYear = {setDisplayRainByYear}
                setDisplayRainBySeason={setDisplayRainBySeason}
                displayRainBySeason={displayRainBySeason}
                displayRainByYear={displayRainByYear}
                />
            </Row>
            
            {displayRainByYear ?   
                <Row>
                <RainByYear formattedDataByYear={formattedDataByYear} 
                    width={850} 
                    height={220} 
                    
                />
                </Row>
                :
                null}
          
            {displayRainBySeason ? 
             <Row>
                  <RainBySeason 
                formattedDataByMonth = {formattedDataByMonth}
                formattedDataBySeasons = {formattedDataBySeasons}
                formattedDataByYear={formattedDataByYear}
                width = {850}
                height={220}
               
            />
            </Row>
            :
            null
        }
           
          
        </Container>
        </>
    )
}

export default RainIndex