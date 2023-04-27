import * as React from 'react';
import RainBySeason from './RainBySeason';
import RainByYear from './RainByYear';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RainIndex = ({formattedDataByMonth, formattedDataByYear, formattedDataBySeasons}) => {

    return(
        <>
        <Container>
            <RainByYear formattedDataByYear={formattedDataByYear} 
                width={850} 
                height={220} 
            />
            <RainBySeason 
                formattedDataByMonth = {formattedDataByMonth}
                formattedDataBySeasons = {formattedDataBySeasons}
                formattedDataByYear={formattedDataByYear}
                width = {850}
                height={220}
            />
        </Container>
        </>
    )
}

export default RainIndex