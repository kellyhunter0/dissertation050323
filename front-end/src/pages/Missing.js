import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import {MissingDataChart} from "../components/entity/MissingChartGraph";
import React from 'react'; 
import { Header } from '../layout/Header';
import { useLocation } from 'react-router';



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
    <div className="white-box" ></div>
    <div className="page-header min-vh-50 missing" >
    <div className="  min-vh-50">
    
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-md-6 d-flex justify-content-center flex-column" style={{marginTop:"50%"}}>
          <h1 className="text-white mb-4" id="name-text" style={{zIndex:'1'}} value='pageName'></h1>
          <p className="text-white opacity-8 lead pe-5 me-5"></p>
          <div className="buttons">

          </div>
        </div>
        
        <div className="col-lg-7 col-md-6 d-flex  flex-column" style={{marginTop:"50%", paddingRight:"10%", borderLeft:"1px"}}>
          
          <h1 className="text-white mb-4" id="name-text" style={{zIndex:'1'}} value='pageName'>Missing Data</h1>
          <p className="text-white opacity-8 lead ">The time is now for it be okay to be great. People in this world shun people for being nice. </p>
          <div className="buttons">
          <a href="#missing" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Get Started</button>
            </a>
            <a href="/Outliers" className='btn'>
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
    
    {/* {document.getElementById('name-text').innerText = "Missing"} */}
    <div className="Page-Header align-items-center">
    <h1 id='missing'>{data?data.pageName:"Missing Data"}</h1>
  

        <OriginalDataChart></OriginalDataChart>
        <MissingDataChart></MissingDataChart>
</div>
    </>


  );


 
}

  


