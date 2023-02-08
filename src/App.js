import Nav from "./components/Nav.jsx";
import {findWeather, getGeolocationByPlace, getGeolocationByPostcode} from "./ApiFunctions.js"
import "./styling/General.css"
import Header from "./components/Header.jsx"
import SideMargin from "./components/SideMargin"
import Highlights from "./components/Highlights"


function App() {
  
  
  

  return (

    <div className="wrapper">
      <SideMargin/>
      <div class="grid-Header"><Header/></div>
      <div class="grid-Main"><Nav/></div>      
      <div class="grid-Highlights"><Highlights/></div>     
    </div>
   
    
  
  );
}

export default App;
