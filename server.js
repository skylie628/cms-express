const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./src/routes/user.route.js");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
