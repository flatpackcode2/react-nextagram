import React from 'react'

class Loader extends React.Component{

    render(){
        return(
            <div className="lds-css">
            <div className="lds-gear">
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )
    }
}

export default Loader