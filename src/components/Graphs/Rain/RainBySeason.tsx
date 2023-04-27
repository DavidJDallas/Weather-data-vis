import * as React from 'react'
import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import '../../../styling/RainGraphs.css'
import { Container , Row, Col} from 'react-bootstrap'


const RainBySeason = ({formattedDataByMonth, formattedDataBySeasons, formattedDataByYear, width, height}) => {

    const chartRef = useRef();
    d3.select(chartRef.current).selectAll('*').remove();

    let rainPerMonth = formattedDataByMonth.map((object, index) => ({
        format: 'Month',
        month: object.month,
        totalRain: d3.sum(object.data.map((element) => element.rain_sum)),
        avgRain: d3.sum(object.data.map((element) => element.rain_sum))/formattedDataByYear.length
    }))

    let rainPerSeason = formattedDataBySeasons.map((object) => ({
        format: 'Season',
        season: object.season,
        totalRain: d3.sum(object.data.map((element) => element.rain_sum)),
        avgRain:  d3.sum(object.data.map((element) => element.rain_sum))/formattedDataByYear.length
    }))

    const [rainData, setRainData] = useState(rainPerMonth)
    console.log(rainPerMonth)
    console.log(rainPerSeason)

    const handleSubmitSeason = (event) => {
        setRainData(rainPerSeason);
        event.preventDefault();
    }

    const handleSubmitMonth = (event) => {
        setRainData(rainPerMonth);
        event.preventDefault();
    }  

    useEffect(() => {                 

        if(rainData){        
        const xScale = d3.scaleLinear()
                            .domain([0, rainData.length])
                            .range([0, width]);

        const yScale = d3.scaleLinear()
                            .domain([0, d3.max(rainData.map((element) => element.avgRain))])
                            .range([height -10, 10]);

        const xAxis = d3.scaleBand()
                            .domain(rainData.map((x) => x.season ? x.season : x.month))
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
                    .attr('width', xScale(1)-xScale(0)-20)
                    .attr('height', (d, i) => (height))
                    .attr('fill', "#0bb4ff")                        
                    .on('mouseover', (event, d) => {
                            tooltip.html(String(d.avgRain).slice(0,3) + 'mm')
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

            svg.append('g')
                    .attr('transform', `translate(0, ${height-10})`)                
                    .call(d3.axisBottom(xAxis));
        }

    }, [rainData, height, width]);
  


    return(
        <>
        <Container>

        <svg ref={chartRef} height={'100%'} width={'100%'} ></svg>

       
       <form onSubmit = {handleSubmitSeason}>
                <label></label>                   
                <button id = "selectionbutton" type="submit">View by Seasons</button>
            </form>
           
     <form onSubmit = {handleSubmitMonth}>
                <label></label>                   
                <button id = "selectionbutton" type="submit">View By Months</button>
            </form>
    
    </Container>
               
        </>
    )
}

export default RainBySeason