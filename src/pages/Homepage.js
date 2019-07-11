import React from 'react';
import '../App.css';
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from 'reactstrap';
import axios from 'axios';
import UserImages from '../containers/UserImages';
import Loader from '../components/Loader.js'
import UserProfilePage from "./UserProfilePage"
import { Link, Route} from 'react-router-dom'

class Homepage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      isLoading:true,
      showModal:false
    };
  }

  componentDidMount(){
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result =>{
      let newArray = result.data;
      this.setState({
        users : newArray,
      })
      setTimeout(() => {
        this.setState({isLoading: false})
    }, 0)
    
    })
    .catch(error =>{
      console.log('ERROR: ', error)
    })
  }

  render(){
    const {users, isLoading} = this.state
    
    return(
      <div>
        <div className="heading">
        </div>        
        <div className="loadingScreen">
          {isLoading?<Loader />
          :
        <Container fluid>
          <div>
           {
            users.map(user =>
              <div className="row justify-content-center" key={user.id}>
                <div className="col-md-3 col-sm-3">
                  <Card>
                    <CardImg className="rounded-circle" top src={user.profileImage}/>
                    <CardBody>
                        <CardTitle className="d-flex justify-content-center">
                          <Link to={`/users/${user.id}`}>{user.username}</Link>
                            <Route path="/user/:id" component={UserProfilePage} />
                        </CardTitle>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-md-7 col-sm-7 bg-dark text-light border border-info rounded">
                  <UserImages UserId={user.id}/>
                </div>

              </div>
              )
              
          }
          </div>
          </Container>}  
        </div>
      </div>
    )
  }
}


export default Homepage;
