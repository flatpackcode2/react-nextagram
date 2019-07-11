import React from 'react'
import axios from 'axios'
import Image from 'react-graceful-image'


class UserImages extends React.Component{
    constructor(props){
        super(props);
        this.state={
            images:[],
        }
    }

componentDidMount(_props){
    axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.UserId}`)
    .then(response=>{
        let retrievedImages = response.data;
        this.setState({images :retrievedImages})
    })
    .catch(error =>{console.log(`ERROR in image retrieval for UserImages:${error}`)})
}

    render(){
        const {images} = this.state
        return(
            <div className="ImageContainer d-block">
                    {images.map((el, index) =>{
                        return (<Image className="img-fluid w-25 m-2" key = {index} src={el} alt="image goes here"
                        ></Image>)// need to add return because statement is not inline
                    })}
            </div>
        )
    }
}

export default UserImages



// placeholderColor="#FCAB10"