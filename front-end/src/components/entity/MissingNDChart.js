import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export function GuassianDistribChart(headerRef){
    headerRef = useRef();
    const refgd = useRef();
    const [gd, setGD] = useState();
    
  
    


    useEffect(() => {
      d3.csv("/datasets/normal-distribution/missing-filled-nd.csv", d3.autoType).then(setGD);
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


    return (

      <>
        <div className="col-lg-6" ref={refgd}>
        <p>
          Guassian Distribution chart <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>The missing LPG values have been filled in with Normal Distribution data</p>

        </div>
      
      </>



      )
  
   
}
