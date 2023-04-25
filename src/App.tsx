import Main from "./components/Main";
import "./styling/General.css"
import Header from "./components/Header"
import SideMargin from "./components/SideMargin"
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import * as React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HistoricalDataIndex from "./components/Graphs/HistoricalDataIndex";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {

    const [weatherdata, setWeatherData] =  useState(null)
    const [displayLocation, setDisplayLocation] = useState('')
    const [displayPostcode, setDisplayPostcode] = useState('')
    const [displayCelsius, setDisplayCelsius] = useState(true)
    const [searchOn, setSearchOn] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [errorInSearch, setErrorInSearch] = useState(false)
    const [colours, setColours] = useState([
        "rgba(253,127,111,1)",
        "rgba(126,176,213,1)",
        "rgba(178,224,97,1)",
        "rgba(189,126,190,1)",
        "rgba(255,181,90,1)",
        "rgba(255,238,101,1)",
        "rgba(190,185,219,1)",
        "rgba(253,204,229,1)",
        "rgba(139,211,199,1)"
    ])   



    const isMobile = useMediaQuery({
      query: '(max-width: 600px)'
  })  

  return (

    <div className='w-100 h-100'>
    <Container fluid>
      <Row> 
        <Header displayLocation={displayLocation} displayPostcode={displayPostcode} errorInSearch={errorInSearch}searchOn={searchOn}  />
      </Row>
      <Row>
          <Col xs={12} md={3}>
            <SideMargin setWeatherData={setWeatherData} weatherdata={weatherdata} setDisplayPostcode={setDisplayPostcode} setDisplayLocation={setDisplayLocation} displayCelsius={displayCelsius} setDisplayCelsius={setDisplayCelsius} searchOn={searchOn} setSearchOn={setSearchOn} isLoading={isLoading} setIsLoading={setIsLoading} setErrorInSearch={setErrorInSearch} isMobile = {isMobile}/>   
          </Col>         
          <Col md={8}>
              { weatherdata ? 
              <Main weatherdata={weatherdata} displayCelsius={displayCelsius} searchOn={searchOn}  errorInSearch={errorInSearch} isMobile={isMobile}/>
              : <> <br></br>
            
          
          <h2>Please enter a location or postcode to start.  </h2>
              
           
            </>}
          </Col>
      </Row>
    
    </Container>

   

    </div>

   

  );
}

export default App;
