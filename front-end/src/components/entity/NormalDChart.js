import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export function GuassianDistribChart(headerRef){
    headerRef = useRef();
    const refgd = useRef();
    const refgdoutliers = useRef();
    const [gd, setGD] = useState();
    const [gdoutliers, setGDoutliers] = useState();
    
  
    


    useEffect(() => {
      d3.csv("/datasets/normal-distribution/missing-filled-nd.csv", d3.autoType).then(setGD);
    }, []);

    useEffect(() => {
      d3.csv("/datasets/normal-distribution/missing-filled-nd-nooutliers.csv", d3.autoType).then(setGDoutliers);
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

    useEffect(() => {
      if (gdoutliers === undefined) return;
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
          Plot.dot(gdoutliers, {x: "carbon-monoxide", y: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(gdoutliers, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
  
      refgdoutliers.current.append(chart);
      return () => chart.remove();
    }, [gdoutliers]);

    return (

      <>
  <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'auto'}}>
        <div className="card-header">
             Data Prediction
          <p>Normal Distribution<br></br></p>
          </div>
        <div className="card-body">
  <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
      <p>In the chart below, the missing values have been filled in with Normal Distribution values where outliers have been kept. The output is interesting, it shows the presence of the positive linear relationship, but the filled in values now represent a <b>Right Skewed Normal Distribution</b>. This makes sense, as outliers are extreme values in data and these could easily skew the chart. </p>
        <div className="col" ref={refgd} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
        <p>Based on the chart above, we can see that the integrity of the relationship is still intact, but the line of best fit has changed and now sits at just before 0.006 and the slope is less steep. This means the strength of the relationship has decreased a little as a result of filling in the missing values with this data. </p>
        

        </div>
        </div>
        </div>
        </div>
        

        <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'auto'}}>
        <div className="card-header">
             Data Prediction
          <p>Normal Distribution<br></br></p>
          </div>
        <div className="card-body">

  <div className="col"  style={{ marginLeft:'auto', marginRight:'auto'}}>
  <p>In the chart below, the missing values have been filled in with Normal Distribution values where outliers have been removed. The output is interesting, the presence of the positive linear relationship is very faint, and the filled in values now represent a <b>Symmetric Normal Distribution</b>, which is the classic bell curve shape we spoke about. This makes sense, as outliers are extreme values in data and these could easily skew the chart, so removing them means the chart is more symmetrical than before as there aren't any extreme values to skew it. </p>
        <div className="col" ref={refgdoutliers} style={{ marginLeft:'auto', marginRight:'auto'}}>
        </div>
        <p>Based on the chart above, we can see that the integrity of the relationship has been impacted, the line of best fit has changed and now sits at just before 0.006 and is a lot more flat than before. This means the strength of the relationship has decreased quite a bit as a result of filling in the missing values with this data. </p><br></br><p>How would you describe the impact of estimated data where there are some missing values, and how does this affect your understanding of the dataset?</p>
        </div>
        </div>
      </div></div>
      </>



      )
  
   
}
