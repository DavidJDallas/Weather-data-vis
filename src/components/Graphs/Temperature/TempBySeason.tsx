import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const TempBySeason = ({formattedDataBySeasons, formattedDataByMonth, width, height}) => {

    let tempPerSeason = formattedDataBySeasons.map((object) => ({
        season: object.season,
        temp: d3.mean(object.data.map((element) => element.temperature_2m_max))
    }))

    let tempPerMonth = formattedDataByMonth.map((object) => ({
        season: object.month,
        temp: d3.mean(object.data.map((element) => element.temperature_2m_max))
    }))

    return(
        <>
        
        </>
    )
}

export default TempBySeason
