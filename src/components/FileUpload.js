import React from 'react'
import {Col, Form, Input, FormText, Label, Row, Card, CardImg, Container} from 'reactstrap'
import axios from 'axios';
import Loader from './Loader'

class FileUpload extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imageFile:null,
            previewImage:'',
            message:'',
            isLoading:false
        }
    }

    
    handleFileSubmit = e =>{
        console.log('handleFilesubmit has been called')
        e.preventDefault()
        this.setState({isLoading:true})

        // Formdata object to hold the image file to send to the server
        let formData = new FormData()

        let JWT = localStorage.getItem('JWT')

        // Append the key:value pair to the formData object
        formData.append("image", this.state.imageFile)

        axios.post('https://insta.nextacademy.com/api/v1/images/', formData,{headers:{ Authorization: `Bearer ${JWT}`}})
        .then(response =>{
            if(response.data.success){
                console.log(response.data.success)
                this.setState({
                    message:"Image uploaded successfully",
                    previewImage:null,
                    imageFile:null,
                    isLoading:false
                }, ()=>{console.log(this.state.message)})
                this.props.refreshImages()
            }
        })
        .catch(error =>{
            console.log(error.response)
        })
        

    }

    //create a function to check if it's .jpeg, or any of the popular file formats. also checks on sizes.
    fileValidation = () =>{
        return 1
    }

    handleFile = (e) =>{
        this.setState({
            imageFile:e.target.files[0],
            previewImage:URL.createObjectURL(e.target.files[0]),
        })
    }

    render(){
        const {imageFile, message, previewImage, isLoading} = this.state
        return(
            <>
            <Container>
                <Row classname="d-flex">
                    <div className="col-md-4">
                        <Card style={{width:"300px", minHeight:"300px", maxHeight:"300px"}} className="d-flex justify-content-center align-items-center">
                        {/* Set loading icon when uploading picture. nested ternary operator. */}
                        {!isLoading?(!imageFile?(<h4 className="text-center">{message ? message : "Live Preview"}</h4>):(<CardImg src={previewImage} width="300px" height="300px"/>)):<Loader/>}

                        </Card>
                    </div>
                    <div  className="col-md-8">
                        <Form onSubmit={this.handleFileSubmit} className="col-md-6">
                            <Row form>
                                <Col md={12} sm={12}>
                                    <Label>Upload your image:</Label>
                                </Col>
                                <Col md={12} sm={12}>
                                    <Input type="file" multiple={false} name="image-file" id="imageFile" onChange={this.handleFile}></Input>
                                </Col>
                            </Row>
                            <br/>
                            <Row form>
                                <Col md={6} sm={6}>
                                    <Input type="submit" className="btn btn-primary" disabled={imageFile?false:true}></Input>
                                </Col>
                                <FormText> Please upload .jpg, .png or .tiff. We can't afford storage so please keep all files to 5MB size max. We simply cannot contain your massive ego.</FormText>
                            </Row>
                        </Form>
                    </div>
                </Row>
            </Container>
            </>
        )
    }

}
export default FileUpload