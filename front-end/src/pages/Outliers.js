import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import React from 'react'; 
import { OutlierDataChart } from '../components/entity/OutlierChartGraph';
import { useLocation } from 'react-router';
import {Footer} from '../layout/Footer'



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

<div className="page-header min-vh-70 outliers" style={{minHeight: "500px"}}>


<div className="container">
  <div className="row">
    <div className="col-lg-7 col-md-6 d-flex  flex-column header-mobile" style={{marginTop:"60px", marginRight:"30px"}}>
      <h1 className="text-white mb-4 justify-content-left" id="name-text"  value='pageName'>Outlier Data</h1>
      <p className="text-white opacity-8 lead align-items-left header-p">    Exploratory data analysis is performed to identify any outliers in the data. Outliers are points that lie outside the range of normal, so something might be too high or too low depending on the context, and this can alter the chart output and change the line of best fit. There will be a comparison of charts with and without outliers.   </p>
      <div className="buttons">
      <div className="btn-group btn-group" data-toggle="buttons">
        <label className="btn btn-secondary text-white">
          <a href="#outliers" className='text-white'>Start</a>
        </label>
        <label className="btn btn-white text-white">
          <a href="/NoisyData" className='text-dark'> Next Page</a>
        </label>
      </div>
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
</header>
        <div className="Page-Header align-items-center">
        <h1 id='outliers'>{data?data.pageName:"Outliers"}</h1>
          <OriginalDataChart></OriginalDataChart>
          <OutlierDataChart></OutlierDataChart>
        <a href="/NoisyData" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Next Page</button>
        </a>
        </div>

        <div className='col-lg-12'>
        <Footer></Footer>
        </div>
    </>


  );


 
}


  


