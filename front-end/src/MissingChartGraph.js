import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export const MissingDataChart = () => {
    const ref =  useRef();
    const [missingData, setMissingData] = useState();

    useEffect(() => {
      d3.csv("/datasets/missingvalues.csv", d3.autoType).then(setMissingData);
    }, []);
  
    // Missing Data chart
    useEffect(() => {
      if(missingData === undefined) return;
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
          Plot.dot(missingData, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(missingData, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref.current.append(chart2);
      return () => chart2.remove();
    }, [missingData])
    
    return (
        <header className="App-header" ref={ref}>
        <p>
          Missing Values <br/> File Location:<code>./front-end/src/MissingChart.js</code> and save to reload. 
        </p>
        <div ref={ref}></div>
      </header>
      )
  }

  export function OriginalDataChart(headerRef){
    headerRef = useRef();
    const [bigData, setBigData] = useState();
  
    
  
    useEffect(() => {
      d3.csv("/datasets/iot_telemetry_data.csv", d3.autoType).then(setBigData);
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
          Plot.dot(bigData, {x: "co", y: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(bigData, {x: "co", y: "lpg", stroke: "black", ci: 0.95})
        ],
        marginBottom: 50,
      });
  
      headerRef.current.append(chart);
      return () => chart.remove();
    }, [bigData]);
    return (
        <div ref={headerRef}></div>
      )
   
}
