import * as React from 'react';
import { createContext, useState } from 'react';
import {YearContextProps} from './Types/ContextTypes'


export const YearContext = createContext<YearContextProps>({
  yearValue: 1945,
  setYearValue: () => { }
});

const ContextProvider = ({children}: {children: React.ReactNode}) => {  
    
    const [yearValue, setYearValue] = useState(1945);

    // const state={
    //     yearValue,
    //     setYearValue
    // }

  return (
    <>
      <YearContext.Provider 
      value={{yearValue, setYearValue} as YearContextProps}
      >
        {children}
        
      </YearContext.Provider>
    </>
  );
};

export default ContextProvider
