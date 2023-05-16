import * as React from 'react'
import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import '../../../styling/RainGraphs.css'
import { Container , Row} from 'react-bootstrap'
import { RainBySeasonProps} from '../../../Types/GraphsTypes'


const RainBySeasonsDryDays= ({formattedDataBySeasons, width, height}: RainBySeasonProps) => {

    const [rainData, setRainData] = useState([])
    const chartRef = useRef();


    useEffect((): void => {

        
        const daysInMonth = (month, year)=>{
            return new Date(year, month, 0).getDate()
        } 
       
        let rainPercentage = formattedDataBySeasons.map((object, index) => {    
            
                const days = object.data.map(day => day)
                const dryDays = days.filter((day) => day.rain_sum === 0)
                const daysDryPercentage = (dryDays.length /days.length) * 100
                const daysWetPercentage = 100 - daysDryPercentage
                const daysTotal = daysInMonth(index+1, 2010)
                const daysDryAverage = (dryDays.length /days.length) * daysTotal
                const daysWetAverage = daysTotal - daysDryAverage 
               
                return{
                    season: object.season,
                    daysDryPercentage,
                    daysWetPercentage,
                    daysDryAverage,
                    daysTotal,
                    daysWetAverage
                }
        })
            setRainData(rainPercentage)
    }, [formattedDataBySeasons])
  

    //Draw stacked bar chart ********


    useEffect((): void => {
        if(rainData.length>0){

            d3.select(chartRef.current).selectAll('*').remove();

            let adjustedWidth = width-30   
            
            const stacking = d3.stack()
                                .keys(['daysDryAverage', 'daysWetAverage'])

            const stackedData = stacking(rainData)   
            
            stackedData[0].forEach((element) => {
                element.push({
                    category: 'dry'
                })
            })

            stackedData[1].forEach((element) => {
                element.push({
                    category: 'wet'
                })
            })
            

            const stackingPercentages = d3.stack()
                
            let colourScale = d3.scaleOrdinal()
                                .domain(['daysDryAverage', 'daysWetAverage'])
                                .range(["#50e991", '#0bb4ff'])
                                
            const xScale = d3.scaleLinear()
                                .domain([0, 4])
                                .range([30, adjustedWidth]);
                                

            const yScale = d3.scaleLinear()
                                .domain([0, 33])
                                .range([height, 75]);

            const xAxis = d3.scaleBand()
                                .domain(rainData.map((x) => x.season))
                                .range([30, adjustedWidth])
                                .padding(0.3);

            const yAxis = d3.axisLeft(yScale)
                            .tickFormat(d => d.toString());       

            const svg= d3.select(chartRef.current)
                                .append('svg')
                                .attr('width', width)
                                .attr('height', height +100);

            const tooltip = d3.select('body').append('div')
                                .style('position', 'absolute')
                                .style('z-index', '10')
                                .style('visibility', 'hidden')
                                .style('background-color', 'white')
                                .style('border-style', 'solid')
                                .style('border-width', '2px')
                                .style('border-color', '#50e991')
                                .style('padding', '5px')
                                .style('font-size', '12px')
                                .style('line-height', '1');

            const stacks = svg.selectAll('.stack')
                                .data(stackedData)
                                .join('g')
                                .attr('class', 'stack')
                                .attr('fill', d => colourScale(d.key))




            stacks.selectAll('rect')
                    .data(d => d)
                    .join('rect')
                    .attr('x', (d, i) => xScale(i)+1)
                    .attr('y', d => yScale(d[1]))
                    .attr('height', (d)=> (yScale(d[0])- yScale(d[1])))
                    .attr('width', xScale(1) - xScale(0) -20)                                        
                    .on('mouseover', (event, d) => {
                        
                        tooltip.html(
                            d[2].category === 'wet' ?
                                `<u>${(d.data.season)}</u> 
                                <br></br>
                                
                               On average ${Math.round(d[1] - d[0])} days with rain`
                                :
                                `<u>${(d.data.month)}</u> 
                                <br></br>
                                On average ${Math.round(d[1])} dry days`                        
                                
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
                    .attr('y', 60)
                    .style('text-anchor', 'middle')
                    .style('font-size', '15px')
                    .text(`Number of Completely Dry Days Per Season`);
                
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
        <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg>

          
               
        </>
    )
}

export default RainBySeasonsDryDays