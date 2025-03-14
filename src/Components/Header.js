import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MilkLogo from '../images/milking14.jpg'
const Header = () => {
    return (

        <header className="header">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/" className="brand">
{/* Brand Image */}
                    <img
                        src={MilkLogo}
                        width="130"
                        height="130"
                        className="d-inline-block align-top cowLogo"
                        alt="Cow Logo"
                    />{' '}
                    Milking Tracker With Music</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto"> 
                    {/* Links */}
                        <Nav.Link as={Link} to="/milking-history">Milking History</Nav.Link>
                        {/* Add more navigation links here if needed */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;