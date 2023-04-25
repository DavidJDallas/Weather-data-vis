import * as React from 'react'
import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'

const RainByYear = ({formattedData, width, height}) => {

    let meanRainPerDay = formattedData.map((object, index) => ({
        year: object.year,
        meanRainPerDay: d3.mean(object.data.map((element) => element.rain_sum))
    }))

    let totalRainPerYear = formattedData.map((object, index) => ({
        year: object.year,
        totalRain: d3.sum(object.data.map((element) => element.rain_sum))
    })) 
  
    const chartRef = useRef();
    d3.select(chartRef.current).selectAll('*').remove();

    const xScale = d3.scaleLinear()
                    .domain([0, formattedData.length])
                    .range([0, width])
    
    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(totalRainPerYear.map((element) => element.totalRain))])
                    .range([height, 0])

    const svg= d3.select(chartRef.current)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)  

            svg.selectAll('rect')
                .data(totalRainPerYear)
                .enter()
                .append('rect')
                .attr('x', (d,i) => xScale(i))
                .attr('y', d => yScale(d.totalRain))
                .attr('width', xScale(1)-xScale(0)-1)
                .attr('height', (d, i) => height-yScale(d.totalRain))
                .attr('fill', "#0bb4ff")

            svg.selectAll('text')
                .data(totalRainPerYear)
                .enter()
                .append('text')
                .attr('dx', (d, i) => xScale(i) + xScale(1) - xScale(0) /2)
                .attr('dy', (d) => yScale(d.totalRain) -2)
                .style('font-size', 7)
                .style('text-anchor', 'middle')
                .text((d) => String(d.totalRain).slice(0,3))
  


    return(
        <>
       <div className='m-2 p2 h-100 w-100'>

        <svg ref={chartRef} height={'100%'} width={'100%'} ></svg>

       </div>
        </>
    )
}

export default RainByYear