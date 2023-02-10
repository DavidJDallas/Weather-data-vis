import axios, {AxiosHeaders} from "axios"

const myApi=axios.create({
    baseUrl: "https://api.open-meteo.com/v1"
})

//Endpoint /v1/forecast accepts a geographical coordinate, a list of weather variables and responds with a JSON hourly weather forecast for 7 days. 

export const findWeather = async (latitude, longitude) => {
    console.log(latitude, longitude, "<<--- lat and long")
    
    const pendingWeatherData =  await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&hourly=apparent_temperature&hourly=cloudcover&hourly=windspeed_10m&hourly=snowfall&hourly=rain&hourly=showers&hourly=snow_depth`)

    return pendingWeatherData   
}

export const getGeolocationByPostcode = async (postcode) => {
    

    const pendingGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

    const geoLocationData = pendingGeoLocation.data.features
    return geoLocationData
}


export const getGeolocationByPlace = async(place) => {
   
    const pendingGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

    const geoLocationData = pendingGeoLocation.data.features

    return geoLocationData
}

export const mapsCall = async () => {
    const res = await axios.get()
}






