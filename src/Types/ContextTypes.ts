//Context

export interface YearContextProps {
    yearValue: number,
    setYearValue: React.Dispatch<React.SetStateAction<number>>;
  }

export interface YearContextType {
    yearValue: number,
    setYearValue: Function,
}