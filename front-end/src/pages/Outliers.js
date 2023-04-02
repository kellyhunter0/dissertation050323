import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import React from 'react'; 
import { OutlierDataChart } from '../components/entity/OutlierChartGraph';
import { useLocation } from 'react-router';




export default function OutlierView(props) { 
 const location = useLocation()
 console.log(props, "props")
 console.log(location, "useLocation Hook")
 const data = location.state?.data
// logs API values to the backend
  // const dig = (obj, target) =>
  // target in obj
  //   ? obj[target]
  //   : Object.values(obj).reduce((acc, val) => {
  //       if (acc !== undefined) return acc;
  //       if (typeof val === 'object') return dig(val, target);
  //     }, undefined); url(../assets/img/headingOutliers.gif)

  return (
    <>
<header className='bg-light' style={{background: "linear-gradient(180.3deg, rgb(221, 221, 221) 5.5%, rgb(110, 136, 161) 90.2%)"}}>
    <div className="white-box" ></div>
    <div className="page-header min-vh-50 outliers" >
    <div className="  min-vh-50">
    
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-md-6 d-flex justify-content-center flex-column" style={{marginTop:"50%"}}>
          <h1 className="text-white mb-4" id="name-text" style={{zIndex:'1'}} value='pageName'></h1>
          <p className="text-white opacity-8 lead pe-5 me-5"></p>
          <div className="buttons">
   
          </div>
        </div>
        
        <div className="col-lg-7 col-md-6 d-flex  flex-column" style={{marginTop:"40%", paddingRight:"10%", borderLeft:"1px"}}>
          
          <h1 className="text-white mb-4" id="name-text" style={{zIndex:'1'}} value='pageName'>Outliers</h1>
          <p className="text-white opacity-8 lead ">Outliers are values that fall out-with the normal range. Having a large number present in your data can alter charts and alter the line of best fit in Linear Regression calculations. Removing outliers is sometimes necessary to get a clearer picture. The line of best fit is in <strong>blue</strong> on the charts below.  </p>
          <div className="buttons">
            <a href="#outliers" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Get Started</button>
            </a>
            <a href="/NormalDistribution" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Next Page</button>
            </a>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </header>

    {/* {data?data.pageName:"Outliers"}  - pass data between pages using react-router location*/}
        {/* {document.getElementById('name-text').innerText = "Outliers"}
        */}
        <div className="Page-Header align-items-center">
        <h1 id='outliers'>{data?data.pageName:"Outliers"}</h1>

        <div className='container-fluid'>

        <OriginalDataChart></OriginalDataChart>
        <OutlierDataChart/>
        <a href="/NormalDistribution" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Next Page</button>
            </a>
</div>
</div>
    </>


  );


 
}


  


