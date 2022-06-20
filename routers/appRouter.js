const app = require("@forkjs/group-router");

const { login, dashboard } = require("../controllers/appController");

app.group("/api/appjwt", () => {
  //* /api/appjwt/login
  app.post("/login", login);
  //* /api/appjwt/dashboard
  app.post("/dashboard", dashboard);
});

module.exports = app.router;
