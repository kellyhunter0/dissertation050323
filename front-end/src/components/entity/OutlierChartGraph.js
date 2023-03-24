import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export function OutlierDataChart(headerRef){
    headerRef = useRef();
    const ref = useRef();
    const refgd = useRef();
    const refgd40 = useRef();
    const [bigData, setBigData] = useState();
    const [preOutlierRemoval, setPreOutlierRemoval] = useState();
    const [gd, setGD] = useState();
    const [gd40, setGD40] = useState();
  
    
  
    useEffect(() => {
      d3.csv("/datasets/outliers/outlierremoval.csv", d3.autoType).then(setBigData);
    }, []);
  
    useEffect(() => {
      d3.csv("/datasets/outliers/pre-outlier-removal.csv", d3.autoType).then(setPreOutlierRemoval);
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
          Plot.dot(bigData, {y: "carbon-monoxide", x: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(bigData, {y: "carbon-monoxide", x: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
  
      ref.current.append(chart);
      return () => chart.remove();
    }, [bigData]);
    
    // useEffect(() => {
    //   if (preOutlierRemoval === undefined) return;
    //   const chart = Plot.plot({
  
    //     style: {
    //       background: "transparent"
    //     },
    //     y: {
    //       grid: true
    //     },
    //     color: {
    //       type: "diverging",
    //       scheme: "burd",
    //       legend: true,
    //       background: "transparent",
          
    //     },
    //     marks: [
    //       Plot.ruleY([0]),
    //       Plot.dot(preOutlierRemoval, {x: "carbon-monoxide", y: "lpg", fill:"smoke"}),
    //       Plot.linearRegressionY(preOutlierRemoval, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
    //     ],
    //     marginBottom: 50,
    //   });
  
    //   ref.current.append(chart);
    //   return () => chart.remove();
    // }, [preOutlierRemoval]);


    return (

      <>
      <div className="col-lg-6" ref={ref}>
        <p>
          x: LPG, y: CO - After Outlier Removal <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>Outliers have been identified using IQR calculations to identify upper and lower percentiles. These values has been noted as NaN</p>
        </div>
        <div className="col-lg-6" ref={headerRef}>
        <p>
        x: CO, y: LPG - After Outlier Removal <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>The above outliers have been removed from the dataset.</p>

        </div>
      </>



      )
  
   
}
