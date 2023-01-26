import axios, {AxiosHeaders} from "axios"

const myApi=axios.create({
    baseUrl: "https://api.open-meteo.com/v1"
})

//Endpoint /v1/forecast accepts a geographical coordinate, a list of weather variables and responds with a JSON hourly weather forecast for 7 days. 

export const findWeather = async () => {
    const pendingWeatherData =  await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')

    return pendingWeatherData   
}

export const getGeolocationByPostcode = async (postcode) => {
    const pendingGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

    const geoLocationData = pendingGeoLocation.data.features
    return geoLocationData
}


export const getGeolocationByPlace = async(place) => {
    console.log("here")
    console.log(place)
    const pendingGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

    const geoLocationData = pendingGeoLocation.data.features

    return geoLocationData
}

export const mapsCall = async () => {
    const res = await axios.get()
}


/*
  const getWeatherData = async() => {
    const weatherData = await findWeather()
    console.log(weatherData, "<--- weatherData")
    return weatherData
  }

  

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
 

*/ 
