const app = require("./app");

const port = app.get("PORT");

// App setup
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running on port ${port}`);
});
