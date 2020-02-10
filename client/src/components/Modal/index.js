import React from "react";
import { Modal } from "antd";

import Button from "../Button";

import "./style.css";

class ModalComponent extends React.Component {
  state = {
    visible: false,
  };

  showModal = () =>
    this.setState({
      visible: true,
    });

  handleOk = () =>
    this.setState({
      visible: false,
    });

  handleCancel = () =>
    this.setState({
      visible: false,
    });

  render() {
    const { buttonLabel, modalTitle, children } = this.props;
    const { visible } = this.state;

    return (
      <div className="Modal">
        <Button className="Modal-show" onClick={this.showModal} label={buttonLabel} />
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {children}
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
