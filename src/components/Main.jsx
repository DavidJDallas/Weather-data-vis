
import "../styling/Main.css"
import MainCard from "./MainCard"
const Main = ({weatherdata}) => {
    
    return(
        <>  <h2>Today's Weather</h2>
            <section className="container-Main-Display">
                {weatherdata ? <MainCard weatherdata={weatherdata}/> : null}
                
            </section>
            
            
        
        
        </>        



    )

}

export default Main
