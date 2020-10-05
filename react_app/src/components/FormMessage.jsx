import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class FormMessage extends Component {
  render() {
    return (
      <div id="uncolabChat_tabinputcontainer">
        <div id="downplugins">
          <input
            id="uncolabChat_textarea"
            name="message"
            onChange={this.props.onChange}
            value={this.props.inputValues}
            placeholder="Enter your help"
            onKeyPress={this.props.onKeyPress}
          />
          <FontAwesomeIcon className="btn_enter" icon="arrow-right" />
        </div>
      </div>
    );
  }
}

export default FormMessage;
