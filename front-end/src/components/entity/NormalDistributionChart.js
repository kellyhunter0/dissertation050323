import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';


export const NormalDistributionChart = () => {
    const ref3 =  useRef();
    const ref4 =  useRef();
    const [nd10, setnd10] = useState();
    const [nd40, setnd40] = useState();

    useEffect(() => {
      d3.csv("/datasets/normal-distribution/guassiandistrib-10.csv", d3.autoType).then(setnd10);
    }, []);
    
    useEffect(() => {
      d3.csv("/datasets/normal-distribution/guassiandistrib-40.csv", d3.autoType).then(setnd40);
    }, []);
  
    // Missing Data chart
    useEffect(() => {
      if(nd10 === undefined) return;
      const chart2 = Plot.plot({
        
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
          Plot.dot(nd10, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(nd10, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref3.current.append(chart2);
      return () => chart2.remove();
    }, [nd10])
    useEffect(() => {
      if(nd40 === undefined) return;
      const chart2 = Plot.plot({
        
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
          Plot.dot(nd40, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(nd40, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref4.current.append(chart2);
      return () => chart2.remove();
    }, [nd40])
return (
  <>
        <div className="row" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="col-lg-6" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          10% of values replaced
          </div>
        <div className="card-body">
          <div className="col" ref={ref3} style={{ marginLeft:'auto', marginRight:'auto'}}>

    <p>
      10% of data replaced with Guassian Distribution values <br/> File Location:<code>./front-end/src/AllPredictedLpg.js</code> and save to reload. 
    </p>
    <p></p>
    
  </div>

  </div>
  </div>
  </div>
  <div className="col-lg-6" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          40% of values replaced
          </div>
        <div className="card-body">
  <div className="col" ref={ref4} style={{ marginLeft:'auto', marginRight:'auto'}}>
    <p>
    40% of data replaced with Guassian Distribution values <br/> File Location:<code>./front-end/src/AllPredictedLpg.js</code> and save to reload. 
    </p>
    <p></p>
    
  </div>
  </div>
  </div>
  </div>
  </div>
  </>

  
  )
}

