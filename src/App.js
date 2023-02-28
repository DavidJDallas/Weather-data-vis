import Main from "./components/Main.jsx";
import "./styling/General.css"
import Header from "./components/Header.jsx"
import SideMargin from "./components/SideMargin"
import Highlights from "./components/Highlights"
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function App() {
    
    const [weatherdata, setWeatherData] =  useState(null)
    const [displayLocation, setDisplayLocation] = useState("")
    const [displayPostcode, setDisplayPostcode] = useState("")
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
        <Header weatherdata={weatherdata}displayLocation={displayLocation} displayPostcode={displayPostcode} errorInSearch={errorInSearch}searchOn={searchOn} isMobile={isMobile} />
      </div>

      <div className="grid-Main">
        <Main weatherdata={weatherdata} displayCelsius={displayCelsius} searchOn={searchOn} isLoading={isLoading} errorInSearch={errorInSearch} isMobile={isMobile}/>
      </div>

      <div className="grid-Highlights">
        <Highlights weatherdata={weatherdata} displayCelsius={displayCelsius} searchOn={searchOn} isLoading={isLoading} errorInSearch={errorInSearch} isMobile={isMobile}/>
      </div>

    </div>  
  );
}

export default App;
