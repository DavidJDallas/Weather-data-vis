import { WeatherData } from "./APICallTypes"
// Props

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

export interface HeaderProps {
    displayLocation: string,
    displayPostcode: string,
    errorInSearch: boolean,
    searchOn: boolean
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