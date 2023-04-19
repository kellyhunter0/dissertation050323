import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import React from 'react'; 
import {InterpolationChart} from '../components/entity/InterpolationChart';
import { NoiseChart } from '../components/entity/NoiseChart';
import { useLocation } from 'react-router';
import {Footer} from '../layout/Footer'

export default function NoiseView(props) { 
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

<div className="page-header min-vh-70 noisy" style={{minHeight: "500px"}}>


<div className="container">
  <div className="row">

    
    <div className="col-lg-7 col-md-6 d-flex  flex-column header-mobile" style={{marginTop:"60px", marginRight:"30px"}}>
      
      <h1 className="text-white mb-4 justify-content-left" id="name-text"  value='pageName'>Noisy Data</h1>
      <p className="text-white opacity-8 lead align-items-left header-p">    As the original variables do not contain much noise, for the purposes of demonstration, noise is applied to the LPG value. Noise is basically meaningless data, and the purpose is to see how much of this data can affect the chart visuals. This is done by replacing 10% of the values with Normally Distributed data, then 40% of the values are replaced. These Scatterplots will then be explained based on the output. It is expected that the difference in each chart will be noticable.  </p>
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
      <h1 id='normald'>{data?data.pageName:"Noisy Data"}</h1>
        <OriginalDataChart></OriginalDataChart>
        <NoiseChart></NoiseChart>
        <a href="/NormalMissing" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Next Page</button>
            </a>
</div>

<div className='col-lg-12'>
        <Footer></Footer>
        </div>
    </>


  );


 
}


  


