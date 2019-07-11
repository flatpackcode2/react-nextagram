import React from 'react';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormFeedback, Input} from 'reactstrap';
import axios from 'axios';


class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            emailInput:'',
            pswdInput:'',
            usernameInput:'',
            isLoginForm:true,
            message:{},
            badInput:false,
            usernameValid:true
        };
        
    }

    changeView = () =>(
      this.setState(prevState =>(
        {isLoginForm:!prevState.isLoginForm,
          badInput:false
        }))
      )
    
    handleChange = (event) => {
        this.setState({[event.target.id]:event.target.value})
    }

    //Implemented for username only for now. See if can be implemented for email.
    handleInput = e => {
      let x = { ...e };
      let delay = setTimeout(() => this.handleUsernameCheck(x), 300);
      this.setState({
        [e.target.id]: e.target.value,
        delay
      });
    };
    
    handleUsernameCheck = e => {
      const newUsername = e.target.value;
      if (newUsername.length >= 6) {
        axios.get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        ).then(response => {
          if (response.data.valid) {
            this.setState({
              usernameValid: true
            });
          } else {
            this.setState({
              usernameValid: false
            });
          }
        });
      }
    };
    

    toggle = () =>{
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    }

    //1.After submitting lift the props up to the App.js level and  clear the textboxes.
    //  One issue is that if we fill in the signup form and switch to login and click submit, it will still send the props.username used
    //  for sign-up with the login details even if no username box was created in the login form.
    //  This is because we send a general message obeject (see props.liftMeUo below) that takes in all props regardless if it appears in the modal.
    //  we are using handleSubmit on both signup and login modals so this prevents duplicate code.
    //  This also means we don't need to create a <Login /> and <Signup/> function and assign default props.
    //2. lift up this.props.isLoginform to App.js. Store it as a state?

    validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    handleSubmit= () =>{
      if(this.validateEmail(this.state.emailInput)){
        this.props.liftMeUp({
          email:this.state.emailInput,
          password:this.state.pswdInput,
          username:this.state.usernameInput,
          isLoginForm:this.state.isLoginForm
        })
        console.log(`this.state.emailInput:${this.state.emailInput}, this.state.pswdInput:${this.state.pswdInput}, this.state.usernameInput:${this.state.usernameInput},this.state.isLoginForm:${this.state.isLoginForm}`)
        this.setState({
          emailInput:'',
          pswdInput:'',
          usernameInput:'',
          message:{}
        })
        this.toggle()
      }
      else{
        this.setState({
          emailInput:'',
          pswdInput:'',
          usernameInput:'',
          message:{},
          badInput:true
        })
      }
    }



    handleUsernameCheck = e =>{
      const newUsername = e.target.value;
      if(newUsername.length >=6){
        axios.get(`https://insta.nextacademy.com/apo/v1/users/check_name?username=${newUsername}`)
        .then(response =>{
          if(response.data.valid){
            this.setState({
              usernameValid:true
            });
          }else{
            this.setState({
              usernameValid:false
            })
          }
        })
      }
    }

  render() {
    const {isLoginForm} = this.state
    const {emailInput, pswdInput, usernameInput, usernameValid} = this.state
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        
        {isLoginForm?
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
          {/* Separate out as a dumb componnent and pass handlechange as a props to component */}
            <Form>

                <Label for="emailInput">Email</Label>
                <Input id = "emailInput" type="email" value={emailInput} onChange={this.handleChange} />
                
                <Label for="pswdInput">Password</Label>
                <Input id = "pswdInput" type="password" value={pswdInput} onChange={this.handleChange}/>
                
                Not a member? <Button color="link" onClick={()=>(this.changeView())}>Sign up here</Button>
                <FormText color="danger">{this.state.badInput?'Please use a proper email address':''}</FormText>
            
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit} disabled={emailInput===''||pswdInput===''?true:false}>Login</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        :
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Welcome!</ModalHeader>
          <ModalBody>
            <Form>

                <Label for="emailInput">Email</Label>
                <Input id = "emailInput" type="email" value={emailInput} onChange={this.handleChange}/>

                <Label for="usernameInput">Username</Label>
                <Input id = "usernameInput" type="text" value={usernameInput} onChange={e => { if (this.state.delay){
                                                                                                  clearTimeout(this.state.delay);
                                                                                                  }
                                                                                                  this.handleInput(e);
                                                                                                  }}
                                                                                                  {...(usernameInput.length >= 6
                                                                                                  ? usernameValid
                                                                                                    ? { valid: true }
                                                                                                    : { invalid: true }
                                                                                                  : usernameInput.length > 0
                                                                                                    ? { invalid: true }
                                                                                                    : "")}
                                                                                                    placeholder="Choose a username min 6 characters"/>
                    <FormFeedback
      {...(usernameInput.length > 0 && usernameInput.length >= 6
        ? usernameValid
          ? { valid: true }
          : { invalid: true }
        : { invalid: true })}
    >
      {usernameInput.length >= 6
        ? usernameValid
          ? "Sweet, this username is available!"
          : "Sorry, this username is taken!"
        : "Must be minimum 6 characters"}
    </FormFeedback>
               
                <Label for="pswdInput">Password</Label>
                <Input id = "pswdInput" type="password" value={pswdInput} onChange={this.handleChange}/>
                
                Already a member? <Button color="link" onClick={()=>(this.changeView())}>Login here</Button>
                <FormText color="danger">{this.state.badInput?'Please use a proper email address':''}</FormText>
            
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit} disabled={emailInput===''||pswdInput===''||usernameInput===''?true:false}>Sign-Up</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      }
      </div>
    );
  }
}

export default LoginModal;