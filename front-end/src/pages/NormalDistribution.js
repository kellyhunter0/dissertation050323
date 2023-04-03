import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import React from 'react'; 
import {InterpolationChart} from '../components/entity/InterpolationChart';
import { NormalDistributionChart } from '../components/entity/NormalDistributionChart';
import { useLocation } from 'react-router';


export default function NormalDistributionView(props) { 
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
  //     }, undefined);

  return (
    <>
      <header className='bg-light' style={{background: "linear-gradient(180.3deg, rgb(221, 221, 221) 5.5%, rgb(110, 136, 161) 90.2%)"}}>

<div className="page-header min-vh-70 normald" style={{minHeight: "500px"}}>


<div className="container">
  <div className="row">

    
    <div className="col-lg-7 col-md-6 d-flex  flex-column header-mobile" style={{marginTop:"60px", marginRight:"30px"}}>
      
      <h1 className="text-white mb-4 justify-content-left" id="name-text"  value='pageName'>Normal Distribution</h1>
      <p className="text-white opacity-8 lead align-items-left header-p">This is a free online tool that aims to help improve data literacy and give an introduction to Data Analysis and Data Science. By talking through the different charts and explaining how to read the <em>x</em> and <em>y</em> axis, you will gain an understanding on how to interpret data. The original Dataset is an IOT Envoironmental Sensor Telemetry dataset that contains over 400,000 rows and 9 columns.   </p>
      <div className="buttons">
      <div className="btn-group btn-group" data-toggle="buttons">
        <label className="btn btn-secondary text-white">
          <a href="#normald" className='text-white'>Start</a>
        </label>
        <label className="btn btn-white text-white">
          <a href="/NormalMissing" className='text-dark'> Next Page</a>
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
        {/* {document.getElementById('name-text').innerText = "Normal Distribution"} */}
        <div className="Page-Header align-items-center">
      <h1 id='normald'>{data?data.pageName:"Normal Distribution"}</h1>
        <OriginalDataChart></OriginalDataChart>
        <NormalDistributionChart></NormalDistributionChart>
        <a href="/KNN" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Next Page</button>
            </a>
</div>
    </>


  );


 
}


  


