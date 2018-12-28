import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const Input = (props) => {
  return (  
    <FormGroup controlId={props.id} bsSize={props.size} className={props.errorMessage && "has-error"}>
      <ControlLabel>{props.title}</ControlLabel>
      <FormControl
        value={props.value}
        onChange={props.handleChange}
        type={props.type}
        placeholder={props.placeholder}
        id={props.name}
        name={props.name}
        autoFocus={props.isAutoFocus}
      />
      { 
        props.value !== "" 
        && <span className={props.errorMessage ? "glyphicon glyphicon-remove cross" : "glyphicon glyphicon-ok cross"} aria-hidden="true"></span>
      }
      <span className="help-block">{props.errorMessage}</span>
    </FormGroup>
  )
}
export default Input;