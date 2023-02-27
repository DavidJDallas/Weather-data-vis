import HighlightCards from "./HighlightCards"
import { useMediaQuery } from "react-responsive"

const Highlights = ({weatherdata, displayCelsius, searchOn, errorInSearch, isMobile}) => {  

    if(isMobile && searchOn){
        return null
    }
    return(
        <>
        <h2>This week</h2>
        {weatherdata && !searchOn && !errorInSearch ? <HighlightCards weatherdata={weatherdata} displayCelsius={displayCelsius}/> : <h3>Please enter a location or postcode</h3>}    
        </>
    )
}

export default Highlights