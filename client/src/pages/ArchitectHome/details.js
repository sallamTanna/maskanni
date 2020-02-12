import React from "react";

import Account from "./selectedComponent/Account";
import Designs from "./selectedComponent/Designs";
import Sales from "./selectedComponent/Sales";

const selectedComponent = (key, user) => {
  switch (key) {
    case "1":
      return <Account user={user} />;
    case "2":
      return <Designs user={user} />;
    case "3":
      return <Sales user={user} />;
    default:
      return <Account user={user} />;
  }
};

export default selectedComponent;
