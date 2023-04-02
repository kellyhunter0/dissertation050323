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
        <div className="col-lg-5 col-md-6 d-flex justify-content-left flex-column" style={{marginTop:"10%", paddingBottom:"10px"}}>
          <h1 className="text-white mb-4" id="name-text" style={{zIndex:'1'}} value='pageName'></h1>
          <p className="text-white opacity-8 lead pe-5 me-5"></p>
          <div className="buttons">
   
          </div>
        </div>
        
        <div className="col-lg-7 col-md-6 d-flex  flex-column" style={{marginTop:"60px", marginRight:"30px"}}>
          
          <h1 className="text-white mb-4 justify-conent-left" id="name-text" style={{zIndex:'1'}} value='pageName'>Welcome</h1>
          <p className="text-white opacity-8 lead align-items-left">This is a free online tool that aims to help improve data literacy and give an introduction to Data Analysis and Data Science. By talking through the different charts and explaining how to read the <em>x</em> and <em>y</em> axis, you will gain an understanding on how to interpret data. The original Dataset is an IOT Envoironmental Sensor Telemetry dataset that contains over 400,000 rows and 9 columns.   </p>
          <div className="buttons">
          <a href="#home" className='btn'>
            <button type="button"  className="btn btn-white mt-4">Get Started</button>
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
  </header>
  <div className="Page-Header align-items-center">
<div className="container-fluid" style={{alignItems:"center"}}>
 
      <h1 id='home'>{data?data.pageName:"Home"}</h1>
      <Grid container spacing={3} display='flex'  className="container" style={{marginLeft:"auto", marginRight:'auto'}} alignItems='center' padding=''>
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
        <Item><CardKNN/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardInterp/></Item>
      </Grid>
      <Grid xs="auto">
        <Item><CardLinearR/></Item>
      </Grid>
    </Grid>
        
 
        {/* <OriginalDataChart></OriginalDataChart> */}

        </div>    </div>
        <footer>
        <Footer></Footer>
        </footer>
    </>


  );


 
}


  


