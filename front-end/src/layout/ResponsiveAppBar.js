
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

export const ResponsiveAppBar = () => {
  const [data, setData] = useState({
    pageName:"Default"
  })
    const [visible, setVisible] = useState(false)
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

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
  
  <CNavbar colorScheme="dark" className="bg-dark" expand="xxl" style={{height:"100px", marginLeft:0}}>
    <CNavbarBrand className='navbar-brand'>

       <ScatterPlotIcon className="react-logo" style={{fontSize: "60px", color:"white"}}></ScatterPlotIcon>
         <h3 style={{marginLeft: "100px", color:"white"}}>DataViz</h3>
          
           <CNavbarToggler className="toggler" 
             aria-controls="offcanvasNavbar2"
             aria-label="Toggle navigation"
             onClick={() => setVisible(!visible)}
             ><MenuIcon></MenuIcon></CNavbarToggler>
        </CNavbarBrand>
    <CContainer fluid>
      <COffcanvas id="offcanvasNavbar2" style={{color:"white", backgroundColor:"#303030"}} placement="end" scroll={true} portal={false} visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>DataViz</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CNavbarNav>
            <CNavItem>
              <CNavLink href="/Home" state={{data:data}} >
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/Original" state={{data:data}} >Original Data</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/Missing" state={{data:data}} >Missing Data</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/Outliers" state={{data:data}} >Outliers</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/NormalDistribution" state={{data:data}} >Normal Distribution</CNavLink>
            </CNavItem>
            <CDropdown variant="nav-item" popper={false} >
              
                
              <CDropdownToggle color="" className="dropdown-toggle" style={{display: "none"}} >
                Data Prediction
                <ExpandMoreIcon />
  
              </CDropdownToggle>
            
              <CDropdownMenu className='dropdown-toggle'>
              <CDropdownItem href="/NormalMissing" state={{data:data}}>Normal Distribution</CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem href="/KNN" state={{data:data}}>K-Nearest Neighbour</CDropdownItem>
              <CDropdownDivider />
                <CDropdownItem href="/Interpolate" state={{data:data}}>Interpolation</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="/LinearReg" state={{data:data}}>Linear Regression</CDropdownItem>
                
              </CDropdownMenu>
            </CDropdown>
            <CNavItem>
              <CNavLink href="#">
                All charts
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
        </COffcanvasBody>
      </COffcanvas>
    </CContainer>
  </CNavbar>
    )
    
}
