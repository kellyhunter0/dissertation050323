import './App.css';
import {OriginalDataChart} from "./OriginalChartGraph";
import {MissingDataChart} from "./MissingChartGraph";
import {ResponsiveAppBar} from "./ResponsiveAppBar";
import React from 'react'; 
import { OutlierDataChart } from './OutlierChartGraph';
import { LinRegChartMissing } from './LinRegChart';
import {AllPredictLinReg} from './AllPredictedLpg';



export default function App() { 
 
// logs API values to the backend
  // const dig = (obj, target) =>
  // target in obj
  //   ? obj[target]
  //   : Object.values(obj).reduce((acc, val) => {
  //       if (acc !== undefined) return acc;
  //       if (typeof val === 'object') return dig(val, target);
  //     }, undefined);

  return (
    <>
    
    <div className="App">
    <ResponsiveAppBar></ResponsiveAppBar>
    <svg data-testid="ScatterplotIcon"></svg>
      <header className="App-header">
        <p>
          
          
        </p>
        <OriginalDataChart></OriginalDataChart>
 
        <MissingDataChart></MissingDataChart>
        <OutlierDataChart></OutlierDataChart>
        <LinRegChartMissing></LinRegChartMissing>
        <AllPredictLinReg></AllPredictLinReg>
      </header>
    </div>
    </>


  );


 
}


  


