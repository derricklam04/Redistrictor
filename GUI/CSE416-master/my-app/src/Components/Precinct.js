import React, { Component } from "react"
import {GeoJSON} from "react-leaflet"

class Precinct extends Component{

  precinct_style = {
    fillColor: "#F29494",
    weight: 1,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.5
  }

  render(){
    return(
      <div>
          {this.props.precincts.features.map((precinct) => (
          <GeoJSON data = {precinct.geometry} style = {this.precinct_style} 
          onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
          onmouseout = {this.props.hideDemoData}></GeoJSON>))}
      </div>
    )
  }
}

export default Precinct