import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';
import { OriginalDataChart } from "./OriginalChartGraph";



export const MissingDataChart = () => {
    const ref =  useRef();
    const [missingData, setMissingData] = useState();

    useEffect(() => {
      d3.csv("/datasets/missingvalue.csv", d3.autoType).then(setMissingData);
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
          Removal of Created Missing Values <br/> File Location:<code>./front-end/src/MissingChartGraph.js</code> and save to reload. 
        </p>
        <p>Values are randomly assigned as NaN and then removed from the dataset to compare with the first chart.</p>
        <div ref={ref}></div>
      </header>
      )
  }
