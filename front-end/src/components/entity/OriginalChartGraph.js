import * as Plot from "@observablehq/plot";

import * as d3 from "d3";
import React, {useEffect, useRef, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { style } from "d3";


export function OriginalDataChart(headerRef){
    headerRef = useRef();
    const [bigData, setBigData] = useState();
  
    
  
    useEffect(() => {
      d3.csv("/datasets/original/half-removed.csv", d3.autoType).then(setBigData);
    }, []);
  
    
    useEffect(() => {
      if (bigData === undefined) return;
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
          
          Plot.dot(bigData, {x: "carbon-monoxide", y: "lpg", fill:"smoke"}),
          Plot.linearRegressionY(bigData, {x: "carbon-monoxide", y: "lpg", stroke: "steelblue", ci: 0.95}),
          
        ],
        marginBottom: 50,
        strokeWidth:0.5
      });

  
      headerRef.current.append(chart);
      return () => chart.remove();
    }, [bigData]);
    return (
      <>

        <div className="col-lg-8" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card" style={{backgroundColor:"rgba(95, 95, 95, 0.1)", margin:'0, auto'}}>
        <div className="card-header">
          Dataset before any alterations
          </div>
        <div className="card-body">
          <div className="col" style={{ marginLeft:'auto', marginRight:'auto'}}>
          <p>
            <br></br>
            This chart is <strong>Scatterplot</strong>, which is a common correlation chart function used by Data Scientists to test how much things depend on one another. That is, it tests the strength of the relationship between two variables. In the case of this dataset, we model Liquified Pertroleum Gas (lpg), Carbon Monoxide (co) and Smoke which are all measured in ppm. This stands for parts per million, and this is a measurement for the mass of a chemical or contaminate per unit of volume of water. So, this essentially measures it in the air and records the amount in ppm.
            <br></br>
            <br></br>
            </p>
          <div className="col" ref={headerRef} style={{ marginLeft:'auto', marginRight:'auto'}}></div>
          <p>
            When two variables are said to have a relationship, this means they are correlated either negatively or positively. In the case of this data, we can see that this is a positive linear relationship as the chart direction points upward and to the right. So what does this mean? Well, it means that as Liquified Pertroleum Gas increases, so do Smoke and Carbon Monoxide. 
          </p>
          </div>
        </div>
        </div>
        </div>
      </>
 

    
      )
   
}
