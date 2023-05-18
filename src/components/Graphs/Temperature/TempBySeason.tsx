import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const TempBySeason = ({formattedDataBySeasons, formattedDataByMonth, width, height}) => {

    const [tempData, setTempData] = useState([]);
    const chartRef=useRef();

    useEffect(() => {
        let tempPerSeason = formattedDataBySeasons.map((object) => ({
            season: object.season,
            temp: d3.mean(object.data.map((element) => element.temperature_2m_max))
        }))
        setTempData(tempPerSeason)


    }, [formattedDataBySeasons])
   

    console.log(tempData)

    useEffect((): void => {                 

        if(tempData.length>0){  

            d3.select(chartRef.current).selectAll('*').remove();
            
            let adjustedWidth = width-30
            
            const xScale = d3.scaleLinear()
                                .domain([0, tempData.length])
                                .range([30, adjustedWidth]);

            const yScale = d3.scaleLinear()
                                .domain([0, d3.max(tempData.map((element) => element.temp))])
                                .range([height, 50]);

            const xAxis = d3.scaleBand()
                                .domain(tempData.map((x) => x.season))
                                .range([30, adjustedWidth])
                                .padding([0]);

            const yAxis = d3.axisLeft(yScale)
                            .tickFormat(d => d.toString().slice(0,5))

            const svg= d3.select(chartRef.current)
                                .append('svg')
                                .attr('width', width)
                                .attr('height', height+200);

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
                    .data(tempData)
                    .enter()
                    .append('rect')
                    .attr('x', (d,i) => xScale(i))
                    .attr('y', d => yScale(d.temp))
                    .attr('width', xScale(5)-xScale(4) -20)
                    .attr('height', (d, i) => (height-yScale(d.temp) ))
                    .attr('fill', "#b3d4ff")                        
                    .on('mouseover', (event, d) => {
                            tooltip.html(`${(d.season)}: ${String(d.temp).slice(0,6)} `+ '&deg c')
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
                   .text(`Average temperature by Season ()`);

            svg.append('g')
                    .attr('transform', `translate(0, ${height})`)                
                    .call(d3.axisBottom(xAxis))
                    .selectAll('text')
                    .style('font-size', '13px')
            
            svg.append('g')
                .attr('transform', 'translate(30,0)')
                .call(yAxis)
                .selectAll('text')
                .style('font-size', '9px')

        }

    }, [tempData, height, width]);

    return(
        <>
          <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg>
        </>
    )
}

export default TempBySeason
