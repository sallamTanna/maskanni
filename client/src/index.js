/* eslint-disable no-undef */
import { ConfigProvider } from "antd";
import ar from "antd/es/locale/ar_EG";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ConfigProvider locale={ar}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
