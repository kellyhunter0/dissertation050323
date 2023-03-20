import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export function OriginalDataChart(headerRef){
    headerRef = useRef();
    const [bigData, setBigData] = useState();
  
    
  
    useEffect(() => {
      d3.csv("/datasets/original/half-removed.csv", d3.autoType).then(setBigData);
    }, []);
  
    
    useEffect(() => {
      if (bigData === undefined) return;
      const chart = Plot.plot({
  
        style: {
          background: "transparent"
        },
        y: {
          grid: true
        },
        color: {
          type: "diverging",
          scheme: "burd",
          legend: true,
          background: "transparent",
          
        },
        marks: [
          Plot.ruleY([0]),
          Plot.dot(bigData, {x: "carbon-monoxide", y: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(bigData, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
  
      headerRef.current.append(chart);
      return () => chart.remove();
    }, [bigData]);
    return (
        <header className="App-header" ref={headerRef}>
        <p>
          No Missing Values <br/> File Location:<code>./front-end/src/OriginalChartGraph.js</code> and save to reload. 
        </p>
        <p>The dataset is reduced by half initally and plotted to identify a relationship. </p>
        </header>
      )
   
}
