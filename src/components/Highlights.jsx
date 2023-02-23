import HighlightCards from "./HighlightCards"

const Highlights = ({weatherdata}) => {

    return(
    <>
     <h2>This week</h2>
     {weatherdata ? <HighlightCards weatherdata={weatherdata}/> : <h2>Please choose a location or postcode</h2>}    
    </>
    )
}

export default Highlights