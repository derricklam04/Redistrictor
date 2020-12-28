import React, { Component } from "react"

class LayerControl extends Component{
  constructor(){
    super()
    this.state={
      districtName: "None",
      displayMapFilter: false,
      displays:[
        {key: "district", show: false},
        {key: "precinct", show: false},
        {key: "heatmap", show: false}
      ]
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    if(props.displays !== prevState.displays)
      return {
        displays: props.displays
      }
  }

  changeDisplayFilter = () =>{
    this.setState({ displayMapFilter: !this.state.displayMapFilter })
  }

  changeDisplay = (display) =>{
    this.props.changeDisplay(display, document.getElementById(display+"Checkbox").checked)
  }

  checkedCheckbox = (name) =>{
    let checked = false;
    this.state.displays.map((display) => {
      if(display.key === name)
        checked = display.show
      return display
    })
    return checked 
  }

  getLabelStyle = (color) => {
    let style = {
      backgroundColor: color
    }
    return style
  }

  render(){
    return( 
      <div className = {this.state.displayMapFilter ? "layerControl" : "layerControlHidden"}>
        <button className = {this.state.displayMapFilter ? "waves-effect waves-light btn-small red" : "waves-effect waves-light btn-small green"}
                onClick = {this.changeDisplayFilter}>FILTER</button>  
        <div className = {this.state.displayMapFilter ? "" : "hidden"}>
        <div><label>
            <input id="districtCheckbox" className = "filled-in" type="checkbox" 
                    onClick={(e) => {this.changeDisplay("district")}}
                    checked = {this.checkedCheckbox("district")}/>
            <span className="filterOptions">District</span>
          </label></div>
        <div>
          <label>
            <input id="precinctCheckbox" className = "filled-in" type="checkbox"
                    onClick={(e) => {this.changeDisplay("precinct")}}
                    checked = {this.checkedCheckbox("precinct")}/>
            <span className = "filterOptions">Precinct</span>
          </label>
        </div>
        <div>
          <label>
            <input id="heatmapCheckbox" className = "filled-in" type="checkbox"
                    onClick={(e) => {this.changeDisplay("heatmap")}}
                    checked = {this.checkedCheckbox("heatmap")}/>
            <span className = "filterOptions">Heatmap</span>
          </label>
        </div>
        {this.props.displayedDistrictingPlans.map((label) => 
          (this.props.state === label.state ? 
            <label style={this.getLabelStyle(label.color)}>
              <input id={label.key + "Checkbox"} className = "filled-in" type="checkbox"
                      onClick={(e) => {this.changeDisplay(label.key)}}
                      checked = {this.checkedCheckbox(label.key)}/>
              <span className = "filterOptions">{label.key}</span>
            </label>:<div/>)
        )}
        </div>
      </div>
    )
  }
}

export default LayerControl