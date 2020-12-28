import React, { Component } from "react"
import Inputs from "./Inputs"
import History from "./History"

class ControlPanel extends Component {
  constructor() {
    super()
      this.state = {
        tab: "input",
      }
  }

  goToHistory = () => {
    this.getHistory()
    this.setState({ tab: "history" })
  }

  goToInputs = () => {
    this.setState({ tab: "input" })
  }

  getHistory = () => {
    let http = new XMLHttpRequest()
    let url = "http://localhost:8080/jobs"
    http.open("GET", url, true)
    http.onreadystatechange = function() {
      if(http.readystate === 4) {
        if(http.status === 200){
          let history = JSON.parse(http.responseText)
          this.props.changeHistory(history)
        }
      }
    }
    http.send()
  }

  render() {
    switch (this.state.tab) {
      case "input":
        return (
          <div>
            <div id = "controlPanel" className = "card-panel">
              <div id = "tabs" className = "row">
                  <button className = "waves-effect waves-light btn-small green col s6">Inputs </button>
                  <button className = "waves-effect waves-light btn-small black col s6" 
                          onClick = {this.goToHistory}>History </button>
              </div>
              <Inputs
                generateJob = {this.props.generateJob}
                state = {this.props.state}
                showAlertModal = {this.props.showAlertModal}
              />
            </div>
          </div>
        )
      case "history":
        return (
        <div>
          <div id = "controlPanel" className = "card-panel">
            <div id = "tabs" className = "row">
              <button className = "waves-effect waves-light btn-small black col s6"
                      onClick = {this.goToInputs}>Inputs</button>
              <button className = "waves-effect waves-light btn-small green col s6">History</button>
            </div>
            <History
              history = {this.props.history}
              handleDelete = {this.props.handleDelete}
              changeDisplayedDistrict = {this.props.changeDisplayedDistrict}
              showAlertModal = {this.props.showAlertModal}
              addDisplays = {this.props.addDisplays}/>
          </div>
        </div>
        )
      default:
        return (
          <div />)
    }
  }
}

export default ControlPanel;