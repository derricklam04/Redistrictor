import React, { Component } from "react"
import {GeoJSON} from "react-leaflet"

class Heatmap extends Component {

  getHeatMapStylePercentDifference = (precinct) => {
    let color
    let percent = this.getPopulationPercentage(precinct.properties)
    let percentDifference = Math.abs(this.getPopulationPercentageDifference(percent))*100
    if(percentDifference < 2.5) color = "#00BD3F"
    else if(percentDifference < 5) color = "#00C816"
    else if(percentDifference < 7.5) color = "#17D300"
    else if(percentDifference < 10) color = "#4ADE00"
    else if(percentDifference < 12.5) color = "#81E900"
    else if(percentDifference < 15) color = "#BEF400"
    else if(percentDifference < 17.5) color = "#FFFF00"
    else if(percentDifference < 20) color = "#FFCD00"
    else if(percentDifference < 22.5) color = "#FF9C00"
    else if(percentDifference < 25) color = "#FF6A00"
    else if(percentDifference < 27.5) color = "#FF3900"
    else if(percentDifference < 30) color = "#FF0700"
    else if(percentDifference > 30) color = "#FF002B"
    else color = "#ADD8E6"

    let precinct_style = {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: .8
    }
    return precinct_style
  }

  getHeatMapStylePercent = (precinct) => {
    let color
    let percent = this.getPopulationPercentage(precinct.properties)*100
    if(percent < 5) color = "#00BD3F"
    else if(percent < 10) color = "#00C816"
    else if(percent < 15) color = "#17D300"
    else if(percent < 20) color = "#4ADE00"
    else if(percent < 25) color = "#81E900"
    else if(percent < 30) color = "#BEF400"
    else if(percent < 35) color = "#FFFF00"
    else if(percent < 40) color = "#FFCD00"
    else if(percent < 45) color = "#FF9C00"
    else if(percent < 50) color = "#FF6A00"
    else if(percent < 55) color = "#FF3900"
    else if(percent < 60) color = "#FF0700"
    else if(percent > 60) color = "#FF002B"
    else color = "#ADD8E6"

    let precinct_style = {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: .8
    }
    return precinct_style
  }

  getPopulationPercentage = (properties) => {
    let selectedMinority = this.props.selectedMinority
    let populationPercent = 0
    let totalPopulation = properties.TOTPOP
    if(selectedMinority === "African American")
      populationPercent = properties.BLACK/totalPopulation
    else if(selectedMinority === "Asian")
      populationPercent = properties.ASIAN/totalPopulation
    else if(selectedMinority === "Hispanic")
      populationPercent = properties.HISP/totalPopulation
    else if(selectedMinority === "Native American or Alaska Native")
      populationPercent = properties.AMIN/totalPopulation
    else if(selectedMinority === "Native Hawaiian or Other Pacific Islander")
      populationPercent = properties.NHPI/totalPopulation
    else if(selectedMinority === "White")
      populationPercent = properties.WHITE/totalPopulation
    return populationPercent 
  }

  getPopulationPercentageDifference = (percent) => {
    let selectedMinority = this.props.selectedMinority
    let populationPercentDifference = 0
    if(selectedMinority === "African American")
      populationPercentDifference = percent-this.props.averages.aa
    else if(selectedMinority === "Asian")
      populationPercentDifference = percent-this.props.averages.asian
    else if(selectedMinority === "Hispanic")
      populationPercentDifference = percent-this.props.averages.hisp
    else if(selectedMinority === "Native American or Alaska Native")
      populationPercentDifference = percent-this.props.averages.amin
    else if(selectedMinority === "Native Hawaiian or Other Pacific Islander")
      populationPercentDifference = percent-this.props.averages.nhpi
    else if(selectedMinority === "White")
      populationPercentDifference = percent-this.props.averages.white
    return populationPercentDifference
  }

  render(){
    return(
      <div>
          {this.props.selectedMinority === "African American" && this.props.heatmapType === "diff" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercentDifference(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Asian" && this.props.heatmapType === "diff" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercentDifference(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Hispanic" && this.props.heatmapType === "diff" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercentDifference(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Native American or Alaska Native" && this.props.heatmapType === "diff" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercentDifference(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Native Hawaiian or Other Pacific Islander" && this.props.heatmapType === "diff" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercentDifference(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "White" && this.props.heatmapType === "diff" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercentDifference(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}

          {this.props.selectedMinority === "African American" && this.props.heatmapType === "percent" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercent(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Asian" && this.props.heatmapType === "percent" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercent(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Hispanic" && this.props.heatmapType === "percent" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercent(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Native American or Alaska Native" && this.props.heatmapType === "percent" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercent(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "Native Hawaiian or Other Pacific Islander" && this.props.heatmapType === "percent" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercent(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
          {this.props.selectedMinority === "White" && this.props.heatmapType === "percent" ? 
            this.props.precincts.features.map((precinct) => (
            <GeoJSON data = {precinct.geometry} style = {this.getHeatMapStylePercent(precinct)}
            onmouseover = {(e) => {this.props.displayDemoDataPrecinct(precinct.properties)}}
            onmouseout = {this.props.hideDemoData}></GeoJSON>)): <div/>}
      </div>
    )
  }
}

export default Heatmap