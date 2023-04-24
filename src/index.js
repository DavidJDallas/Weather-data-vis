import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import App from './App';
import HistoricalDataIndex from './components/Data/HistoricalDataIndex';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/historical-data' element={<HistoricalDataIndex/>}/>
        <Route path='/' element={<App/>} />  
      </Routes>  
    </BrowserRouter>  
  </React.StrictMode>
);
