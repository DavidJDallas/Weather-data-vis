import * as React from 'react';
import TempBySeason from './TempBySeason';

const TemperatureIndex = ({formattedDataByMonth, formattedDataBySeasons, formattedDataByYear}) => {

    return(
        <>
           <TempBySeason
        formattedDataByMonth = {formattedDataByMonth}
        formattedDataBySeasons = {formattedDataBySeasons}
        width = {850}
        height={250}/>
        </>
    )
}

export default TemperatureIndex