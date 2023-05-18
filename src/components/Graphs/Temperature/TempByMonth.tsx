import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3'
import {interpolateViridis} from 'd3-scale-chromatic'
import {scalSequential} from 'd3-scale'


const TempByMonth = ({formattedDataByMonth, width, height}) => {

    const [tempData, setTempData] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        let tempPerMonth = formattedDataByMonth.map((object) => ({
                month: object.month,
                temp: d3.mean(object.data.map((element) => element.temperature_2m_max))
            }))

        setTempData(tempPerMonth)

    }, [formattedDataByMonth])

    

    useEffect((): void => {                 

        if(tempData.length>0){  
            d3.select(chartRef.current).selectAll('*').remove();
            
        let adjustedHeight = height-25
        let adjustedWidth = width-30
        
        const colourScale = d3.scaleSequential()
                            .domain([0, d3.max(tempData.map((element) => element.temp))])

        const interpolatorColourFunction = d3.interpolateRgb('blue', 'red')
  
        const xScale = d3.scaleLinear()
                            .domain([0, tempData.length])
                            .range([30, adjustedWidth]);

        const yScale = d3.scaleLinear()
                            .domain(
                                [(d3.min(tempData.map((element) => element.temp))) -2, 
                                d3.max(tempData.map((element) => element.temp))])
                            .range([height, 75]);

        const xAxis = d3.scaleBand()
                            .domain(tempData.map((x) => x.month.slice(0,3)))
                            .range([30, adjustedWidth])
                            .padding([0]);

        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,3));       

        const svg= d3.select(chartRef.current)
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height+25);

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
                    .attr('x', (d,i) => xScale(i)+1)
                    .attr('y', d => yScale(d.temp))
                    .attr('width', xScale(1)-xScale(0) -1)
                   .attr('height', d => height - yScale(d.temp))
                    .attr('fill', d=> interpolatorColourFunction(colourScale(d.temp)))                        
                    .on('mouseover', (event, d) => {
                            tooltip.html(`${(d.month)}: ${String(d.temp).slice(0,5)} `+ '&deg c')
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
                   .text(`Average temperature by Month (degrees c)`);
            
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xAxis))
                .selectAll('text')
                .style('font-size', '13px')
                        
            svg.append('g') 
                .attr('transform', `translate(30,0)`)              
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

export default TempByMonth