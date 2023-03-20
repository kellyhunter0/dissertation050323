import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';



export function GuassianDistribChart(headerRef){
    headerRef = useRef();
    const refgd = useRef();
    const refgd40 = useRef();
    const [gd, setGD] = useState();
    const [gd40, setGD40] = useState();
  
    


    useEffect(() => {
      d3.csv("/datasets/normal-distribution/guassiandistrib-10.csv", d3.autoType).then(setGD);
    }, []);
    useEffect(() => {
      d3.csv("/datasets/normal-distribution/guassiandistrib-40.csv", d3.autoType).then(setGD40);
    }, []);
    useEffect(() => {
      if (gd === undefined) return;
      const chart = Plot.plot({
  
        style: {
          background: "transparent"
        },
        y: {
          grid: true
        },
        color: {
          type: "diverging",
          scheme: "burd",
          legend: true,
          background: "transparent",
          
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
      if (gd40 === undefined) return;
      const chart = Plot.plot({
  
        style: {
          background: "transparent"
        },
        y: {
          grid: true
        },
        color: {
          type: "diverging",
          scheme: "burd",
          legend: true,
          background: "transparent",
          
        },
        marks: [
          Plot.ruleY([0]),
          Plot.dot(gd40, {x: "carbon-monoxide", y: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(gd40, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95})
        ],
        marginBottom: 50,
      });
  
      refgd40.current.append(chart);
      return () => chart.remove();
    }, [gd40]);
    return (

      <>
        <header className="App-header" ref={refgd}>
        <p>
          Guassian Distribution chart (10% of values) <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>The lpg values have been removed from a sample of 10% of the data and replaced with ones that will show a guassian distribution</p>

        </header>
        <header className="App-header" ref={refgd40}>
        <p>
          Guassian Distribution chart (40% of values) <br/> File Location:<code>./front-end/src/OutlierChartGraph.js</code> and save to reload. 
        </p>
        <p>The lpg values have been removed from a sample of 40% of the data and replaced with ones that will show a guassian distribution</p>

        </header>
      </>



      )
  
   
}
