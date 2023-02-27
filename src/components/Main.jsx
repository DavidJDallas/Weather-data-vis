import {useMediaQuery} from 'react-responsive'
import React from 'react'
import "../styling/Main.css"
import MainCard from "./MainCard"

const Main = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}) => { 
    
    if(isMobile && searchOn){
        return null
    }
    return(
        <>    
        <h2>Today</h2>   
       
        <section className="container-Main-Display">
        {weatherdata && !searchOn && !errorInSearch ? <MainCard weatherdata={weatherdata} displayCelsius={displayCelsius} isMobile={isMobile}/> 
        : 
        <h3>Please enter a location or postcode</h3>}
        </section>   
        
        </>
    )
}

export default Main
