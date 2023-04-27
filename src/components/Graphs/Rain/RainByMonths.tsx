import * as React from 'react'
import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import '../../../styling/RainGraphs.css'
import { Container , Row, Col} from 'react-bootstrap'


const RainByMonths= ({formattedDataByMonth, formattedDataByYear, width, height}) => {

    
    const [rainData, setRainData] = useState([])

    const chartRef = useRef();
    d3.select(chartRef.current).selectAll('*').remove();


    useEffect(() => {
        let rainPerMonth = formattedDataByMonth.map((object, index) => ({
                format: 'month',
                month: object.month,
                totalRain: d3.sum(object.data.map((element) => element.rain_sum)),
                avgRain: d3.sum(object.data.map((element) => element.rain_sum))/formattedDataByYear.length
            }))
            setRainData(rainPerMonth)
    }, [formattedDataByMonth])
  




    useEffect(() => {                 

        if(rainData.length>0){      
            
        const xScale = d3.scaleLinear()
                            .domain([0, rainData.length])
                            .range([0, width]);

        const yScale = d3.scaleLinear()
                            .domain([0, d3.max(rainData.map((element) => element.avgRain))])
                            .range([height, 100]);

        const xAxis = d3.scaleBand()
                            .domain(rainData.map((x) => x.month))
                            .range([0, width])
                            .padding([0.1]);

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
                    .data(rainData)
                    .enter()
                    .append('rect')
                    .attr('x', (d,i) => xScale(i))
                    .attr('y', d => yScale(d.avgRain))
                    .attr('width', xScale(1)-xScale(0) -5)
                    .attr('height', (d, i) => (height-yScale(d.avgRain) ))
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
                   .text(`Average rain per ${rainData[0].format}`);

     
        }

    }, [rainData, height, width]);
  


    return(
        <>
        <Container>
            <Row style={{height: '300px'}}>

                <svg ref={chartRef} height={'100%'} width={'100%'} ></svg>

            </Row>
           

        
       
     
        </Container>
               
        </>
    )
}

export default RainByMonths