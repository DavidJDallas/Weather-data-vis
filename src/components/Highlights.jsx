import HighlightCards from "./HighlightCards"

const Highlights = ({weatherdata, displayCelsius, searchOn}) => {

    return(
    <>
     <h2>This week</h2>
     {weatherdata && !searchOn ? <HighlightCards weatherdata={weatherdata} displayCelsius={displayCelsius}/> : <h2>Please choose a location or postcode</h2>}    
    </>
    )
}

export default Highlights