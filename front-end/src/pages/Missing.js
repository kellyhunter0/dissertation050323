import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import {MissingDataChart} from "../components/entity/MissingChartGraph";
import React from 'react'; 
import { useLocation } from 'react-router';
import {Footer} from '../layout/Footer'


export default function MissingView(props) { 
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

<div className="page-header min-vh-70 missing" style={{minHeight: "500px"}}>


<div className="container">
  <div className="row">

    
    <div className="col-lg-7 col-md-6 d-flex  flex-column header-mobile" style={{marginTop:"60px", marginRight:"30px"}}>
      
      <h1 className="text-white mb-4 justify-content-left" id="name-text"  value='pageName'>Missing Data</h1>
      <p className="text-white opacity-8 lead align-items-left header-p">   Halfing the data did not affect the look of the chart, so the investigation now centers around creating missing values so we can compare methods of dealing with missing data later on. Leaving missing data in the dataset is bad practice in data science so there needs to be methods of dealing with this.   </p>
      <div className="buttons">
      <div className="btn-group btn-group" data-toggle="buttons">
        <label className="btn btn-secondary text-white">
          <a href="#original" className='text-white'>Start</a>
        </label>
        <label className="btn btn-white text-white">
          <a href="/Outliers" className='text-dark'> Next Page</a>
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
    
    {/* {document.getElementById('name-text').innerText = "Missing"} */}
    <div className="Page-Header align-items-center">
    <h1 id='missing'>{data?data.pageName:"Missing Data"}</h1>
  

        <OriginalDataChart></OriginalDataChart>
        <MissingDataChart></MissingDataChart>
        <a href="/Outliers" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Next Page</button>
            </a>
</div>

<div className='col-lg-12'>
        <Footer></Footer>
        </div>
    </>


  );


 
}

  


