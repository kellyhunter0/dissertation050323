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

<div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'auto'}}>
        <div className="card-header">
          10% Noise
          </div>
        <div className="card-body">
          <div className="col" style={{ marginLeft:'auto', marginRight:'auto'}}>
            <p>The visualisation we seen of the original data was very clean, which really means that the points on the chart do not seem to deviate from the line. To showcase what noise can do to charts, 10% of the data in the <strong>lpg</strong> column is changed into data generated from a Normal Distribution. This basically means that most values will be within a similar range, all gathering at a central point and trailing off at either side of the range. Visually, data plotted on a Scatterplot might appear to look like a <strong>bell curve</strong></p><p>In data that follows a Normal Distribution, the measures of central tendency (mean, mode and median) are exactly the same.</p>  
          <div className="col" ref={ref3} style={{ marginLeft:'auto', marginRight:'auto'}}></div>

    <p>
      The chart shows that when 10% of the data is altered with "noise", the line of best fit (in blue on the chart) is affected slightly. This line of best fit is a good way to express how the relationship changes on the Scatterplot when the lpg variable on the y axis is altered. The line of best fit now starts at roughly 0.005 on the y axis, compared to 0.004 on the original chart. The noise generated ranges roughly between 0.004 and 0.010, which can be seen visualised above. There doesn't appear to be a bell curve on this chart, but what will happen when 40% of the data is changed?
    </p>
    <p></p>
    

    </div>
  </div>
  </div>
  </div>

  <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'auto'}}>
        <div className="card-header">
          40% Noise
          </div>
        <div className="card-body">
  <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
    <p>In this chart, 40% of the data in the lpg column is changed into data generated from a Normal Distribution. As stated, Normal Distributions are where values place within a similar range and look like a bell curve when plotted on a Scatterplot. </p>
  <div className="col" ref={ref4} style={{ marginLeft:'auto', marginRight:'auto'}}> </div>
    <p>  In the above chart, a bell curve can be identified! The original positive linear relatinship line can still be seen slightly in amongst the data, but it's very different from the original chart we seen at the start. The data seems to be clustering at the start of the chart, which would suggest that this is a Right Skewed Normal Distribution, which means it is positively skewed. This could happen for a number of reasons, the most notable would be because there higher values farther from the peak. This is a type of <strong>Asymmetric Distribution</strong>, which is a fancy way of saying the chart is not visually symmetrical.
    </p>
    
    <p></p>
    
    </div> 
  </div>
  </div>
  </div>
  

  </>

  
  )
}

