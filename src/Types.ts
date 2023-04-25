import { NumberMatcher } from "cypress/types/net-stubbing"

export interface Properties{
    wikidata: string,
    mapbox_id: string
}
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

export interface Data{
    attribution: string,
    features: Features[],
    query: [string],
    type: string,

}
export interface APICallGeoLocation {
    data: Data,
    status: number,
    statusText: string,
    headers: any,
    config: object,
    request: any,

}

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


export interface MainProps{
    weatherdata: WeatherData| null,
    displayCelsius: boolean,
    searchOn: boolean,
    errorInSearch: boolean,
    isMobile: boolean
}

export interface HighlightsProps extends Omit<MainProps, 'errorInSearch'>{}

export interface HighlightCardsProps extends Pick<MainProps, 'weatherdata' | 'displayCelsius' >{
    card: any,
    time: string[]
}

export interface MainCardProps extends Pick<MainProps, 'weatherdata' | 'displayCelsius' | 'isMobile'>{     
    card: any,
    hour: any
}

export interface SideMarginToggleSwitchProps extends Pick<MainProps, 'displayCelsius'>{
    setDisplayCelsius: any
}

export interface SideMarginSearchProps {
    setPostcode: Function,
    handleSubmitPostCode: (event: React.SyntheticEvent) => void,
    handleSubmitPlace: (event: React.SyntheticEvent) => void,
    setPlace: Function

}

export interface SideMarginCardProps extends Pick<MainCardProps, 'displayCelsius' | 'isMobile' | 'weatherdata'> {
    handleSearchAgain: (event: React.SyntheticEvent) => void
}

export interface SideMarginProps extends Pick<MainProps, 'displayCelsius' | 'isMobile' | 'displayCelsius' | 'searchOn' | 'weatherdata'> {
    setDisplayCelsius: Function,
    setWeatherData: Function,
    setDisplayLocation: Function,
    setDisplayPostcode: Function,
    setSearchOn: Function,
    isLoading: boolean,
    setIsLoading: Function,
    setErrorInSearch: Function    
}

//Historical Weather DAta

export interface DailyData{
    rain_sum: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    time: number[],
    windspeed_10m_max: number[],

}
export interface HistoricalData {
    daily: DailyData,
    elevation: number,
    daily_units: object,
    generationtime_ms:number,
    latitude: number,
    longitude: number,
    timezone: 'GMT',
    timezone_abbreviation: 'GMT',
    utc_offset_seconds: 0
}

export interface HistoricalWeatherDataType {
    config: object,
    data: HistoricalData,
    headers: object,
    request: object,
    status: 200,
    statusText: 'OK'
}