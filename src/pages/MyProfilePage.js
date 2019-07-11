import React from 'react'
import axios from 'axios'
import Image from "react-graceful-image"
import FileUpload from '../components/FileUpload'

class MyProfilePage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            images:[]
        }
    }

    //Lift up to App.js? If so how to do?
    componentDidMount(){
        let JWT = localStorage.getItem('JWT')
        axios({
            method:'get',
            url:'https://insta.nextacademy.com/api/v1/images/me',
            headers:{
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(result =>{
            let newArray=result.data;
            this.setState({images:newArray})
        });
    }

    refreshImages =() =>{
        let JWT = localStorage.getItem('JWT')
        axios({
            method:'get',
            url:'https://insta.nextacademy.com/api/v1/images/me',
            headers:{
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(result =>{
            let newArray=result.data;
            this.setState({images:newArray})
        });
    }
    

    render(){
        const{images}=this.state
        return(
            <>
            <h1>Shame on you, you irredeemable narcissist!</h1>
            {/* Must hid File Upload. My Navbar in My Profile Page still shows the login button instead of the logout button. */}
            <div>
                <FileUpload refreshImages={this.refreshImages}/>
            </div>
            <div className="m-2">
            {images.map((el,index) =>{
                return (<Image className="img-fluid m-2" style={{width:"200px"}} key = {index} src={el} alt="image goes here"></Image>)
            })}
            </div>
            </>
        )
    }

}
export default MyProfilePage