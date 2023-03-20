import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';


export const InterpolationChart = () => {
    const ref3 =  useRef();
    const [linreg, setLinReg] = useState();

    useEffect(() => {
      d3.csv("/datasets/interpolation/missing-filled-interpolate.csv", d3.autoType).then(setLinReg);
    }, []);
  
    // Missing Data chart
    useEffect(() => {
      if(linreg === undefined) return;
      const chart2 = Plot.plot({
        
        style: {
          background: "transparent"
        },
        y: {
          grid: true
        },
        color: {
          type: "diverging",
          scheme: "burd",
          legend:true
        },
        marks: [
          Plot.ruleY([0]),
          Plot.dot(linreg, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(linreg, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref3.current.append(chart2);
      return () => chart2.remove();
    }, [linreg])

return (
    <header className="App-header" ref={ref3}>
    <p>
      Replaced all LPG values with Interpolation Predictions<br/> File Location:<code>./front-end/src/AllPredictedLpg.js</code> and save to reload. 
    </p>
    <p>All lpg values are predicted and plotted to show the difference in plotting the two charts (one with some predictions, and the other that's entirely predicted)</p>
    
  </header>

  
  )
}

