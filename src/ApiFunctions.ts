import axios, {AxiosHeaders} from "axios"
import { Features, APICallGeoLocation, WeatherAPICall, HistoricalWeatherDataType} from './Types'



export const findHistoricalWeather = async (latitude: string, longitude: string, tempDisplay: string): Promise<HistoricalWeatherDataType> => {

    const pendingWeather: HistoricalWeatherDataType = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&timezone=GMT&start_date=1945-01-01&end_date=2023-04-15&daily=temperature_2m_max&daily=temperature_2m_min&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=${tempDisplay}`)

 
    return pendingWeather


}

export const getGeolocationByPostcode = async (postcode: string): Promise<Features[]> => {    

    const pendingGeoLocation: APICallGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

    const geoLocationData: Features[] = pendingGeoLocation.data.features
    return geoLocationData
}


export const getGeolocationByPlace = async(place: string): Promise<Features[]> => {


    const pendingGeoLocation: APICallGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

    
    const geoLocationData: Features[]= pendingGeoLocation.data.features 

    return geoLocationData
}








