import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export const LinRegChartMissing = () => {
    const ref =  useRef();
    const ref2 =  useRef();
    const [linreg, setLinReg] = useState();
    const [linregO, setLinRegO] = useState();

    useEffect(() => {
      d3.csv("/datasets/linear-regression/all-predicted-lr-outliers.csv", d3.autoType).then(setLinReg);
    }, []);
    useEffect(() => {
      d3.csv("/datasets/linear-regression/all-predicted-lr-outliers-removed.csv", d3.autoType).then(setLinRegO);
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
      });
      ref.current.append(chart2);
      return () => chart2.remove();
    }, [linreg])
    useEffect(() => {
      if(linregO === undefined) return;
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
          Plot.dot(linregO, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(linregO, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref2.current.append(chart2);
      return () => chart2.remove();
    }, [linregO])


    return (
      <>
      <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          Linear Regression Predictions - Before outlier removal
          </div>
        <div className="card-body">
          <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
          <p>
          Missing values that were created above have now been filled with Linear Regression predictions. Linear Regression really just finds values that follow the line of best fit. It will take a sample of data and generate new predictions based on this. Here, we make predictions before outlier removal, so the chart looks very interesting. <br></br></p>
          <div className="col" ref={ref} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
        
        <p>
        The spike in the chart could be to do with outliers, so it will be interesting to see the comparison where outliers are removed and then values are predicted.
        </p>
        
      </div>
</div></div></div>
<div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          Linear Regression Predictions - After outlier removal
          </div>
        <div className="card-body">
          <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
          <p>
          Missing values that were created above have now been filled with Linear Regression predictions where there are no outliers present. Linear Regression really just finds values that follow the line of best fit, so when outliers are removed and missing values are filled in with Linear Regression values, we should notice a difference in the <b>blue</b> line of best fit in the chart below.. <br></br>
          </p>
          <div className="col" ref={ref2} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
       
        <p>
        The outliers are removed, and the chart is visually different than before. The line of best fit is almost flat now, meaning there is not a strong relationship between the two variables. As missing values were applied after the outlier removal stage, a lot of the missing values were most likely the values that made up the linear relationship, and when these were filled in, the <b>integrity</b> of the relationship was affected.
        </p>
        <p>How would you describe the impact of estimated data where there are some missing values, and how does this affect your understanding of the dataset?</p>
      </div>
</div></div></div>
      </>
      )
    }

