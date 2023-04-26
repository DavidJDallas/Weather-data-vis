import * as React from 'react'
import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'

const RainByYear = ({formattedDataByYear, width, height}) => {

    const chartRef = useRef();
    d3.select(chartRef.current).selectAll('*').remove();

      let totalRainPerYear = formattedDataByYear.map((object, index) => ({
                        year: object.year,
                        rainAmount: d3.sum(object.data.map((element) => element.rain_sum))
                    })); 
                
    let selectiveListYear = formattedDataByYear
                    .map((element) => element.year)
                    .filter((year) => {
                        return year%5 ===0
                    });

  

    useEffect(() => {                 

        const xScale = d3.scaleLinear()
                            .domain([0, totalRainPerYear.length])
                            .range([10, width]);            


        const yScale = d3.scaleLinear()
                            .domain([0, d3.max(totalRainPerYear.map((element) => element.rainAmount))])
                            .range([height -10, 10]);

        const xAxis = d3.scaleBand()
                            .domain(selectiveListYear)
                            .range([10, width])
                            .padding([0]);

        const svg= d3.select(chartRef.current)
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);

        const tooltip = d3.select('body').append('div')
                            .style('position', 'absolute')
                            .style('z-index', '10')
                            .style('visibility', 'hidden')
                            .style('background-color', 'white')
                            .style('border-style', 'solid')
                            .style('border-width', '2px')
                            .style('border-color', '#50e991')
                            .style('padding', '5px')
                            .style('font-size', '12px');

            svg.selectAll('rect')
                    .data(totalRainPerYear)
                    .enter()
                    .append('rect')
                    .attr('x', (d,i) => xScale(i))
                    .attr('y', d => yScale(d.rainAmount))
                    .attr('width', xScale(1)-xScale(0)-1)
                    .attr('height', (d, i) => (height-yScale(d.rainAmount))-20)
                    .attr('fill', "#0bb4ff")                        .on('mouseover', (event, d) => {
                            tooltip.html(String(d.rainAmount).slice(0,3) + 'mm')
                                .style('visibility', 'visible')
                        })
                    .on('mousemove', (event) => {
                            tooltip.style('top', event.pageY - 10 + 'px')
                            tooltip.style('left', event.pageX + 10 + 'px')
                        })
                    .on('mouseout', () => {
                            tooltip.style('visibility', 'hidden')
                        });
                    
            svg.append('text')
                   .attr('x', width/2)
                   .attr('y', 30)
                   .style('text-anchor', 'middle')
                   .style('font-size', '18px')
                   .text('Total Rainfall by Year');

            svg.append('g')
                    .attr('transform', `translate(0, ${height-20})`)                
                    .call(d3.axisBottom(xAxis));

    }, [formattedDataByYear, width, height, totalRainPerYear]);
  
  


    return(
        <>
       <div className='m-2 p2 h-100 w-100'>

        <svg ref={chartRef} height={'100%'} width={'100%'} ></svg>

       </div>

    

               
        </>
    )
}

export default RainByYear