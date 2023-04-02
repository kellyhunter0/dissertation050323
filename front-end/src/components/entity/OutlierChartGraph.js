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
          background: "white",
          padding: '20px',
          color: 'black',
          marginLeft: "auto",
          marginBottom: "0",
          marginRight: "auto",
          marginTop: "0",
          textAlign: "center"
        },
        y: {
          grid: true,
          label: "lpg (ppm (%)) ↑"
        },
        x: {
          label: "carbon monoxide (ppm (%)) →"
        },
        fill: {
          textAlign: "center",
          marginLeft: "auto",
          marginBottom: "0",
          marginRight: "auto",
        },
        color: {
          type: "diverging",
          scheme: "buylrd",
          legend: true,
          label: "smoke (ppm (%)) →",
          
          
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
    // useEffect(() => {
    //   if (bigData === undefined) return;
    //   const chart = Plot.plot({
    //     style: {
    //       background: "white",
    //       padding: '20px',
    //       color: 'black',
    //       marginLeft: "auto",
    //       marginBottom: "0",
    //       marginRight: "auto",
    //       marginTop: "0",
    //       textAlign: "center"
    //     },
    //     y: {
    //       grid: true
    //     },
    //     fill: {
    //       textAlign: "center",
    //       marginLeft: "auto",
    //       marginBottom: "0",
    //       marginRight: "auto",
    //     },
    //     color: {
    //       type: "diverging",
    //       scheme: "buylrd",
    //       legend: true,
    //       label: "smoke (°C) →",
          
          
    //     },
    //     marks: [
    //       Plot.ruleY([0]),
    //       Plot.dot(bigData, {y: "carbon-monoxide", x: "lpg", fill:"smoke"}),
    //       Plot.linearRegressionY(bigData, {y: "carbon-monoxide", x: "lpg", stroke: "steelblue", ci: 0.95})
    //     ],
    //     marginBottom: 50,
    //     strokeWidth:0.5
    //   });
  
    //   ref.current.append(chart);
    //   return () => chart.remove();
    // }, [bigData]);
    
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
                    <br></br>
        <br></br>
        <br></br>


        <div className="col-lg-12">
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'auto'}}>
        <div className="card-header">
          header
          </div>
        <div className="card-body"> dadadad</div>
      {/* <div className="col" ref={ref}>
        <p>
          x: LPG, y: CO - After Outlier Removal <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>Outliers have been identified using IQR calculations to identify upper and lower percentiles. These values has been noted as NaN</p>
        </div> */}
        <div className="col" ref={headerRef}>
        <p>
        x: CO, y: LPG - After Outlier Removal <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>The above outliers have been removed from the dataset.</p>

        </div>
        </div>
        </div>
      </>



      )
  
   
}
