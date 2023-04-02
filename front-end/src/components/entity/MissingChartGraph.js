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

  <div className="row">
    <div className="col" ref={ref}>
        <p>
          Removal of Created Missing Values <br/> File Location:<code>./front-end/src/MissingChartGraph.js</code> and save to reload. 
        </p>
        <p>Values are randomly assigned as NaN and then removed from the dataset to compare with the first chart.</p>

      </div>
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
