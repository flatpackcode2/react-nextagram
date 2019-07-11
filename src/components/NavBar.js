import React from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import LoginModal from "./LoginModal"
import { Link} from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  noRefresh= (event) =>{
    event.preventDefault()
  }

  toggle() {
    this.setState(prevState =>({
      isOpen: !prevState.isOpen
    }));
  }
  render()

  {
    return (
      <div>
        <Navbar color="danger" light expand="md">
          <NavLink className = "text-white font-weight-bold h3" tag ={Link} to="/" ><img width= "50px" src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" alt="some logo here"/>Nextagram</NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>                
                {localStorage.JWT
                  ?
                  <>
                  <NavItem>
                    <Button onClick={this.props.logOut} color="danger">Logout</Button>
                  </NavItem>
                  <NavItem>
                      <NavLink className = "text-white" tag ={Link} to="/profile" >My Profile</NavLink>
                    </NavItem>
                  </>
                  :
                  <>
                    <NavItem>
                      <LoginModal buttonLabel = "Login" liftMeUp={this.props.liftMeUp} loginSuccess={this.props.loginSuccess} />
                    </NavItem>
                  </>
                }


            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;