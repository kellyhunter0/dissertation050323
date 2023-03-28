import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';


export const KNNChart = () => {
    const ref3 =  useRef();
    const ref4 =  useRef();
    const [knn, setKNN] = useState();

    useEffect(() => {
        d3.csv("/datasets/missing/missing-filled-knn.csv", d3.autoType).then(setKNN);
      }, []);
    
      // Missing Data chart
      useEffect(() => {
        if(knn === undefined) return;
        const chart2 = Plot.plot({
          
          style: {
            background: "transparent",
            
          },
          y: {
            grid: true
          },
          x: {
            grid:true
          },
  
          color: {
            type: "diverging",
            scheme: "burd",
            legend:true
          },
          marks: [
            Plot.ruleY([0]),
            Plot.dot(knn, {x: "lpg", y: "carbon-monoxide",  fill:"smoke"}),
            Plot.linearRegressionY(knn, {x: "lpg", y: "carbon-monoxide", stroke: "steelblue", ci: 0.95})
          ],
          marginBottom: 50,
        });
        ref4.current.append(chart2);
        return () => chart2.remove();
      }, [knn])

    useEffect(() => {
      d3.csv("/datasets/missing/missing-filled-knn.csv", d3.autoType).then(setKNN);
    }, []);
  
    // Missing Data chart
    useEffect(() => {
      if(knn === undefined) return;
      const chart2 = Plot.plot({
        
        style: {
          background: "transparent",
          
        },
        y: {
          grid: true
        },
        x: {
          grid:true
        },

        color: {
          type: "diverging",
          scheme: "burd",
          legend:true
        },
        marks: [
          Plot.ruleY([0]),
          Plot.dot(knn, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(knn, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref3.current.append(chart2);
      return () => chart2.remove();
    }, [knn])

return (
    <>
        <div className="col-lg-6" ref={ref3}>
    <p>
      Replaced missing values with KNN<br/> File Location:<code>./front-end/src/KNNChart.js</code> and save to reload. 
    </p>
    <p>All missing values are predicted using KNN and plotted to show the difference</p>
    
  </div>
      <div className="col-lg-6" ref={ref4}>
      <p>
        Replaced missing values with KNN<br/> File Location:<code>./front-end/src/KNNChart.js</code> and save to reload. 
      </p>
      <p>All missing values are predicted using KNN and plotted to show the difference</p>
      
    </div>
    </>


  
  )
}

