import * as React from 'react'
import * as d3 from 'd3'
import { useState, useEffect, useRef } from 'react'

const DataVisualisation = ({weatherdata}) => { 
    
    console.log(weatherdata)

    const [temperature, setTemperature] = useState([])
    const chartRef = useRef();
    d3.select(chartRef.current).selectAll('*').remove();
    
    useEffect(() => {
        if(weatherdata) setTemperature(weatherdata.hourly.temperature_2m.slice(0, 24))
    }, [weatherdata])
  
    
    const width: number = 600;
    const height: number = 140;

    const xScale = d3.scaleLinear()
                    .domain([0, temperature.length])
                    .range([0, width])

    console.log(xScale(50))

                   

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(temperature)])
                    .range([height, 0])

         console.log(yScale(50))               

    const svg = d3.select(chartRef.current)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
    
    
    
    svg.selectAll('rect')
        .data(temperature)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', (d) => yScale(d))
        .attr('width', xScale(1)-xScale(0)-1)
        .attr('height', (d, i) => height - yScale(d))
        .attr('fill', 'black')

    svg.selectAll('text')
        .data(temperature)
        .enter()
        .append('text')
        .attr('x', (d, i) => xScale(i) + (xScale(1) - xScale(0)) / 2)
        .attr('y', (d) => yScale(d) - 2)
        .text((d, i) => d)
        .style('font-size', 7)
        .style('text-anchor', 'middle')


return(
    <>
    {temperature ? 
    <div className = 'temp-bar-chart'>
    <svg ref={chartRef} height={'95%'} width={'95%'} >


    </svg>
    </div>
     
    : null}
    </>
)

}

export default DataVisualisation