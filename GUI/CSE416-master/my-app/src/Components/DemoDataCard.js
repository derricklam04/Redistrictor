import React, { Component } from "react"

class DemoDataCard extends Component{

  render(){
    return(
        <div className = "row">
          <div className = "bold">{this.props.text}</div>
          <div>{this.props.number}</div>
        </div>
    )
  }
}

export default DemoDataCard