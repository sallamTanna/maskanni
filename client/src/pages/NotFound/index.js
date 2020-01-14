import React from "react";
import Exception from "ant-design-pro/lib/Exception";

import Button from "../../components/Button";

import "ant-design-pro/dist/ant-design-pro.css";
import "./style.css";

class NotFound extends React.Component {
  render() {
    const { history } = this.props;
    const actions = (
      <div>
        <Button
          label="Back to home"
          className="back-button"
          onClick={() => history.push("/forget")}
        />
      </div>
    );

    return (
      <Exception
        title="404"
        actions={actions}
        desc="Sorry, the page you are trying to reach is not found!"
      />
    );
  }
}

export default NotFound;
