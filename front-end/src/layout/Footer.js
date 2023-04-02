import React from "react";
import { CFooter, CContainer, CCol, CBox, CBtn, CIcon, CLink } from '@coreui/react';
import Button from '@mui/material/Button';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export const Footer = () => 


<><footer className=" footer font-small bg-dark opacity-8 text-white blue pt-4">

    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-lg-12  mt-md-0 mt-3">
                <li className="list-unstyled"></li>
                <h5 style={{marginRight:"7em", marginTop:"5px"}}><ScatterPlotIcon className="react-logo text-white" ></ScatterPlotIcon></h5>
                <h5 className="text-uppercase text-white" >DataViz</h5>
                {/* <p>Here you can use rows and columns to organize your footer content.</p> */}
            </div>



        </div>
        <div className="col-lg-12 col-md-6 mb-md-0 mb-3">
    <div className="footer-copyright text-center h6 text-white ">© 2023
        <a href="https://www.linkedin.com/in/kelly-hunter-5a56181b7/" target={"_blank"} className="social-hover"> Kelly Hunter</a><br></br>

    </div>
    </div>
    </div>


</footer>
</>
export default Footer
   

