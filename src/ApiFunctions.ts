import axios, {AxiosHeaders} from "axios"
import { Features, APICallGeoLocation, WeatherAPICall, HistoricalWeatherDataType} from './Types'



export const findHistoricalWeather = async (latitude: string, longitude: string, tempDisplay: string, yearValue: number = 1945): Promise<HistoricalWeatherDataType> => {

    try{

        console.log(yearValue, 'hey')
        const pendingWeather: HistoricalWeatherDataType = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&timezone=GMT&start_date=${yearValue}-01-01&end_date=2022-12-31&daily=temperature_2m_max&daily=temperature_2m_min&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=${tempDisplay}`)

 
        return pendingWeather

    }   catch(error){
        console.error(error)
    }
    

}

export const getGeolocationByPostcode = async (postcode: string): Promise<Features[]> => {  
    
    try{
        const pendingGeoLocation: APICallGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

        const geoLocationData: Features[] = pendingGeoLocation.data.features
        return geoLocationData

    } catch(error){
        console.error(error)
        }
}


export const getGeolocationByPlace = async(place: string): Promise<Features[]> => {
    try{
        const pendingGeoLocation: APICallGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ`)

            
        const geoLocationData: Features[]= pendingGeoLocation.data.features 

        return geoLocationData

    }  catch(error){
            console.error(error)
        }

    } 

   








