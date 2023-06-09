import Main from "./components/MainPage/Main";
import "./styling/General.css"
import Header from "./components/MainPage/Header"
import SideMargin from "./components/SideMargin/SideMargin"
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import * as React from 'react';
import {Container, Row,  Col} from 'react-bootstrap';
import { useContext } from "react";
import { YearContext } from './Context'
import './styling/General.css'

function App() {

  const {yearValue} = useContext(YearContext)
  const [weatherdata, setWeatherData] =  useState(null);
  const [displayLocation, setDisplayLocation] = useState('');
  const [displayPostcode, setDisplayPostcode] = useState('');
  const [displayCelsius, setDisplayCelsius] = useState(true);
  const [searchOn, setSearchOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInSearch, setErrorInSearch] = useState(false); 

  const isMobile = useMediaQuery({
      query: '(max-width: 600px)'
    });  

  return (

    <div className='w-100 h-100'>
      <Container fluid>
        <Row
      
        > 
          <Header displayLocation={displayLocation} displayPostcode={displayPostcode} errorInSearch={errorInSearch}searchOn={searchOn} />
         
        </Row>
        <Row>
            <Col xs ={1}>
            </Col>
            <Col xs={12} md={3} 
            
            >
              
                <SideMargin setWeatherData={setWeatherData} weatherdata={weatherdata} setDisplayPostcode={setDisplayPostcode} setDisplayLocation={setDisplayLocation} displayCelsius={displayCelsius} setDisplayCelsius={setDisplayCelsius} searchOn={searchOn} setSearchOn={setSearchOn} isLoading={isLoading} setIsLoading={setIsLoading} setErrorInSearch={setErrorInSearch} isMobile = {isMobile}/>   
            </Col>         
            <Col md={7}
            style={{marginLeft: '0%', marginRight: '2%'}}
            >
                { weatherdata ? 
                <Main weatherdata={weatherdata} displayCelsius={displayCelsius} searchOn={searchOn}  errorInSearch={errorInSearch} isMobile={isMobile}/>
                : <>         
            
                <h2
                className='main-body-text'
                >
                  See trends in the weather, anywhere in the world, over customisable periods of time.
              </h2>             
              </>}
            </Col>
        </Row>
      
      </Container>
    </div>
  );
}

export default App;
