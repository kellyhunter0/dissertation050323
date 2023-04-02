
import { CNavbar } from '@coreui/react';
import { CNavbarBrand } from '@coreui/react';
import { CNavbarNav } from '@coreui/react';
import { CButton } from '@coreui/react';
import { CNavItem } from '@coreui/react';
import {CNavLink} from '@coreui/react';
import { CDropdown } from '@coreui/react';
import { CDropdownItem } from '@coreui/react';
import { CDropdownMenu } from '@coreui/react';
import { CDropdownToggle } from '@coreui/react';
import { CNavbarToggler } from '@coreui/react';
import { COffcanvas } from '@coreui/react';
import { COffcanvasBody } from '@coreui/react';
import { COffcanvasHeader } from '@coreui/react';
import { COffcanvasTitle } from '@coreui/react';
import { CContainer } from '@coreui/react';
import { CCloseButton } from '@coreui/react';
import { CDropdownDivider } from '@coreui/react';
import { CForm } from '@coreui/react';
import { CFormInput } from '@coreui/react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import MenuIcon from '@mui/icons-material/Menu';



/*
Author: Kelly Hunterr
Source: https://react-bootstrap.github.io/components/offcanvas/
Function of component: This componentised the navigation menu so we can load this in with the <ResponsiveAppBar/> notation in the return HTML statement.
*/

import React, {useState} from 'react';

export const Header = () => {
    const [pageName, setPageName] = useState("")
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    function myFunction(x) {
      x.classList.toggle("less-icon");
    }
    // return (
    //   <CNavbar colorScheme="dark" className="bg-dark" expand="xxl">
        
    //     <CNavbarBrand className='brand'>
    //     <ScatterPlotIcon className="react-logo" style={{fontSize: "60px" }}></ScatterPlotIcon>
    //     <span style={{marginLeft: "100px"}}>DataViz</span>
          
    //       <CNavbarToggler className="toggler"
    //         aria-controls="offcanvasNavbar2"
    //         aria-label="Toggle navigation"
    //         onClick={() => setVisible(!visible)}
    //         />
          
    //       </CNavbarBrand>
    //       DataViz
       
    //     <CContainer fluid>
    //     </CContainer>
    //   </CNavbar>
    // )
return (
    <header>
    <div className="page-header min-vh-50" style={{backgroundImage: "url(&#39;https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80&#39;);", loading:"lazy"}}>
    <span className="mask bg-gradient-dark opacity-5"></span>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-7 d-flex justify-content-center flex-column">
          <h1 className="text-white mb-4" id="name-text" value='pageName'>{pageName}</h1>
          <p className="text-white opacity-8 lead pe-5 me-5">The time is now for it be okay to be great. People in this world shun people for being nice. </p>
          <div className="buttons">
            <button type="button" className="btn btn-white mt-4">Get Started</button>
            <button type="button" className="btn text-white shadow-none mt-4">Read more</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

    )
    
}
