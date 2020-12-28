import React, {useState} from "react"
import {Button, Modal} from "react-bootstrap"
import BoxPlot from "./BoxPlot"


function Results(props) {

    let [show, setShow] = useState(false);
    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);

    return (
      <>
        <button className="waves-effect waves-light btn-small green" onClick = {handleShow}>
          See Results
        </button>
        <Modal className = "boxplotModal" show = {show} onHide = {handleClose} size = "xl" bsPrefix = "boxplotModal">
          <BoxPlot selectedBoxPlotMinority = {props.selectedBoxplotMinority} history = {props.history}
                  boxplotData = {props.boxplotData}/>
          <div className = "boxplotLeft">
          <div className = "row">
            <div>
            <div className = "bold largeFont">Boxplot Minority</div>
              <div className = "form-group">
                <select id = "boxplotMinorityInput" className = "form-control" onChange = {props.changeSelectedBoxplotMinority}>
                  <option value = "African American">African American</option>
                  <option value = "Asian">Asian</option>
                  <option value = "Hispanic">Hispanic</option>
                  <option value = "Native American or Alaska Native">Native American or Alaska Native</option>
                  <option value = "Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                  <option value = "White">White</option>
                </select>
              </div>
              </div>
          <Modal.Footer><Button variant = "secondary" onClick = {handleClose}>Close</Button></Modal.Footer>
          </div>
          </div>
        </Modal>
      </>
    );
  }
  
  export default Results;
