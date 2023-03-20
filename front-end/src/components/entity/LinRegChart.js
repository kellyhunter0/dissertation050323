import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export const LinRegChartMissing = () => {
    const ref =  useRef();
    const [linreg, setLinReg] = useState();

    useEffect(() => {
      d3.csv("/datasets/linear-regression/missing-filled-lr.csv", d3.autoType).then(setLinReg);
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
      ref.current.append(chart2);
      return () => chart2.remove();
    }, [linreg])

    return (
        <header className="App-header" ref={ref}>
        <p>
          Replaced Missing Values with Linear Regression Predictions<br/> File Location:<code>./front-end/src/LinRegChart.js</code> and save to reload. 
        </p>
        <p>Values are randomly assigned as NaN and then replaced with linear regression predictions to compare with the first chart.</p>
      </header>

      
      )
    }

