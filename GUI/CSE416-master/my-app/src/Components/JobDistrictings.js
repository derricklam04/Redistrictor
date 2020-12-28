import React, { Component } from "react"
import {GeoJSON} from "react-leaflet"

class JobDistricting extends Component{

  check = (name) =>{
    let show = false
    this.props.displays.map((display) => {
      if(display.key === name)
        show = display.show
      return display
    })
    return show
  }

  getDistrictStyle = (color) =>{
    let districtStyle = {
      weight: 2,
      opacity: 1,
      color: color,
      fillOpacity: 0  
    }
    return districtStyle
  }

  render(){
    return(
      <div>
          {this.props.displayedDistrictingPlans.map((plan) =>
            (this.check(plan.key) ? <GeoJSON data = {plan.geoJSON} style={this.getDistrictStyle(plan.color)}></GeoJSON> : <div/>)
          )}
      </div>
    )
  }
}

export default JobDistricting