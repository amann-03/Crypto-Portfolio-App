import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Allowance
                    </NavLink>
                    <NavLink to="/blogs" activeStyle>
                        Watch List
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Transfer Token
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;