import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import {MissingDataChart} from "../components/entity/MissingChartGraph";
import {ResponsiveAppBar} from "../layout/ResponsiveAppBar";
import React from 'react'; 
import { OutlierDataChart } from '../components/entity/OutlierChartGraph';
import { LinRegChartMissing } from '../components/entity/LinRegChart';
import {InterpolationChart} from '../components/entity/InterpolationChart';
import { GuassianDistribChart } from '../components/entity/GuassianDistribChart';
import { Buttons } from '../components/ui/Buttons';



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
        <Buttons></Buttons>
        <OriginalDataChart></OriginalDataChart>
 
        <MissingDataChart></MissingDataChart>
        <OutlierDataChart></OutlierDataChart>
        <LinRegChartMissing></LinRegChartMissing>
        <GuassianDistribChart></GuassianDistribChart>
        <InterpolationChart></InterpolationChart>
      </header>
    </div>
    </>


  );


 
}


  


