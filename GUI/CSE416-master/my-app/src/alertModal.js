import React, {Component} from "react"

class alertModal extends Component{
  constructor(){
    super()
    this.state = {
      text: "",
      display: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.display !== state.display){
      return{
        text: props.text,
        display: props.display
      }
    }
    return null
  }

  getModalClassName = () =>{
    if(this.state.display) return "alertModalShow"
    else return "hidden"
  }

  render(){
    return(
      <div className = {this.getModalClassName()}>
          <div className="modalText">{this.props.text}</div>
          <button className="waves-effect waves-light btn-small red" 
                  onClick={this.props.hideAlertModal}>Close</button>
      </div>
    )
  }
}

export default alertModal