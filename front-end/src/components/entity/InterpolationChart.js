import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';


export const InterpolationChart = () => {
    const ref3 =  useRef();
    const ref4 =  useRef();
    const [linreg, setLinReg] = useState();
    const [linreg1, setLinReg1] = useState();

    useEffect(() => {
      d3.csv("/datasets/interpolation/missing-filled-interpolate-outliers.csv", d3.autoType).then(setLinReg);
    }, []);

    useEffect(() => {
      d3.csv("/datasets/interpolation/missing-filled-interpolate-nooutliers.csv", d3.autoType).then(setLinReg1);
    }, []);
  
    // Missing Data chart
    useEffect(() => {
      if(linreg === undefined) return;
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
          Plot.dot(linreg, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(linreg, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
        strokeWidth:0.5
      });
      ref3.current.append(chart2);
      return () => chart2.remove();
    }, [linreg])


        // Missing Data chart
        useEffect(() => {
          if(linreg1 === undefined) return;
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
              Plot.dot(linreg1, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
              Plot.linearRegressionY(linreg1, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
            ],
            marginBottom: 50,
            strokeWidth:0.5
          });
          ref4.current.append(chart2);
          return () => chart2.remove();
        }, [linreg1])
return (
  <>
      <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          Interpolation Predictions - Before outlier removal
          </div>
        <div className="card-body">
          <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
            <p>Interpolation is a mathematical method that is commonly used to construct new points based off existing values in a given dataset. There are different types of interpolation methods that can be used, but for the purposes of this, a cubic method will be used to see how this changes the look of the chart. This is not best practice, and is meant to display that imputation with interpolation is not always the best method. Careful consideration should be taken to ensure that the interpolation method you use will produce the results you actually want. </p>
          <div className="col" ref={ref3} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
    <p>
      In the above chart, we can see that using the cubic method has caused our y-axis values to increase in range, and the distribution of data is entirely different to the original chart. Predicting the values with this method has decreased the relationship between the x and y. The massive spikes in the chart could be down to the fact that there are still outliers present, which could throw off the predictions.
    </p>
    
  </div>
  </div></div></div>

  <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          Interpolation Predictions - After outlier removal
          </div>
        <div className="card-body">
          <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
            <p>In the chart below, outliers have been removed to compare with the above chart. The same interpolation method has been used, the only difference here is that there are no outliers to see how well interpolation performs.</p>
          <div className="col" ref={ref4} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
<p>
  Here we can see that the chart has much less spikes, and the spikes that are present seem to be more evenly distributed than before. The relationship also appears to not be as strong, and even less strong than when there were outliers present in the data.
</p>
<p>How would you describe the impact of estimated data where there are some missing values, and how does this affect your understanding of the dataset?</p>
</div>
</div>
</div></div>
</>
  
  )
}

