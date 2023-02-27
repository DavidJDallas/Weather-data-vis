
import "../styling/Main.css"
import MainCard from "./MainCard"
const Main = ({weatherdata, displayCelsius, searchOn}) => {
    return(
        <>  <h2>Today's Weather</h2>
            <section className="container-Main-Display">
                {weatherdata && !searchOn ? <MainCard weatherdata={weatherdata} displayCelsius={displayCelsius}/> : <h3>Please enter a location or postcode</h3>}
                
            </section>   
        
        </>
    )
}

export default Main
