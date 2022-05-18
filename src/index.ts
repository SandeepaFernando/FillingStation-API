import express from "express";

const cors = require("cors");
const app = express();
const port = 3000;

const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const branchRoutes = require("./routes/branchRoutes");
const customerRoutes = require("./routes/costomerRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/customer", customerRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
