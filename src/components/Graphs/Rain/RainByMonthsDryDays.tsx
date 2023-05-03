import * as React from 'react'
import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import '../../../styling/RainGraphs.css'
import { Container , Row, Col} from 'react-bootstrap'
import { RainByMonthsProp , RainDataMonth} from '../../../Types'


const RainByMonthsDryDays= ({formattedDataByMonth, formattedDataByYear, width, height}: RainByMonthsProp) => {

    const [rainData, setRainData] = useState([])
    const chartRef = useRef();
    // d3.select(chartRef.current).selectAll('*').remove();

    console.log(formattedDataByMonth)
    console.log(rainData)

    useEffect((): void => {
        const daysInMonth = (month, year)=>{
            return new Date(month, year, 0).getDate()
        } 
        
        
        let rainPercentage = formattedDataByMonth.map((object, index) => {    
            
                const days = object.data.map(day => day)
                const dryDays = days.filter((day) => day.rain_sum === 0)
                const daysDryPercentage = dryDays.length /days.length
                const daysTotal = daysInMonth(index, 2010)
                const daysDryAverage = (dryDays.length /days.length) * daysTotal
                const daysWetAverage = daysTotal - daysDryAverage 

                return{
                    month: object.month,
                    daysDryPercentage,
                    daysDryAverage,
                    daysTotal,
                    daysWetAverage
                }
        })
            setRainData(rainPercentage)
    }, [formattedDataByMonth])
  

    //Draw stacked bar chart ********


    useEffect((): void => {
        if(rainData.length>0){

            let adjustedHeight = height-25
            let adjustedWidth = width-30   
            
            const stacking = d3.stack()
                                .keys(['daysDryAverage', 'daysWetAverage'])

            const stackedData = stacking(rainData)
            console.log(stackedData)
                
            
            const xScale = d3.scaleLinear()
                                .domain([0, rainData.length])
                                .range([30, adjustedWidth]);

            const yScale = d3.scaleLinear()
                                .domain([0, 31])
                                .range([height, 100]);

            const xAxis = d3.scalePoint()
                                .domain(rainData.map((x) => x.month.slice(0,3)))
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
                        .data(rainData)
                        .enter()
                        .append('rect')
                        .attr('x', (d,i) => xScale(i)+1)
                        .attr('y', d => yScale(d.avgRain))
                        .attr('width', xScale(1)-xScale(0) -1)
                        .attr('height', d => height - yScale(d.avgRain))
                        .attr('fill', "#00bfa0")                        
                        .on('mouseover', (event, d) => {
                                tooltip.html(`${(d.month)}: ${String(d.avgRain).slice(0,5)} `+ 'mm')
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
                    .text(`Percentage of Completely Dry Days Per Month`);
                
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

    }, [rainData, height, width]);
  


    return(
        <>
        <Container fluid>
            <Row style={{height: '400px'}}>

                <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg>

            </Row>
           

        
       
     
        </Container>
               
        </>
    )
}

export default RainByMonthsDryDays