
import "../styling/Main.css"
import MainCard from "./MainCard"
const Main = ({weatherdata}) => {

    return(
        <>
            {weatherdata ? <MainCard weatherdata={weatherdata}/> : null}
            
        
        
        </>        



    )

}

export default Main
