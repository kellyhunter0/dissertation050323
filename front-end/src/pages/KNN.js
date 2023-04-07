import '../assets/css/App.css';
import {OriginalDataChart} from "../components/entity/OriginalChartGraph";
import { MissingDataChart } from '../components/entity/MissingChartGraph';
import React from 'react'; 
import {KNNChart} from '../components/entity/KNNChart';
import { useLocation } from 'react-router';
import {Footer} from '../layout/Footer'

export default function KNNView(props) { 
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

<div className="page-header min-vh-70 knn" style={{minHeight: "500px"}}>


<div className="container">
  <div className="row">

    
    <div className="col-lg-7 col-md-6 d-flex  flex-column header-mobile" style={{marginTop:"60px", marginRight:"30px"}}>
      
      <h1 className="text-white mb-4 justify-content-left" id="name-text"  value='pageName'>Data Prediction<br></br>K-Nearest Neighbour</h1>
      <p className="text-white opacity-8 lead align-items-left header-p">    K-Nearest Neighbour is a way of estimating values by looking for the value it's closest to based off the number of neighbours its nearest to. KNN is used to predict missing values where there are outliers present, and also to predict missing values where the outliers have been removed.   </p>
      <div className="buttons">
      <div className="btn-group btn-group" data-toggle="buttons">
        <label className="btn btn-secondary text-white">
          <a href="#original" className='text-white'>Start</a>
        </label>
        <label className="btn btn-white text-white">
          <a href="/Interpolate" className='text-dark'> Next Page</a>
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
        {/* {document.getElementById('name-text').innerText = "KNN"} */}
        <div className="Page-Header align-items-center">
        <h1 id='knn'>{data?data.pageName:"KNN Chart"}</h1>
        <MissingDataChart/>
        <KNNChart/>
        <a href="/Interpolate" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Next Page</button>
            </a>
        </div>
        <div className='col-lg-12'>
        <Footer></Footer>
        </div>
    </>


  );


 
}


  


