import React from 'react';
import axios from 'axios';
import UserImages from '../containers/UserImages'
import {
    Card,
    CardImg,
  } from 'reactstrap';

const loaderContainer={
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
};

class UserProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:{},
            isLoading:true
        }
    }

    componentDidMount(){
        axios.get(`https://insta.nextacademy.com/api/v1/users/${this.props.match.params.id}
        `)
        .then(({data}) =>{
            this.setState({user:data, isLoading:false})
        })
        .catch(error=>{
            console.log("ERROR in retrieving from endpoint. please refer to userprofilepage.js: ", error)
        })
    }

    render(){
        const {isLoading} = this.state
        const {id, profileImage, username} = this.state.user
        
        return(
            isLoading? <div style={loaderContainer}><img src="https://media.giphy.com/media/sRFCEElJhl66snaQag/giphy.gif" alt=""/></div>
            :
        <div>
            <h2>Hello {username}</h2>
            <div className="row justify-content-center" key={id}>
                <div className="col-md-3 col-sm-3">
                  <Card>
                    <CardImg top src={profileImage}/>
                  </Card>
                </div>
            </div>

            <h3>Here are your pictures</h3>
            {/*
                id &&
                <UserImages UserId={`${id}`}/> using id from state will be undefined as for the first render user={}
            */}
            <UserImages UserId={this.props.match.params.id} />
        </div>
        )
    }

}

export default UserProfilePage