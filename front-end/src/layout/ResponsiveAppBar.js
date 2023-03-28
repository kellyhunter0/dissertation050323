
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
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';




/*
Author: Kelly Hunterr
Source: https://react-bootstrap.github.io/components/offcanvas/
Function of component: This componentised the navigation menu so we can load this in with the <ResponsiveAppBar/> notation in the return HTML statement.
*/

import React, {useState} from 'react';

export const ResponsiveAppBar = () => {
    const [visible, setVisible] = useState(false)
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
  <CNavbar colorScheme="dark" className="bg-dark" expand="xxl" style={{height:"100px"}}>
    <CNavbarBrand className='brand'>

       <ScatterPlotIcon className="react-logo" style={{fontSize: "60px" }}></ScatterPlotIcon>
         <span style={{marginLeft: "100px"}}>DataViz</span>
          
           <CNavbarToggler className="toggler"
             aria-controls="offcanvasNavbar2"
             aria-label="Toggle navigation"
             onClick={() => setVisible(!visible)}
             />
        </CNavbarBrand>
    <CContainer fluid>
      <COffcanvas id="offcanvasNavbar2" style={{color:"white", backgroundColor:"#303030"}} placement="end" scroll={true} portal={false} visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>Offcanvas</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CNavbarNav>
            <CNavItem>
              <CNavLink href="/Home" active>
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/Original">Original Data</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/Missing">Missing Data</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/Outliers">Outliers</CNavLink>
            </CNavItem>
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Data Prediction</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="/LinearReg">Linear Regression</CDropdownItem>
                <CDropdownItem href="/Interpolate">Interpolation</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="/KNN">K-Nearest Neighbour</CDropdownItem>
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
