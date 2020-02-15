import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import ar from "antd/es/locale/ar_EG";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";

ReactDOM.render(
  <ConfigProvider locale={ar}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
