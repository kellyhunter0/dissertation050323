import '../assets/css/App.css';
import '../assets/css/material-kit.css';
import {ResponsiveAppBar} from "../layout/ResponsiveAppBar";
import {Header} from "../layout/Header";
import React, {useState} from 'react'; 
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LinearView from './LinearReg';
import InterpolationView from './Interpolate';
import MissingView from './Missing';
import OriginalView from './Original';
import OutlierView from './Outliers';
import HomeView from './Home';
import KNNView from './KNN';
import NormalDistributionView from './NormalDistribution';




// Folder structure in src was inspired by these articles
/*
 https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76
 https://www.sitepoint.com/react-firebase-build-mvp/
 */
export default function App() { 

// logs API values to the backend
  // const dig = (obj, target) =>
  // target in obj
  //   ? obj[target]
  //   : Object.values(obj).reduce((acc, val) => {
  //       if (acc !== undefined) return acc;
  //       if (typeof val === 'object') return dig(val, target);
  //     }, undefined);




  return (
    <>
    
    
      <BrowserRouter>
      
    <ResponsiveAppBar/>

   

    <div className="App-header">
    
    
        <Routes>
          <Route path="/Home" Component={HomeView}/>
          <Route path="/" Component={HomeView}/>
          <Route path="/Interpolate" Component={InterpolationView}/>
          <Route path="/LinearReg" Component={LinearView}/>
          <Route path="/Missing" Component={MissingView}/>
          <Route path="/Original" Component={OriginalView}/>
          <Route path="/Outliers" Component={OutlierView}/>
          <Route path="/KNN" Component={KNNView}/>
          <Route path="/NormalDistribution" Component={NormalDistributionView}/>
        </Routes>
        </div>
        
      </BrowserRouter>

    {/* <div className="App">

    <ResponsiveAppBar></ResponsiveAppBar>

      <header className="App-header">
        <p>
          
          
        </p>
        
        <OriginalDataChart></OriginalDataChart>
 
        <MissingDataChart></MissingDataChart>
        <OutlierDataChart></OutlierDataChart>
        <LinRegChartMissing></LinRegChartMissing>
        <GuassianDistribChart></GuassianDistribChart>
        <InterpolationChart></InterpolationChart>
      </header>
    </div> */}
    </>


  );


 
}


  


