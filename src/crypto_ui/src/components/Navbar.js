import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home Page
                    </NavLink>
                    <NavLink to="/allowance" activeStyle>
                        Allowance
                    </NavLink>
                    <NavLink to="/watch" activeStyle>
                        Add Token
                    </NavLink>
                    <NavLink to="/transfer" activeStyle>
                        Transfer Token
                    </NavLink>
                    <NavLink to="/history" activeStyle>
                       Fetch
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;