import React, { Component } from "react"
import HomeScreen from "./Components/HomeScreen"
import Navbar from "./Components/NavBar"
import AlertModal from "./alertModal"
import "./App.css"

class App extends Component {

  constructor() {
      super();
    let history = []
    let http = new XMLHttpRequest()
    let url = "http://localhost:8080/jobs"
    http.open("GET", url, false)
    http.onreadystatechange = () => {
      if(http.readyState === 4) {
        if(http.status === 200)
        history = JSON.parse(http.responseText)
        }
        else
          alert("error App Constructor")
    }
    http.send()
      this.state = {
        state: null,
        history: history,
        selectedMinority: "African American",
        displays:[
          {key: "district", show: false},
          {key: "precinct", show: false},
          {key: "heatmap", show: false},
          {key: "Average", show: false},
          {key: "Extreme", show: false},
          {key: "Random1", show: false},
          {key: "Random2", show: false}
        ],
        alertModalText: "",
        displayAlertModal: false
    }
  }

  handleDelete = (jobid, completed) => {
    const newHistory = this.state.history.filter(historyCard => 
      historyCard.id !== jobid)
      this.setState({
        history: newHistory
      })
    if(completed === "completed")
      this.showAlertModal("Job " + jobid + " Deleted")
    else 
      this.showAlertModal("Job " + jobid + " Aborted")
  }

  createNewJob = (id, state, numberOfDistrictings, populationDiffLimit, compactnessLimit) =>{
    let newJob = {
      "id": id,
      "state": state,
      "numberOfDistrictings": numberOfDistrictings,
      "populationDiffLimit": populationDiffLimit,
      "compactnessLimit": compactnessLimit,
      "status": "running"
    }
    let oldHistory = this.state.history
    oldHistory.push(newJob)
    this.setState( {history: oldHistory} )
  }

  generateJob = () =>{
    let jobId = 0
    let history = this.state.history
    let historyCard
    for (historyCard of history){
      if(historyCard.id>jobId)
        jobId = historyCard.id
    }
    jobId += 1
    let selectedState = this.state.state
    if (selectedState === "Georgia")
      selectedState = "GA"
    else if (selectedState === "Texas")
      selectedState = "TX"
    else if (selectedState === "Virginia")
      selectedState = "VA"
    let numPlans = document.getElementById("numPlansInput").value
    let populationDifference = document.getElementById("populationDifferenceInput").value
    if (populationDifference === "Least")
      populationDifference = 0.01
    else if (populationDifference === "Normal")
      populationDifference = 0.02
    else if (populationDifference === "More")
      populationDifference = 0.05
    else if (populationDifference === "Most")
      populationDifference = 0.1
    let compactnessGoal = document.getElementById("compactnessGoalInput").value
    if (compactnessGoal === "Least")
      compactnessGoal = 1.0
    else if (compactnessGoal === "Normal")
      compactnessGoal = 0.5
    else if (compactnessGoal === "More")
      compactnessGoal = 0.3
    else if (compactnessGoal === "Most")
      compactnessGoal = 0.2
  
    let http = new XMLHttpRequest()
    let url = "http://localhost:8080/job"
    let params = {
      "id": jobId,
      "state": selectedState,
      "numberOfDistrictings": numPlans,
      "populationDiffLimit": populationDifference,
      "compactnessLimit": compactnessGoal
    }
    http.open("POST", url, true)
    http.onreadystatechange = () => {
      if(http.readyState === 4) {
        if(http.status === 201){
          this.showAlertModal("Job " + jobId + " Created")
          this.createNewJob(jobId, selectedState, numPlans, populationDifference, compactnessGoal)}
        else
          this.shoeAlertModal("Error Generating Job")
        }
    }
    http.setRequestHeader("Content-type", "application/json")
    http.send(JSON.stringify(params))
  }

  goHome = () => {
    this.setState({ state: null,
                    selectedMinority: "African American",
                    displays: this.resetDisplays() })
  }

  stateClicked = (state) => {
    this.setState({ state: state,
                    displays: this.resetDisplays()})
  }

  changeSelectedMinority = (selectedMinority) => {
    this.setState({ selectedMinority: selectedMinority})
  }

  changeDisplay = (name, show) => {
    let displays = this.state.displays
    let newDisplays = displays.map((display) => {
      if(display.key === name){
        display.show = show
      }
      if(name === "heatmap" && show){
        if(display.key === "precinct")
          display.show = false
      }
      if(name === "precinct" && show){
        if(display.key === "heatmap")
          display.show = false
      }
      return display
    })
    this.setState({ displays: newDisplays })
  }

  addDisplays = () =>{
    let displays = [] 
    this.state.displays.map((display) => {
      if(display.key === "district") displays.push(display)
      if(display.key === "precinct") displays.push(display)
      if(display.key === "heatmap") displays.push(display)
      return display
    })
    displays.push({key: "Average", show: false})
    displays.push({key: "Extreme", show: false})
    displays.push({key: "Random1", show: false})
    displays.push({key: "Random2", show: false})
    this.setState({ displays: displays })
  }

  resetDisplays = () =>{
    return [
      {key: "district", show: false},
      {key: "precinct", show: false},
      {key: "heatmap", show: false},
      {key: "Average", show: false},
      {key: "Extreme", show: false},
      {key: "Random1", show: false},
      {key: "Random2", show: false}
    ]
  }

  showAlertModal = (text) =>{
    this.setState({ 
      alertModalText: text,
      displayAlertModal: true
     })
  }

  hideAlertModal = () =>{
    this.setState({ displayAlertModal:false })
  }

  changeHistory = (newHistory) =>{
    this.setState({ history:newHistory })
  }

  render() {
    return (
      <div>
        <Navbar
          handleSelect = {this.stateClicked} goHome = {this.goHome}/>
        <HomeScreen
          state = {this.state.state} history = {this.state.history} stateClicked = {this.stateClicked}
          generateJob = {this.generateJob} handleDelete = {this.handleDelete}
          changeSelectedMinority = {this.changeSelectedMinority}
          selectedMinority = {this.state.selectedMinority}
          displays = {this.state.displays} 
          changeDisplay = {this.changeDisplay}
          addDisplays = {this.addDisplays}
          showAlertModal = {this.showAlertModal}
          changeHistory = {this.changeHistory}/>
        <AlertModal
          text = {this.state.alertModalText}
          display = {this.state.displayAlertModal}
          hideAlertModal = {this.hideAlertModal}/>
      </div>
    )
  }
}

export default App;
