import * as React from 'react'
import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import '../../../styling/RainGraphs.css'
import { Container , Row, Col} from 'react-bootstrap'
import {RainBySeasonProps, RainDataSeason} from '../../../Types'

const RainBySeasonDryDays = ({formattedDataBySeasons, formattedDataByYear, width, height}: RainBySeasonProps) => {

    const [rainData, setRainData] = useState<RainDataSeason[]>([])
    const chartRef = useRef();
    // d3.select(chartRef.current).selectAll('*').remove();

  
    useEffect((): void => {
        try{
            let rainPerSeason = formattedDataBySeasons.map((object) => ({
                    format: 'season',
                    season: object.season,
                    totalRain: d3.sum(object.data.map((element) => element.rain_sum)),
                    avgRain:  d3.sum(object.data.map((element) => element.rain_sum))/formattedDataByYear.length
                }))
            setRainData(rainPerSeason)
        }        
        
        catch(error){
            console.error(error)
        }
        
    }, [formattedDataBySeasons])   


    useEffect((): void => {                 

        if(rainData.length>0){  
            
            let adjustedWidth = width-30
            
        const xScale = d3.scaleLinear()
                            .domain([0, rainData.length])
                            .range([30, adjustedWidth]);

        const yScale = d3.scaleLinear()
                            .domain([0, d3.max(rainData.map((element) => element.avgRain))])
                            .range([height, 100]);

        const xAxis = d3.scaleBand()
                            .domain(rainData.map((x) => x.season))
                            .range([30, adjustedWidth])
                            .padding([0]);

        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,5))

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
                    .attr('x', (d,i) => xScale(i))
                    .attr('y', d => yScale(d.avgRain))
                    .attr('width', xScale(5)-xScale(4) -20)
                    .attr('height', (d, i) => (height-yScale(d.avgRain) ))
                    .attr('fill', "#b3d4ff")                        
                    .on('mouseover', (event, d) => {
                            tooltip.html(`${(d.season)}: ${String(d.avgRain).slice(0,6)} `+ 'mm')
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
                   .text(`Average rain per ${rainData[0].format} (mm)`);

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

    }, [rainData, height, width]);
  


    return(
        <>
        <Container>
            <Row style={{height: '500px'}}>
                {rainData.length > 0 ? 
                 <svg ref={chartRef} height={'100%'} width={'100%'} ></svg>
                 :
                 <>Error: No Data Available</>
                }

               

            </Row>      
     
        </Container>
               
        </>
    )
}

export default RainBySeasonDryDays