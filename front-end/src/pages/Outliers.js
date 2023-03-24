import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import React from 'react'; 
import {InterpolationChart} from '../components/entity/InterpolationChart';
import { OutlierDataChart } from '../components/entity/OutlierChartGraph';



export default function OutlierView() { 
 
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
        <h1>Outliers</h1>
        <OriginalDataChart></OriginalDataChart>
        <OutlierDataChart/>

    </>


  );


 
}


  


