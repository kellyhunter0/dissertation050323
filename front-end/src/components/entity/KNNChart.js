import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';


export const KNNChart = () => {
    const ref3 =  useRef();
    const ref4 =  useRef();
    const [knn, setKNN] = useState();
    const [knnpredict, setKNNpredict] = useState();

    useEffect(() => {
        d3.csv("/datasets/knearest/missing-filled-knn.csv", d3.autoType).then(setKNN);
      }, []);

      useEffect(() => {
        d3.csv("/datasets/knearest/missing-filled-knn-noOutliers.csv", d3.autoType).then(setKNNpredict); // outliers removed, missing values applied and predicted
      }, []);
    
      // Outliers present
      useEffect(() => {
        if(knn === undefined) return;
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
            Plot.dot(knn, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
            Plot.linearRegressionY(knn, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
          ],
          marginBottom: 50,
        });
        ref4.current.append(chart2);
        return () => chart2.remove();
      }, [knn])


    // Outliers removed, missing values applied at random, then approximated using KN
    useEffect(() => {
      if(knnpredict === undefined) return;
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
          Plot.dot(knnpredict, {x: "carbon-monoxide", y: "lpg", fill: "smoke"}),
          Plot.linearRegressionY(knnpredict, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref3.current.append(chart2);
      return () => chart2.remove();
    }, [knnpredict])

return (
    <>
        <div className="col-lg-6" ref={ref4}>
    <p>
      Replaced missing values with KNN<br/> File Location:<code>./front-end/src/KNNChart.js</code> and save to reload. 
    </p>
    <p>All missing values are predicted using KNN and plotted with outliers</p>
    
  </div>
      <div className="col-lg-6" ref={ref3}>
      <p>Outliers removed, missing values applied, and then predicted using K-Nearest Neighbour.</p>
      
    </div>
    </>


  
  )
}

