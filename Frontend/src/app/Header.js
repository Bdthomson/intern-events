import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = withRouter(() => (
    <Navbar collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer exact to="/"><a>IBM Intern Events</a></LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                {/*<LinkContainer exact to="/paths"><NavItem eventKey={1}>Paths</NavItem></LinkContainer>*/}
                {/*<LinkContainer exact to="/settings"><NavItem eventKey={2}>Settings</NavItem></LinkContainer>*/}
                <LinkContainer exact to="/new"><NavItem eventKey={3}>Add Event</NavItem></LinkContainer>
                {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>*/}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
));

export default Navigation;


// const Header = withRouter(() => (
//     <header className="header dark-bg">
//         <a href="#" className="logo">Gim<span className="lite">me</span></a>
//         <div className="top-nav notification-row">
//             <ul className="nav pull-right top-menu">
//                 {loggedIn()
//                     ? <li className="nav-item"><Link to="/logout">Logout</Link></li>
//                     : <li className="nav-item"><Link to="/login">Login</Link></li>
//                 }
//             </ul>
//         </div>
//     </header>
// ));

