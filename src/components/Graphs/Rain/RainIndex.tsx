import * as React from 'react';
import RainBySeason from './RainBySeason';
import RainByYear from './RainByYear';
import {Container, Row, Col, Card} from 'react-bootstrap'
import CheckForm from './CheckForm';
import {useState} from 'react'
import RainByMonths from './RainByMonths';
import { RainIndexProps } from '../../../Types/GraphsTypes';
import RainBySeasonDryDays from './RainBySeasonDryDays';
import RainByMonthsDryDays from './RainByMonthsDryDays';
import RangeSlider from './RangeSlider';

const RainIndex = ({formattedDataByMonth, formattedDataByYear, formattedDataBySeasons}: RainIndexProps) => {

   const [displayRainBySeason, setDisplayRainBySeason] = useState(true);
   const [displayRainByYear, setDisplayRainByYear] = useState(true);  
   const [displayRainDryDays, setDisplayRainDryDays] = useState(true) 

    return(
        <>
        <Container fluid={true}>
            
            <Row style ={{height: '60px'}}>
               
                <CheckForm 
                setDisplayRainByYear = {setDisplayRainByYear}
                setDisplayRainBySeason={setDisplayRainBySeason}
                setDisplayRainDryDays = {setDisplayRainDryDays}
                displayRainBySeason={displayRainBySeason}
                displayRainByYear={displayRainByYear}
                displayRainDryDays = {displayRainDryDays}

                />                                        
            </Row>
            <Row>
            <RangeSlider
                
                
                />

            </Row>
            
            {displayRainByYear ?   
                <Row style={{height: '350px'}}>
                    <Card className='m-0 p-0 b-0 card' border={'0'}>
                    <Card.Body className = 'm-0 p-3'>
                        <RainByYear formattedDataByYear={formattedDataByYear} 
                            width={800} 
                            height={300} 
                            
                        />
                </Card.Body>
                </Card>
                </Row>
                :
                null}
          
            {displayRainBySeason ? 
            
             <Row style={{height: '500px'}}>
               
                <Col>
                
                <Card className='m-0 p-0 card' border={'0'}>
                 
                    <Card.Body>
                      
                  <RainBySeason                 
                    formattedDataBySeasons = {formattedDataBySeasons}
                    formattedDataByYear = {formattedDataByYear}
                    width = {400}
                    height={300}               
                />
            </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card className='m-0 p-0 card' border={'0'}>
                <Card.Body className='m-0 p-3'>
                 
                    
            <RainByMonths
              formattedDataByMonth = {formattedDataByMonth}              
              formattedDataByYear={formattedDataByYear}
              width = {400}
              height={300}
            
            />
            </Card.Body>
            </Card>
            </Col>
            </Row>
            :
            null
        }
        {
            displayRainDryDays ?   
            <Row>
            <Col>
                <RainBySeasonDryDays
                  formattedDataBySeasons = {formattedDataBySeasons}
                  formattedDataByYear={formattedDataByYear}
                  width = {400}
                  height={300} 
                
                />
            </Col>

            <Col>
                <RainByMonthsDryDays
                 formattedDataByMonth = {formattedDataByMonth}
                 formattedDataByYear={formattedDataByYear}
                 width = {400}
                 height={300} 
                />
            </Col>
        </Row>
        :
        null
        }
      
           
          
        </Container>
        </>
    )
}

export default RainIndex