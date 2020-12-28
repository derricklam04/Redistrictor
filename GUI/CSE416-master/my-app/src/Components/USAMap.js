import React, { Component, lazy, Suspense } from "react"
import { Map, TileLayer, GeoJSON} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import GA_geojson from "../geojson/GA.json"
import GA_districts from "../geojson/GA_districts.json"
import GA_precincts from "../geojson/GA_precincts.json"

import TX_geojson from "../geojson/TX.json"
import TX_districts from "../geojson/TX_districts.json"
import TX_precincts from "../geojson/TX_precincts.json"

import VA_geojson from "../geojson/VA.json"
import VA_districts from "../geojson/VA_districts.json"
import VA_precincts from "../geojson/VA_precincts.json"

import GA_averages from "./averages/GA_Averages.json"
import TX_averages from "./averages/TX_Averages.json"
import VA_averages from "./averages/VA_Averages.json"

const position = [51.505, -0.09]
let Precinct = lazy(() => import('./Precinct'))
let Heatmap = lazy(() => import('./Heatmap'))
let JobDistrictings = lazy(() => import('./JobDistrictings'))

class USAMap extends Component {

  stateStyle = {
    fillColor: "#F28F3B",
    weight: 1,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.5
  }

  districtStyle = {
    fillOpacity: 0
  }

