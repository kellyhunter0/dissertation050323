import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';




export const MissingDataChart = () => {
    const ref =  useRef();
    const ref2 =  useRef();
    const [removeMissing, setRemoveMissing] = useState();
    const [missingData, setMissingData] = useState();

    useEffect(() => {
      d3.csv("/datasets/missing/missingremoved.csv", d3.autoType).then(setRemoveMissing);
    }, []);
    useEffect(() => {
      d3.csv("/datasets/missing/missingvalues.csv", d3.autoType).then(setMissingData);
    }, []);
  
    // Missing Data chart
    useEffect(() => {
      if(missingData === undefined) return;
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
          Plot.dot(missingData, {x: "carbon-monoxide", y: "lpg",  fill:"smoke"}),
          Plot.linearRegressionY(missingData, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
      ref.current.append(chart2);
      return () => chart2.remove();
    }, [missingData])

    // useEffect(() => {
    //   if(removeMissing === undefined) return;
    //   const chart2 = Plot.plot({
        
    //     style: {
    //       background: "transparent"
    //     },
    //     y: {
    //       grid: true
    //     },
    //     color: {
    //       type: "diverging",
    //       scheme: "burd",
    //       legend:true
    //     },
    //     marks: [
    //       Plot.ruleY([0]),
    //       Plot.dot(removeMissing, {y: "carbon-monoxide", x: "lpg",  fill:"smoke"}),
    //       Plot.linearRegressionY(removeMissing, {y: "carbon-monoxide", x: "lpg", stroke: "steelblue", ci: 0.95})
    //     ],
    //     marginBottom: 50,
    //   });
    //   ref2.current.append(chart2);
    //   return () => chart2.remove();
    // }, [removeMissing])
    return (
      <>

<div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          Missing Values
          </div>
        <div className="card-body">
          <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
          <p>
          Missing values have been created and removed from the original chart. This is to see how much missing data affects charts. As we will be using prediction methods to fill these in later, we can safely remove missing values and save this to another file for when imputation happens later. <br></br></p>
          <div className="col" ref={ref} style={{ marginLeft:'auto', marginRight:'auto'}}></div>

          <br></br>
          <br></br>
          <p>
          Based on the changes, do you notice a difference in the chart? It doesn't look like much, but over 80,000 rows were removed because there were missing values. Even though a lot of data has been removed, this does not appear to affect the Scatterplot much visually.
          <br></br>
        </p>
        <p>It will be interesting to see how the charts change visually when it comes to predicting the missing values.</p>

      </div>
      </div></div>
      {/* <div className="col" ref={ref2}>
        <p>
          Axis Values Flipped Around<br/> File Location:<code>./front-end/src/MissingChartGraph.js</code> and save to reload. 
        </p>
        <p>Values are randomly assigned as NaN and then kept in the dataset to compare with when they are removed.</p>
      </div> */}
    </div>

      </>


  
      )
  }
