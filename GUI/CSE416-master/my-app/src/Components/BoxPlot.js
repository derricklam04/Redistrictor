import CanvasJSReact from "../canvasjs.react"
import React, {Component} from "react"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BoxPlot extends Component {

  convertState = (state) => {
    if(state === "GA") return "Georgia"
    else if(state === "TX") return "Texas"
    else if(state === "VA") return "Virginia"
    else return "N/A"
  }

	render() {
		let options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Job #" + this.props.history.id + ": " + this.convertState(this.props.history.state) + " Results"
			},
			axisY: {
				title: this.props.selectedBoxPlotMinority + " VAP%"
			},
			data: [
				{
					type: "boxAndWhisker",
					color: "black",
					upperBoxColor: "#7c8f81",
					lowerBoxColor: "#123d1d",
          dataPoints: this.props.boxplotData.BW.dataPoints
				},
				{
					type: "scatter",
					name: "Enacted",
					color: "red",
					toolTipContent: "<span style=\"color:#ff0000\">{name}</span>: {y} VAP%",
					showInLegend: true,
          dataPoints: this.props.boxplotData.enacted.dataPoints
				}
				
			
		]
		}
		return (
		<div className = "boxplot">
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BoxPlot;
