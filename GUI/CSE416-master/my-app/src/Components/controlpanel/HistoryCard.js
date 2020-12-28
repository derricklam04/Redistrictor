import React, { Component } from "react"
import Results from "../Results"

export class HistoryCard extends Component{

  constructor(props){
    super()
    let boxplotData = ""
    if(props.history.status === "completed"){
      let http = new XMLHttpRequest()
      let url = "http://localhost:8080/job/boxplot/" + props.history.id
      http.open("GET", url, false)
      http.onreadystatechange = () => {
        if(http.readyState === 4){
          if(http.status === 200){
            boxplotData = JSON.parse(http.responseText)
          }
        }
      }
      http.send()
    }
    this.state = {
      selectedBoxplotMinority: "African American",
      boxplotData: boxplotData
    }
  }

  getVAP = () => {
    if(this.props.history.votingAgePopulation === null)
      return "N/A"
    else
      return (this.props.history.votingAgePopulation + "%")
  }

  deleteButtonText = () => {
    if(this.props.history.status === "completed")
      return "Delete"
    else
      return "Abort"
  }

  changeSelectedBoxplotMinority = () => {
    console.log(document.getElementById("boxplotMinorityInput").value)
    this.setState({ selectedBoxplotMinority: document.getElementById("boxplotMinorityInput").value })
  }

  convertState = (state) => {
    if(state === "GA") return "Georgia"
    else if(state === "TX") return "Texas"
    else if(state === "VA") return "Virginia"
    else return "N/A"
  }

  handleDelete = () => {
    if(this.props.history.status === "completed"){
      let http = new XMLHttpRequest()
      let url = "http://localhost:8080/job/" + this.props.history.id
      http.open("DELETE", url)
      http.onreadystatechange = () => {
        if(http.readyState === 4) {
          if(http.status === 204){
            this.props.handleDelete(this.props.history.id, this.props.history.status)
          }
          else
            this.props.showAlertModal("ERROR: Deleting Job " + this.props.history.id)
        }
      }
      http.send()
    }
    else{
      let http = new XMLHttpRequest()
      let url = "http://localhost:8080/job/" + this.props.history.id + "/cancel"
      http.open("PATCH", url)
      http.onreadystatechange = () => {
        if(http.readyState === 4) {
          if(http.status === 200){
            this.props.handleDelete(this.props.history.id, this.props.history.status)
          }
          else
            this.props.showAlertModal("ERROR: Aborting Job " + this.props.history.id)
        }
      }
      http.send()
    }
  }

  getBoxplotData = () => {
    if(this.state.boxplotData === "") return ""
    if(this.state.selectedBoxplotMinority === "African American")
      return this.state.boxplotData.AA
    else if(this.state.selectedBoxplotMinority === "Asian")
      return this.state.boxplotData.ASIAN
    else if(this.state.selectedBoxplotMinority === "Hispanic")
      return this.state.boxplotData.HIS
    else if(this.state.selectedBoxplotMinority === "Native American or Alaska Native")
      return this.state.boxplotData.AMIN
    else if(this.state.selectedBoxplotMinority === "Native Hawaiian or Other Pacific Islander")
      return this.state.boxplotData.NHPI
    else if(this.state.selectedBoxplotMinority === "White")
      return this.state.boxplotData.WHITE
  }

  getDisplayedDistrict = () =>{
    this.props.showAlertModal("Loading Districtings for Job " + this.props.history.id)
    let http = new XMLHttpRequest()
    let url = "http://localhost:8080/job/result/" + this.props.history.id
    http.open("GET", url, false)
    http.onreadystatechange = () => {
      if(http.readyState === 4){
          console.log(http)
        if(http.status === 200){
          let districtings = JSON.parse(http.responseText)
          this.props.showAlertModal("Districtings Loaded for Job " + this.props.history.id)
          console.log(districtings)
          this.addDisplayedDistrict(districtings)
        }
      }
    }
    http.send()
  }

  addDisplayedDistrict = (districtings) =>{
    let displayedDistrictingPlan = []
    displayedDistrictingPlan.push(this.createDistrictingPlanLabel("Average", districtings.plan1, "#8b0000"))
    displayedDistrictingPlan.push(this.createDistrictingPlanLabel("Extreme", districtings.plan2, "#000080"))
    displayedDistrictingPlan.push(this.createDistrictingPlanLabel("Random1", districtings.plan3, "#800080"))
    displayedDistrictingPlan.push(this.createDistrictingPlanLabel("Random2", districtings.plan4, "#013220"))
    this.props.changeDisplayedDistrict(displayedDistrictingPlan)

    let newDisplays = [
      {key: "Average", show: false},
      {key: "Extreme", show: false},
      {key: "Random1", show: false},
      {key: "Random2", show: false}
    ]
    this.props.addDisplays(newDisplays)
  }

  createDistrictingPlanLabel = (type, geoJSON, color) =>{
    return{
      key: type,
      state: this.convertState(this.props.history.state),
      geoJSON: geoJSON,
      color: color
    }
  }

  render(){
    return (
      <div className = "card">
        <div className = "card-title">
          Job ID: {this.props.history.id} ({this.props.history.status})
        </div>
        <div><strong>State: </strong>{this.convertState(this.props.history.state)}</div>
        <div><strong>Population Difference: </strong>{this.props.history.populationDiffLimit}</div>
        <div><strong>Compactness: </strong>{this.props.history.compactnessLimit}</div>
        <div><strong>Number of Districts: </strong>{this.props.history.numberOfDistrictings}</div>
        {this.props.history.status === "completed" ? 
          <div> 
            <button className = "waves-effect waves-light btn-small green"
                    onClick = {this.getDisplayedDistrict} 
              >ADD DISTRICTINGS</button>
          </div> : <div/>}
        {this.props.history.status === "completed" ? 
          <Results history = {this.props.history} 
            selectedBoxplotMinority = {this.state.selectedBoxplotMinority}
            changeSelectedBoxplotMinority = {this.changeSelectedBoxplotMinority}
            boxplotData = {this.getBoxplotData()}
            /> : <div/>}
        <button className = "waves-effect waves-light btn-small red"
                onClick = {this.handleDelete}>
          {this.deleteButtonText()}</button>
      </div>
    )
  }
}

export default HistoryCard;