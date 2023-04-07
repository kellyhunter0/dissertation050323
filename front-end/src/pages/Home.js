import '../assets/css/App.css';
import { Footer } from '../layout/Footer';
import React from 'react'; 
import { useLocation } from 'react-router';
import { CardOriginal } from '../components/ui/Card-Original';
import { CardOutliers } from '../components/ui/Card-Outliers';
import { CardKNN } from '../components/ui/Card-KNN';
import { CardLinearR } from '../components/ui/Card-LR';
import { CardMissing } from '../components/ui/Card-Missing';
import { CardNormalD } from '../components/ui/Card-NormalD'
import { CardNormalDMissing } from '../components/ui/Card-NormalDMissing'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { CardInterp } from '../components/ui/Card-Interp';

export default function HomeView(props) { 
  const location = useLocation()
  console.log(props, "props")
  console.log(location, "useLocation Hook")
  const data = location.state?.data
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
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

    <div className="page-header min-vh-70 home" style={{minHeight: "500px"}}>
  
    
    <div className="container">
      <div className="row">
 
        
        <div className="col-lg-7 col-md-6 d-flex  flex-column header-mobile" style={{marginTop:"60px", marginRight:"30px"}}>
          
          <h1 className="text-white mb-4 justify-content-left" id="name-text"  value='pageName'>Welcome</h1>
          <p className="text-white opacity-8 lead align-items-left header-p">This is an online tool that aims to help improve data literacy by highlighting that data sets are not always perfect; more often than not, they are present with dirty data. This includes things like outliers, wrong readings in the form of noise, and missing data. This website will teach ways of filling in missing data using approximation, show how to handle outliers and showcase data that has added noise.  The original Dataset is an IOT Environmental Sensor Telemetry dataset that contains over <b>400,000</b> rows and <b>9 columns</b>. By talking through the different charts and explaining how to read the <em>x</em> and <em>y</em> axis, you will gain an understanding on how to interpret data. </p>
          <div className="buttons">
          <div className="btn-group btn-group" data-toggle="buttons">
        <label className="btn btn-white text-white">
              <a href="#home" className='text-dark'>Start</a>
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
<div className="container-fluid" style={{alignItems:"center"}}>
 
      <h1 id='home'>{data?data.pageName:"Home"}</h1>
      <Grid container spacing={3} display='flex'  className="container-fluid" style={{marginLeft:"auto", marginRight:'auto'}} alignItems='center' padding=''>
      <Grid xs="auto">
        <Item><CardOriginal/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardMissing/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardOutliers/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardNormalD/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardNormalDMissing/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardKNN/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardNormalDMissing/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardInterp/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardLinearR/></Item>
      </Grid>
    </Grid>
        
 <br></br>
 <br></br>
 <br></br>
        {/* <OriginalDataChart></OriginalDataChart> */}

        </div>    </div>
        <div className='col-lg-12'>
        <Footer></Footer>
        </div>
    </>


  );


 
}


  


