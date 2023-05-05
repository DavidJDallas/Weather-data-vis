//GeoLocation stuff

export interface Features{
    id: string,
    type: string,
    place_type: string,
    relevance: number,
    properties: Properties,
    text: string,
    bbox: number[],
    center: string[],
    context: object[],
    geometry: object,
    place_name: string,    
}

export interface Properties{
    wikidata: string,
    mapbox_id: string
}

export interface APICallGeoLocation {
    data: Data,
    status: number,
    statusText: string,
    headers: any,
    config: object,
    request: any,

}
export interface Data{
    attribution: string,
    features: Features[],
    query: [string],
    type: string,
}

//Weather Call

export interface DailyObj {
    rain_sum: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    time: string[],
    windspeed_10m_max: number[]
}

export interface WeatherData{
    daily: DailyObj,
    daily_units: object,
    latitude: number,
    timezone: string,
    longitude: number,
    utc_offset_seconds: number,
    timezone_abbreviation: string,
}

export interface WeatherAPICall{
    config: object,
    data: WeatherData[],
    headers: object,
    request: object,
    status: 200,
    statusText: string,
}

export interface WeatherObject{
    temperature: number,
    apparentTemperature: number,
    cloudCoverPercentage: number,
    rainInMillimetres: number,
    time: string
}


//Historical Weather Data

export interface HistoricalWeatherDataType {
    config: object,
    data: HistoricalData,
    headers: object,
    request: object,
    status: 200,
    statusText: 'OK'
}

export interface HistoricalData {
    daily: DailyData,
    elevation: number,
    daily_units: object,
    generationtime_ms:number,
    latitude: number,
    longitude: number,
    timezone: number,
    timezone_abbreviation: number,
    utc_offset_seconds: 0
}

export interface DailyData{
    rain_sum: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    time: number[],
    windspeed_10m_max: number[],

}