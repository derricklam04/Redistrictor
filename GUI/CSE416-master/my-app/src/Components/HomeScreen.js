import React, { Component, lazy, Suspense } from "react"
import ControlPanel from "./controlpanel/ControlPanel"
import DemoData from "./DemoData"
import Legend from "./Legend"
import LayerControl from "./LayerControl"


let USAMap = lazy(() => import('./USAMap'))

class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      demoHidden: true,
      precinctProperties: "",
      displayedDistrictingPlans: [],
      heatmapType: "percent"
    }
  }

  changeHeatmapType = () =>{
    this.setState({ heatmapType: document.getElementById("heatmapMinorityType").value })
  }

  changeSelectedMinority = () => {
    this.props.changeSelectedMinority(document.getElementById("heatmapMinorityInput").value)
  }

  displayDemoDataPrecinct = (precinctProperties) => {
    this.setState({ 
      precinctProperties: precinctProperties, 
      demoHidden: false,
    })
  }

  hideDemoData = () =>{
    this.setState({ demoHidden: true })
  }

  changeDisplayedDistrict = (newDistrictingPlans) =>{
    this.setState({ displayedDistrictingPlans: newDistrictingPlans })
  }

  render(){
    switch(this.props.state){
    case null:
      return(
        <div id = "homeScreen">
          <Suspense fallback = {<div className = "loadingScreen">MAP LOADING...</div>}>
            <USAMap
              state = {this.props.state}
              stateClicked = {this.props.stateClicked}
              selectedMinority = {this.props.selectedMinority}
              displays = {this.props.displays}/>
          </Suspense>
        </div>)
    default:
      return (
        <div>
          <div id = "homeScreen">
            <div className = "row">
              <ControlPanel
                state = {this.props.state}
                history = {this.props.history}
                generateJob = {this.props.generateJob}
                handleDelete = {this.props.handleDelete}
                changeDisplayedDistrict = {this.changeDisplayedDistrict}
                showAlertModal = {this.props.showAlertModal}
                changeHistory = {this.changeHistory}
                addDisplays = {this.props.addDisplays}
              /> 
              <div className = {this.state.demoHidden ? "demographicDataBoxHidden" : "demographicDataBox"}>
                  {this.state.demoHidden ? <div/>:<DemoData properties = {this.state.precinctProperties}/>}
              </div>
              <Legend changeSelectedMinority = {this.changeSelectedMinority}
                      changeHeatmapType = {this.changeHeatmapType}
                      heatmapType = {this.state.heatmapType}/>
              <LayerControl state = {this.props.state}
                            displayedDistrictingPlans = {this.state.displayedDistrictingPlans}
                            changeDisplay = {this.props.changeDisplay}
                            displays = {this.props.displays}/>
              <div id = "miniMap">
                <Suspense fallback = {<div>MAP LOADING...</div>}>
                  <USAMap
                    state = {this.props.state}
                    stateClicked = {this.props.stateClicked}
                    selectedMinority = {this.props.selectedMinority}
                    displayDemoDataPrecinct = {this.displayDemoDataPrecinct}
                    hideDemoData = {this.hideDemoData}
                    displayedDistrictingPlans = {this.state.displayedDistrictingPlans}
                    displays = {this.props.displays}
                    heatmapType = {this.state.heatmapType}/>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default HomeScreen