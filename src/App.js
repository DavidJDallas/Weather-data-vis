import Main from "./components/Main.jsx";
import {findWeather, getGeolocationByPlace, getGeolocationByPostcode} from "./ApiFunctions.js"
import "./styling/General.css"
import Header from "./components/Header.jsx"
import SideMargin from "./components/SideMargin"
import Highlights from "./components/Highlights"
import { useState } from "react";

function App() {
    
    const [weatherdata, setWeatherData] =  useState(null)
  
  

  return (

    <div className="wrapper">
      <div className="grid-sideMargin"><SideMargin setWeatherData={setWeatherData} weatherdata={weatherdata}/></div>
      <div className="grid-Header"><Header/></div>
      <div className="grid-Main"><Main weatherdata={weatherdata}/></div>      
      <div className="grid-Highlights"><Highlights/></div>     
    </div>
   
    
  
  );
}

export default App;
