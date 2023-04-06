import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export function GuassianDistribChart(headerRef){
    headerRef = useRef();
    const refgd = useRef();
    const refgdoutliers = useRef();
    const [gd, setGD] = useState();
    const [gdoutliers, setGDoutliers] = useState();
    
  
    


    useEffect(() => {
      d3.csv("/datasets/normal-distribution/missing-filled-nd.csv", d3.autoType).then(setGD);
    }, []);

    useEffect(() => {
      d3.csv("/datasets/normal-distribution/missing-filled-nd-nooutliers.csv", d3.autoType).then(setGDoutliers);
    }, []);
    useEffect(() => {
      if (gd === undefined) return;
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
          Plot.dot(gd, {x: "carbon-monoxide", y: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(gd, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
  
      refgd.current.append(chart);
      return () => chart.remove();
    }, [gd]);

    useEffect(() => {
      if (gdoutliers === undefined) return;
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
          Plot.dot(gdoutliers, {x: "carbon-monoxide", y: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(gdoutliers, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
  
      refgdoutliers.current.append(chart);
      return () => chart.remove();
    }, [gdoutliers]);

    return (

      <>
            <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'auto'}}>
        <div className="card-header">
          Prediction
          </div>
        <div className="card-body"> Pre-Outlier Removal</div>
      {/* <div className="col" ref={ref}>
        <p>
          x: LPG, y: CO - After Outlier Removal <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>Outliers have been identified using IQR calculations to identify upper and lower percentiles. These values has been noted as NaN</p>
        </div> */}
        <div className="col" ref={refgd} style={{ marginLeft:'auto', marginRight:'auto'}}>
        <p>
          Guassian Distribution chart <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>The missing LPG values have been filled in with Normal Distribution data (pre outlier removal)</p>
        </div>

        </div>
        </div>

        <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'auto'}}>
        <div className="card-header">
          Prediction
          </div>
        <div className="card-body"> After Outlier Removal</div>
      {/* <div className="col" ref={ref}>
        <p>
          x: LPG, y: CO - After Outlier Removal <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>Outliers have been identified using IQR calculations to identify upper and lower percentiles. These values has been noted as NaN</p>
        </div> */}
        <div className="col" ref={refgdoutliers} style={{ marginLeft:'auto', marginRight:'auto'}}>
        <p>
          Guassian Distribution chart <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>The missing LPG values have been filled in with Normal Distribution data (after outlier removal)</p>
        </div>

        </div>
        </div>
      
      </>



      )
  
   
}
