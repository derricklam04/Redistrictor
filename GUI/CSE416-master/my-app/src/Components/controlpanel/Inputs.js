import React, { Component } from "react"

class Inputs extends Component{

  validateInputs = () =>{
    let valid = true
    let numPlans = document.getElementById("numPlansInput").value
    if (numPlans < 0){
      this.props.showAlertModal("Number of plans can not be negative")
      valid = false}
    else if (numPlans === "0"){
      this.props.showAlertModal("Number of plans can not be zero")
      valid = false}
    else if (numPlans === ""){
      this.props.showAlertModal("Number of plans can not be empty")
      valid = false}
    if(valid)
      this.props.generateJob()
  }

  render(){
    return(
      <div>
        <div id = "inputs">
          <div className = "bold">Selected State</div>
          <div>{this.props.state}</div>
          <div className = "bold">Number of Plans</div> 
          <input id = "numPlansInput" type = "number" min = "1"/>
          <div className = "bold">Population Difference</div>
          <div className = "form-group">
            <select id = "populationDifferenceInput" className = "form-control">
              <option value = "Least">Least Variation</option>
              <option value = "Normal">Some Variation</option>
              <option value = "More">More Variation</option>
              <option value = "Most">Most Variation</option>
            </select>
          </div>
          <div className = "bold">Compactness Goal</div> 
          <div className = "form-group">
            <select id = "compactnessGoalInput" className = "form-control">
              <option value = "Least">Least Compact</option>
              <option value = "Normal">Compact</option>
              <option value = "More">More Compact</option>
              <option value = "Most">Most Compact</option>
            </select>
          </div>
        </div>
        <button 
          className = "waves-effect waves-light btn-small green"
          onClick = {this.validateInputs}>Generate</button>
      </div>
    )
  }
}

export default Inputs;