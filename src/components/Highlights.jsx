import HighlightCards from "./HighlightCards"

const Highlights = ({weatherdata, displayCelsius, searchOn}) => {

    return(
    <>
     <h2>This week</h2>
     {weatherdata && !searchOn ? <HighlightCards weatherdata={weatherdata} displayCelsius={displayCelsius}/> : <h3>Please enter a location or postcode</h3>}    
    </>
    )
}

export default Highlights