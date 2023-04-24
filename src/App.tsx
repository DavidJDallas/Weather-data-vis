import Main from "./components/Main";
import "./styling/General.css"
import Header from "./components/Header"
import SideMargin from "./components/SideMargin"
import Highlights from "./components/Highlights"
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import * as React from 'react'
import {Hourly} from './Types'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HistoricalDataIndex from "./components/Data/HistoricalDataIndex";
import { Link } from "react-router-dom";



function App() {

    const [weatherdata, setWeatherData] =  useState(null)
    const [displayLocation, setDisplayLocation] = useState('')
    const [displayPostcode, setDisplayPostcode] = useState('')
    const [displayCelsius, setDisplayCelsius] = useState(true)
    const [searchOn, setSearchOn] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [errorInSearch, setErrorInSearch] = useState(false)

    const isMobile = useMediaQuery({
      query: '(max-width: 600px)'
  })  

  return (

    <div className="wrapper">
   
      <div className="grid-sideMargin">
         <SideMargin setWeatherData={setWeatherData} weatherdata={weatherdata} setDisplayPostcode={setDisplayPostcode} setDisplayLocation={setDisplayLocation} displayCelsius={displayCelsius} setDisplayCelsius={setDisplayCelsius} searchOn={searchOn} setSearchOn={setSearchOn} isLoading={isLoading} setIsLoading={setIsLoading} setErrorInSearch={setErrorInSearch} isMobile = {isMobile}/>        
      </div>
      
      <div className="grid-Header">
        <Header displayLocation={displayLocation} displayPostcode={displayPostcode} errorInSearch={errorInSearch}searchOn={searchOn}  />
      </div>

      <div className="grid-Main">
        { weatherdata ? 
        <Main weatherdata={weatherdata} displayCelsius={displayCelsius} searchOn={searchOn}  errorInSearch={errorInSearch} isMobile={isMobile}/>
        : <>
        <h3>Please enter a location or postcode. 
        </h3>
        <Link key={1}to={'/historical-data'}>Historical Data</Link>
       

       
        </>
        }  
      </div>

      <div className="grid-Highlights">
        {weatherdata ? 
         <Highlights weatherdata={weatherdata} displayCelsius={displayCelsius} searchOn={searchOn} isMobile={isMobile}/>
         : 
         null
      }       
      </div>
      
    </div>  


  );
}

export default App;
