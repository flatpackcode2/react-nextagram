import React from 'react'
import Homepage from './pages/Homepage.js'
import {Route, Switch, Redirect} from "react-router-dom"
import UserProfilePage from './pages/UserProfilePage.js'
import MyProfilePage from './pages/MyProfilePage.js'
import axios from 'axios'
import NavBar from './components/NavBar';

class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      username:'',
      email:'',
      password:'',
      isLoginForm:'',
      loginSuccess:false,
      token:''
    }

  }

  //sign-up POST request
  SignupRequest = () => {
    console.log('SignupRequest called')
    axios({
      method:'POST',
      url:'https://insta.nextacademy.com/api/v1/users/',
      data:{
        username:`${this.state.username}`,
        email:`${this.state.email}`,
        password:`${this.state.password}`,
      }
    })
    .then( result =>{
      console.log(result)
    })
    .catch(error=>{
      console.log(`Sign-up failed: ${error}`)
      
    })
  }
  
  //login POST request
  LoginRequest = () => {
    console.log('LoginRequest called')
    axios({
      method:'POST',
      url:'https://insta.nextacademy.com/api/v1/login',
      data:{
        email:`${this.state.email}`,
        password:`${this.state.password}`,
      }
    })
    .then( result =>{
      let JWT = result.data.auth_token
      localStorage.setItem('JWT', JWT)
      let tempdata = localStorage.getItem('JWT')
      console.log(tempdata)
      this.setState({loginSuccess:true,
                      token:JWT})
    })
   
    //trying to store JWT value in state and pass down. Issue was memory leak but not sure if related.
    //link to pass down props via router in react-router-dom anyway: https://til.hashrocket.com/posts/z8cimdpghg-passing-props-down-to-react-router-route

    .catch(error=>{
      console.log(`Login-failed: ${error}`)
      
    })
  }

  logOut = () =>{
    localStorage.removeItem('JWT')
    let tempdata2 = localStorage.getItem('JWT')
    console.log(tempdata2)
    console.log("bye bye bitchezzz...")
    setTimeout(this.setState({loginSuccess:false}),300)
  }

  liftMeUp=(message)=>{
    this.setState({
      username: message.username,
      email:message.email,
      password:message.password,
      isLoginForm:message.isLoginForm
    }, () => {
      console.log('callback function in setState for liftMeup triggered!')
      this.state.isLoginForm?this.LoginRequest():this.SignupRequest()
    })
  }

  render(){

    return(
      <div>
        <NavBar liftMeUp={this.liftMeUp} loginSuccess={this.state.loginSuccess} logOut={this.logOut}/>
        { this.state.loginSuccess?<Redirect to="/profile" />:<Redirect to="/"/>}
        <Switch>
          <Route exact path = "/" component={Homepage} />
          <Route path ="/users/:id" component={UserProfilePage} />
          <Route path ="/profile" component={MyProfilePage} />
        </Switch>
      </div>

    )
  }
}

export default App;