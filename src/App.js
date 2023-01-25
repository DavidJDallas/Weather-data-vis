import Nav from "./components/Nav.jsx";
import {findWeather, getGeolocationByPlace, getGeolocationByPostcode} from "./ApiFunctions.js"
import "./styling/General.css"
import Header from "./components/Header.jsx"
import GoogleMap from "./components/GoogleMap.jsx";

function App() {
  
  const getWeatherData = async() => {
    const weatherData = await findWeather()
    console.log(weatherData, "<--- weatherData")
    return weatherData
  }

  getWeatherData()

  const postcode = "BS5 7US"
  const place = "Bristol"

  const geocodePlace =async() => {
    const latitudeAndLongitude = await getGeolocationByPlace(place)

    return latitudeAndLongitude
  }

  geocodePlace()
  const geocodePostcode = async() => {
    const latitudeAndLongitude = await getGeolocationByPostcode(postcode)

    return latitudeAndLongitude
  }
 
  geocodePostcode()

  return (
    <>
      <Header/>
      <Nav/>

  

    
     
    </>
   
    
  
  );
}

export default App;
