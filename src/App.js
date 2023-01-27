import Nav from "./components/Nav.jsx";
import {findWeather, getGeolocationByPlace, getGeolocationByPostcode} from "./ApiFunctions.js"
import "./styling/General.css"
import Header from "./components/Header.jsx"
import SideMargin from "./components/SideMargin"
import Highlights from "./components/Highlights"


function App() {
  
  
  

  return (

    <div className="wrapper">
      <div id="grid-sideMargin"><SideMargin/></div>
      <div id="grid-Header"><Header/></div>
      <div id="grid-Main"><Nav/></div>      
      <div id="grid-Highlights"><Highlights/></div>     
    </div>
   
    
  
  );
}

export default App;
