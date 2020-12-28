import React, { Component } from "react"
import HistoryCard from "./HistoryCard"

class History extends Component{
  
  render(){
    return(
      <div id="scrollBar">{
            this.props.history.map((historyCard) => (
            <HistoryCard history={historyCard}
                          handleDelete={this.props.handleDelete}
                          changeDisplayedDistrict={this.props.changeDisplayedDistrict}
                          showAlertModal = {this.props.showAlertModal}
                          addDisplays = {this.props.addDisplays}/>
            ))}
      </div>
    )
  }
}

export default History;