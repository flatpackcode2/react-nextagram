render() {
    const {modalStatus} = this.state
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        
        {this.props.modalStatus?
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
          {/* Separate out as a dumb componnent and pass handlechange as a props to component */}
            <Form> 
                <Label>Email</Label>
                <Input id = "emailInput" type="email" value={this.state.emailInput} onChange={this.handleChange}/>
                <Label>Password</Label>
                <Input id = "pswdInput" type="password" value={this.state.pswdInput} onChange={this.handleChange}/>
                Not a member? <Button color="link" onClick={()=>{this.props.showLogin()}}>Sign up here</Button>

            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Login</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        :
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Welcome!</ModalHeader>
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
      }
      </div>
    );
  }