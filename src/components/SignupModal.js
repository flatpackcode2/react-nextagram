import React from 'react';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,Input, InputGroup } from 'reactstrap';


class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            emailInput:'',
            pswdInput:'',
            usernameInput:''
        };
        
    }
    
    handleChange = (event) => {
        this.setState({[event.target.id]:event.target.value})
    }

    toggle = () =>{
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    }


  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
                <Label>Email</Label>
                <Input id = "emailInput" type="email" value={this.state.emailInput} onChange={this.handleChange}/>
                <Label>Username</Label>
                <Input id = "usernameInput" type="text" value={this.state.usernameInput} onChange={this.handleChange}/>
                <Label>Password</Label>
                <Input id = "pswdInput" type="password" value={this.state.pswdInput} onChange={this.handleChange}/>
                Already a member? <Button color="link" onClick={()=>{this.props.showLogin()}}>Login here</Button>

            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Login</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;