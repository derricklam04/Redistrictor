import React, { Component } from "react"
import DemoDataCard from "./DemoDataCard"

class Demodata extends Component{

  largeNumberConverter = (number) =>{
    if(typeof(number) != "undefined")
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    else
      return "N/A"
  }

  render(){
    return(
      <div className = "smallFont">
        <div className = "bold center">Demographic Data</div>
        <div className = "demoDataLeft">
          <div className = "bottomMargin">
            <DemoDataCard text = "Precinct ID:" number = {this.props.properties.ID}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Total Population:" number = {this.largeNumberConverter(this.props.properties.TOTPOP)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Total Population VAP:" number = {this.largeNumberConverter(this.props.properties.VAP)}/>
            </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "African American:" number = {this.largeNumberConverter(this.props.properties.BLACK)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "African American VAP:" number = {this.largeNumberConverter(this.props.properties.BVAP)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Asian:" number = {this.largeNumberConverter(this.props.properties.ASIAN)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Asian VAP:" number = {this.largeNumberConverter(this.props.properties.ASIANVAP)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Hispanic:" number = {this.largeNumberConverter(this.props.properties.HISP)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Hispanic VAP:" number = {this.largeNumberConverter(this.props.properties.HVAP)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Native American or Alaska Native:" number = {this.largeNumberConverter(this.props.properties.AMIN)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Native American or Alaska Native VAP:" number = {this.largeNumberConverter(this.props.properties.AMINVAP)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Native Hawaiian or Other Pacific Islander:" number = {this.largeNumberConverter(this.props.properties.NHPI)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "Native Hawaiian or Other Pacific Islander VAP:" number = {this.largeNumberConverter(this.props.properties.NHPIVAP)}/>
          </div> 
          <div className = "bottomMargin">
            <DemoDataCard text = "White:" number = {this.largeNumberConverter(this.props.properties.WHITE)}/>
          </div>
          <div className = "bottomMargin">
            <DemoDataCard text = "White VAP:" number = {this.largeNumberConverter(this.props.properties.WVAP)}/>
          </div>
      </div>
    </div>
    )
  }
}

export default Demodata