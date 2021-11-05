import { useState } from "react";
import {
  MDBNavbar as Navbar,
  MDBNavbarNav as NavbarNav,
  MDBNavItem as NavItem,
  MDBNavbarToggler as NavbarToggler,
  MDBCollapse as Collapse,
} from "mdbreact";
import Login from "./Login";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  return (
    <Navbar color="mdb-color" dark expand="md">
      <NavbarToggler onClick={toggleCollapse} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarNav right>
          <NavItem>
            <Login />
          </NavItem>
        </NavbarNav>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
