import React from "react";

import { Button } from "antd";

const ButtonGroup = Button.Group;

class ButtonGroupComponent extends React.Component {
  componentDidMount() {
    document.getElementById("salam").setAttribute("label", "salam");
  }

  render() {
    return (
      <>
        <ButtonGroup style={this.props.style} className={this.props.className}>
          <Button onClick={e => console.log(e.target.label)} id="salam">
            3333
          </Button>

          <Button onClick={e => console.log(e.target.label)}>ok</Button>
        </ButtonGroup>
      </>
    );
  }
}

export default ButtonGroupComponent;
