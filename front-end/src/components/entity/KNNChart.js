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
      <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          KNN Predictions - Before outlier removal
          </div>
        <div className="card-body">
          <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
            <p>K-Nearest Neighbour, or KNN for short, is a prediction method used a lot in Machine Learning and Data Science to estimate values in missing data. It should be noted that KNN is <b>very sensitive</b> to outliers, so this can mean that the value range goes higher or lower than it should. In the chart below, we predict missing values where there are outliers present in the dataset.</p>
          <div className="col" ref={ref4} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
    <p>
      As can be seen above, the range of values predicted lies within the y-axis values of the original chart. It can be seen that the relationship of the chart is affected slightly, the line of best fit not as steep as the original chart, but it is still positive.
    </p>
    
  </div>
  </div></div></div>
  <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          KNN Predictions - After outlier removal
          </div>
        <div className="card-body">
          <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
          <p>Outliers have been removed here to see how KNN performs without them present. Missing values are created after this so we can see the comparison between the two charts. The missing values are then filled using K-Nearest Neighbour.</p>
          <div className="col" ref={ref3} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
      <p>In the above chart, it can be seen that the data on the Scatterplot now seems to follow a symmetric <b>Normal Distribution</b> bell curve shape, whereas before in the case where outliers were kept it seemed to follow more of a asymmetric bell curve. The integrity of the relationship looks to still be intact, following a positive linear relationship, but it is less angled and steep as a result of outlier removal and missing value estimates. </p>
      <p>How would you describe the impact of estimated data where there are some missing values, and how does this affect your understanding of the dataset?</p>
    </div>
    </div>
    </div>
    </div>
    </>

//The number of neighbours refers to the number of datapoints that it will include within its range. Generally, it's better to set this as an odd value so there aren't any conflicts. If an even number of neighbours is used, then two data points could have an even number of neighbours and there might be some conflict in the estimation. 
  
  )
}

