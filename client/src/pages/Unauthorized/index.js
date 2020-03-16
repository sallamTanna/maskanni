import Exception from "ant-design-pro/lib/Exception";
import React from "react";

import Button from "../../components/Button";

import "ant-design-pro/dist/ant-design-pro.css";
import "./style.css";

class NotFound extends React.Component {
  render() {
    const { history } = this.props;
    const actions = (
      <div>
        <Button label="العودة الى الخلف" className="back-button" onClick={() => history.goBack()} />
      </div>
    );

    return <Exception title="401" actions={actions} desc="لا يمكنك الدخول الي هذه الصفحة" />;
  }
}

export default NotFound;
