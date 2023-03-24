import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import {MissingDataChart} from "../components/entity/MissingChartGraph";
import React from 'react'; 




export default function MissingView() { 
 
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
        <h1>Missing Data</h1>
  

        <OriginalDataChart></OriginalDataChart>
        <MissingDataChart></MissingDataChart>

    </>


  );


 
}

  


