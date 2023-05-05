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


export interface MainProps{
    weatherdata: WeatherData| null,
    displayCelsius: boolean,
    searchOn: boolean,
    errorInSearch: boolean,
    isMobile: boolean
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

//Checkbox

export interface FormCheckType {
    type: 'checkbox' | 'radio';
}

//Graphs
    //Props
export interface RainDataSeason {
    format: string,
    season: string,
    totalRain: number,
    avgRain: number,
}

export interface RainDataMonth extends Omit<RainDataSeason, 'season'>{
    month: string
}

export interface RainBySeasonProps {    
    formattedDataBySeasons: FormattedDataBySeasons[],
    formattedDataByYear: FormattedDataByYear[],
    width: number,
    height: number
}

export interface RainIndexProps extends Pick<RainBySeasonProps, 'formattedDataBySeasons' | 'formattedDataByYear'>{
    formattedDataByMonth: FormattedDataByMonth[]
}

export interface RainByMonthsProp extends Omit<RainBySeasonProps, 'formattedDataBySeasons'> {
    formattedDataByMonth: FormattedDataByMonth[]
}

export interface RainByYearProps extends Omit<RainBySeasonProps, 'formattedDataBySeasons'>{}

export interface CheckFormProps {
    setDisplayRainBySeason: Function,
    setDisplayRainByYear: Function,
    setDisplayRainDryDays: Function,
    displayRainByYear: boolean,
    displayRainBySeason: boolean,
    displayRainDryDays: boolean
}




    //Api Call stuff

export interface FormattedDataByMonth{
    month: string,
    data: FormattedDataObj[]
}

export interface FormattedDataBySeasons{
    season: string,
    data: FormattedDataObj[]
}

export interface FormattedDataByYear{
    year: number,
    data: FormattedDataObj[],
}

export interface FormattedDataObj{
    rain_sum: number,
    temperature_2m_max: number,
    temperature_2m_min: number,
    time: Date,
    windspeed_10m_max: number
}

//Context

export interface YearContextProps {
    yearValue: number,
    setYearValue: React.Dispatch<React.SetStateAction<number>>;
  }

export interface YearContextType {
    yearValue: number,
    setYearValue: Function,
}