  constructor(props) {
    super(props);
    let center = [25.878113, -94.005974]
    let zoom = 4
    let state = null
    if(this.props.state === "Georgia"){
      center = [32.1656, -82.9001]
      zoom = 7
      state = "Georgia"
    }
    else if(this.props.state === "Texas"){
      center = [30.9686, -99.9018]
      zoom = 6
      state = "Texas"
    }
    else if(this.props.state === "Virginia"){
      center = [37.4316, -78.6569]
      zoom = 7
      state = "Virginia"
    }
    this.state = {
      center: center, 
      zoom: zoom,
      state: state,
      demoHidden: true,
      displayedDistrictingPlans: [],
      displays:[
        {key: "district", show: false},
        {key: "precinct", show: false},
        {key: "heatmap", show: false}
      ]
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    let center = [25.878113, -94.005974]
    let zoom = 4
    let state = null
    if(props.state === "Georgia"){
      center = [32.1656, -82.9001]
      zoom = 7
      state = "Georgia"
    }
    else if(props.state === "Texas"){
      center = [30.9686, -99.9018]
      zoom = 6
      state = "Texas"
    }
    else if(props.state === "Virginia"){
      center = [37.4316, -78.6569]
      zoom = 7
      state = "Virginia"
    }
    return {
      center: center,
      zoom: zoom,
      state: state,
      displayedDistrictingPlans: props.displayedDistrictingPlans,
      displays: props.displays,
      dataProcessed: prevState.dataProcessed,
      demoHidden: prevState.demoHidden
    }
  }

  focusInState = (a) => {
    this.props.stateClicked(a)
    if (a === "Georgia") {
      this.setState({
        zoom: 7,
        center: [32.1656, -82.9001],
        state: "Georgia"
      });
    }
    else if (a === "Texas") {
      this.setState({
        zoom: 6,
        center: [30.9686, -99.9018],
        state: "Texas"
      });
    }
    else if (a === "Virginia") {
      this.setState({
        zoom: 7,
        center: [37.4316, -78.6569],
        state: "Virginia"
      });
    }
  }

  // getAverages = (precinctEdited) => {
  //   let totPop = 0
  //   let aaPop = 0
  //   let asianPop = 0
  //   let hispPop = 0
  //   let aminPop = 0
  //   let nhpiPop = 0
  //   let whitePop = 0
  //   precinctEdited.map((precinct) => {
  //     totPop += precinct.properties.TOTPOP
  //     aaPop += precinct.properties.BLACK
  //     asianPop += precinct.properties.ASIAN
  //     hispPop += precinct.properties.HISP
  //     aminPop += precinct.properties.AMIN
  //     nhpiPop += precinct.properties.NHPI
  //     whitePop += precinct.properties.WHITE
  //     return precinct
  //   })
  //   let stateAverages = {
  //     aa: aaPop/totPop,
  //     asian: asianPop/totPop,
  //     hisp: hispPop/totPop,
  //     amin: aminPop/totPop,
  //     nhpi: nhpiPop/totPop,
  //     white: whitePop/totPop
  //   }
  //   return stateAverages
  // }

  // processData = () => {
  //   if(!this.state.dataProcessed){
  //     let GA_averages = this.getAverages(GA_precincts.features)
  //     let TX_averages = this.getAverages(TX_precincts.features)
  //     let VA_averages = this.getAverages(VA_precincts.features)

  //     console.log(GA_averages)
  //     console.log(TX_averages)
  //     console.log(VA_averages)
    
  //     this.setState({
  //       dataProcessed: true,
  //       GA_averages: GA_averages,
  //       TX_averages: TX_averages,
  //       VA_averages: VA_averages
  //     })
  //   }
  // }

  check = (name) =>{
    let displayOverlay = false
    this.props.displays.map((display) => {
      if(display.key === name)
        displayOverlay = display.show
      return display
    })
    return displayOverlay
  }

  selectDistrictGeoJSON = () =>{
    if(this.state.state === "Georgia") return GA_districts
    else if(this.state.state === "Texas") return TX_districts
    else if(this.state.state === "Virginia") return VA_districts
  }

  selectPrecinctGeoJSON = () =>{
    if(this.state.state === "Georgia") return GA_precincts
    else if(this.state.state === "Texas") return TX_precincts
    else if(this.state.state === "Virginia") return VA_precincts
  }

  selectStateAverages = () =>{
    if(this.state.state === "Georgia") return GA_averages.stateAverages
    else if(this.state.state === "Texas") return TX_averages.stateAverages
    else if(this.state.state === "Virginia") return VA_averages.stateAverages
  }

  render() {
    return (
        <div id = "US_map">
          <Map center = {this.state.center} zoom = {this.state.zoom}>
            <GeoJSON data = {GA_geojson} style = {this.stateStyle} position = {position}
              onClick = {(e) => { this.focusInState("Georgia") }}></GeoJSON>
            <GeoJSON data={TX_geojson} style={this.stateStyle} position={position}
              onClick = {(e) => { this.focusInState("Texas") }}></GeoJSON>
            <GeoJSON data={VA_geojson} style={this.stateStyle} position={position}
              onClick = {(e) => { this.focusInState("Virginia") }}></GeoJSON>
            <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {this.check("district") ? <GeoJSON data = {this.selectDistrictGeoJSON()} style={this.districtStyle}></GeoJSON> : <div/>}
            {this.check("precinct") ?  
                        <Suspense fallback = {<div/>}>
                          <Precinct
                            precincts = {this.selectPrecinctGeoJSON()}
                            displayDemoDataPrecinct = {this.props.displayDemoDataPrecinct}
                            hideDemoData = {this.props.hideDemoData}/>
                        </Suspense>:<div/>}
            {this.check("heatmap") ?
                      <Suspense fallback = {<div/>}>
                        <Heatmap
                          precincts = {this.selectPrecinctGeoJSON()}
                          averages = {this.selectStateAverages()}
                          displayDemoDataPrecinct = {this.props.displayDemoDataPrecinct}
                          hideDemoData = {this.props.hideDemoData}
                          selectedMinority = {this.props.selectedMinority}
                          heatmapType = {this.props.heatmapType}/>
                      </Suspense>:<div/>}
            {(this.props.displayedDistrictingPlans != null) ? 
            <Suspense fallback = {<div/>}>
              <JobDistrictings
                displays = {this.props.displays}
                displayedDistrictingPlans = {this.props.displayedDistrictingPlans}/>
            </Suspense>:<div/>}
          </Map>
        </div>
    )
  }
}

export default USAMap;