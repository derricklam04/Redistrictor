import React, { Component } from "react"
import {Navbar, Dropdown, DropdownButton} from "react-bootstrap"
import logo from "./eagle.png"


class NavBar extends Component{

  render(){
    return (
    <Navbar id = "navbar" fixed = "top" bg = "dark" variant = "dark">
      <Navbar.Brand onClick = {this.props.goHome}>HOME</Navbar.Brand>
      <DropdownButton id = "collasibleNavDropdown" title = "States" onSelect = {this.props.handleSelect}>
        <Dropdown.Item eventKey = "Georgia">Georgia</Dropdown.Item>
        <Dropdown.Item eventKey = "Texas">Texas</Dropdown.Item>
        <Dropdown.Item eventKey = "Virginia">Virginia</Dropdown.Item>
      </DropdownButton>
      <img src={logo} className = "image" height = "40" alt = "Loading"/>
    </Navbar>
    )
  }
}

export default NavBar;
