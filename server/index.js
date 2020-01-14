const socket = require("socket.io");
const app = require("./app");

const port = app.get("PORT");

// App setup
const server = app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

