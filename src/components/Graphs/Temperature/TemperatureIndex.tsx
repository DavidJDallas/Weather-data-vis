import * as React from 'react';
import TempBySeason from './TempBySeason';
import TempByMonth from './TempByMonth'
import {Container, Row, Col} from 'react-bootstrap'

const TemperatureIndex = ({formattedDataByMonth, formattedDataBySeasons, formattedDataByYear}) => {

    console.log(formattedDataByMonth)


    return(
        <>
            <Container fluid={true}>


            <Row
            style={{height: '300px'}}
            >
                <Col
                className= 'h-100 w-100'
                >
                    <TempBySeason
                    formattedDataByMonth = {formattedDataByMonth}
                    formattedDataBySeasons = {formattedDataBySeasons}
                    width = {400}
                    height={250}
                />
                </Col>

           

            <Col
            className='h-100 w-100'
            >
           
                <TempByMonth
                formattedDataByMonth = {formattedDataByMonth}
                width={400}
                height={250}

            /> 
            </Col>
             </Row>
            </Container>
        </>
    )
}

export default TemperatureIndex