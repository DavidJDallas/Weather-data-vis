




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