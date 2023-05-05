import * as React from 'react'
import { useEffect, useRef} from 'react'
import * as d3 from 'd3'
import { RainByYearProps } from '../../../Types/GraphsTypes';

const RainByYear = ({formattedDataByYear, width, height}: RainByYearProps) => {

    const chartRef = useRef();
    

      let totalRainPerYear = formattedDataByYear.map((object, index) =>     ({
                year: object.year,
                rainAmount: d3.sum(object.data.map((element) => element.rain_sum)) -37
                })); 
                
    let selectiveListYear = formattedDataByYear
                    .map((element) => element.year)
                    .filter((year) => {
                        return year%5 ===0
                    });

  

    useEffect((): void => {     
                    
        d3.select(chartRef.current).selectAll('*').remove();
        const xScale = d3.scaleLinear()
                            .domain([0, totalRainPerYear.length])
                            .range([35, width-35]);            


        const yScale = d3.scaleLinear()
                            .domain([0, d3.max(totalRainPerYear.map((element) => element.rainAmount))])
                            .range([height, 0]);

        const xAxis = d3.scalePoint()
                            .domain(selectiveListYear)
                            .range([35, width-35])
                            .padding([0]);
        
        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,4))

        const svg= d3.select(chartRef.current)
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height +25);

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
                    .attr('height', (d, i) => (height-yScale(d.rainAmount)))
                    .attr('fill', "#0bb4ff")                        
                    .on('mouseover', (event, d) => {
                            tooltip.html(
                                `${d.year} : ${d.rainAmount}`.slice(0,13) + 'mm' 
                             )
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
                   .style('font-family', 'Alata', 'sans-serif')
                   .text('Total Rainfall by Year (mm)');

            svg.append('g')
                    .attr('transform', `translate(0, ${height})`)                
                    .call(d3.axisBottom(xAxis))
                    .selectAll('text')
                    .style('font-size', '9px')

            svg.append('g')
                        .attr('transform', `translate(35, 0)`)
                        .call(yAxis)
                        .selectAll('text')
                        .style('font-size', '9px')

    }, [formattedDataByYear, width, height, totalRainPerYear, selectiveListYear]);
  
  


    return(
        <>     

        <svg ref={chartRef} height={'100%'} width={'100%'} ></svg>
               
        </>
    )
}

export default RainByYear