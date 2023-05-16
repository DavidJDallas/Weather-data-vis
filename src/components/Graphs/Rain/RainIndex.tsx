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
import '../../../styling/RainIndex.css'

const RainIndex = ({formattedDataByMonth, formattedDataByYear, formattedDataBySeasons}: RainIndexProps) => {

   const [displayRainBySeason, setDisplayRainBySeason] = useState(true);
   const [displayRainByYear, setDisplayRainByYear] = useState(true);  
   const [displayRainDryDays, setDisplayRainDryDays] = useState(true) 

    return(
        <>
        <Container fluid={true}>
            
            <Row className='check-form-row'
           >
               
                <CheckForm 
                setDisplayRainByYear = {setDisplayRainByYear}
                setDisplayRainBySeason={setDisplayRainBySeason}
                setDisplayRainDryDays = {setDisplayRainDryDays}
                displayRainBySeason={displayRainBySeason}
                displayRainByYear={displayRainByYear}
                displayRainDryDays = {displayRainDryDays}

                />                                        
            </Row>
            <Row
           className='slider-row'
            >
            <RangeSlider/>
            </Row>
            
            {displayRainByYear &&   
                <Row className='rainfall-by-year-row'>
                    <Card className='m-0 p-0 b-0 card' border={'0'}>
                    <Card.Body className = 'm-0 p-3'>
                        <RainByYear formattedDataByYear={formattedDataByYear} 
                            width={800} 
                            height={300} 
                            
                        />
                </Card.Body>
                </Card>
                </Row>
          }
          
            {displayRainBySeason && 
            
             <Row className='rain-by-season-row'>
               
                <Col
                style={{width: '100%', height: '100%'}}
                >
                
                <Card className='m-0 p-0 h-100 w-100 card'>
                 
                    <Card.Body className='m-0 p-0'>
                      
                  <RainBySeason                 
                    formattedDataBySeasons = {formattedDataBySeasons}
                    formattedDataByYear = {formattedDataByYear}
                    width = {400}
                    height={300}               
                />
            </Card.Body>
            </Card>
            </Col>

            <Col
            style={{width: '100%', height: '100%'}}
            >
            <Card className='m-0 p-0 h-100 w-100 card' >
                <Card.Body className='m-0 p-0'>
                 
                    
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
           
            }
            {
            displayRainDryDays &&  
            <Row 
            className='rain-by-wet-days'
            >
            <Col
            className='h-100 w-100'
            >
                <RainBySeasonDryDays
                  formattedDataBySeasons = {formattedDataBySeasons}
                  formattedDataByYear={formattedDataByYear}
                  width = {400}
                  height={300} 
                
                />
            </Col>

            <Col
            className= 'w-100 h-100'
            >
                <RainByMonthsDryDays
                 formattedDataByMonth = {formattedDataByMonth}
                 formattedDataByYear={formattedDataByYear}
                 width = {400}
                 height={300} 
                />
            </Col>
            </Row>
        
            }
      
           
          
        </Container>
        </>
    )
}

export default RainIndex