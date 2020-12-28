import React, { Component } from "react"

class Legend extends Component{
  constructor(){
    super()
    this.state = {
      displayLegend: false,
      heatmapType: "percent"
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.heatmapType !== state.heatmapType){
      return{
        displayLegend: state.displayLegend,
        heatmapType: props.heatmapType
      }
    }
  }


  toggleLegend = () => {
    this.setState({ displayLegend: !this.state.displayLegend })
  }

  getBoxStyle = (color) =>{
    let style = {
      backgroundColor: color,
      float: "left",
      height: "20px",
      width: "96%",
      border: "1px solid black",
      textAlign: "center",
      left: "2%",
      opacity: 0.8}
    return style
  }
  getLegendText = (number) =>{
    if(this.props.heatmapType === "diff"){
      if(number === 0) return "<2.5%"
      else if(number === 12) return ">30%"
      else return number*2.5 + "%-" + (number*2.5+2.5) + "%"
    }
    else{
      if(number === 0) return "<5%"
      else if(number === 12) return ">60%"
      else return number*5 + "%-" + (number+1)*5 + "%"
    }

  }

  render(){
    return(
      <div className = {this.state.displayLegend ? "legend" : "legendHidden"}>
        {console.log(this.state)}
        <div className = "generateButton">
          <button className = {this.state.displayLegend ? "waves-effect waves-light btn-small red" 
                    : "waves-effect waves-light btn-small green"}
                  onClick = {this.toggleLegend}>Legend</button>
        </div>
        <div className = "legendTop">
          <div className = "bold center">Heatmap Minority</div>
          <div className = "form-group">
            <select id = "heatmapMinorityInput" className = "form-control" onChange = {this.props.changeSelectedMinority}>
              <option value = "African American">African American</option>
              <option value = "Asian">Asian</option>
              <option value = "Hispanic">Hispanic</option>
              <option value = "Native American or Alaska Native">Native American or Alaska Native</option>
              <option value = "Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
              <option value = "White">White</option>
            </select>
          </div>
          <div className = "bold center">Heatmap Type</div>
          <div className = "form-group">
            <select id = "heatmapMinorityType" className = "form-control" onChange = {this.props.changeHeatmapType}>
              <option value = "percent">Percent of Precinct</option>
              <option value = "diff">Percentage Difference</option>
            </select>
          </div>
        </div>
            <div className = "col s1" style = {this.getBoxStyle("#00BD3F")}>{this.getLegendText(0)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#00C816")}>{this.getLegendText(1)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#17D300")}>{this.getLegendText(2)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#4ADE00")}>{this.getLegendText(3)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#81E900")}>{this.getLegendText(4)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#BEF400")}>{this.getLegendText(5)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#FFFF00")}>{this.getLegendText(6)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#FFCD00")}>{this.getLegendText(7)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#FF9C00")}>{this.getLegendText(8)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#FF6A00")}>{this.getLegendText(9)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#FF3900")}>{this.getLegendText(10)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#FF0700")}>{this.getLegendText(11)}</div>
            <div className = "col s1" style = {this.getBoxStyle("#FF002B")}>{this.getLegendText(12)}</div>
      </div>
    )
  }
}

export default Legend