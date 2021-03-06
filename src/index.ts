import express from "express";

const cors = require("cors");
const app = express();
const port = 3000;

const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const branchRoutes = require("./routes/branchRoutes");
const customerRoutes = require("./routes/costomerRoutes");
const itemRoutes = require("./routes/itemRoutes");
const tankRoutes = require("./routes/tankRoutes");
const refillRoutes = require("./routes/refillRoutes");
const pumpMachineRoutes = require("./routes/pumpMachineRoutes");
const pumpOperatorRoutes = require("./routes/pumpOperatorRoute");
const pumpMachineDetailsRoutes = require("./routes/pumpMachineDetailsRoute");
const tankDetailsRoutes = require("./routes/tankDetailsRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/tank", tankRoutes);
app.use("/api/refill", refillRoutes);
app.use("/api/pump-machine", pumpMachineRoutes);
app.use("/api/pump-operator", pumpOperatorRoutes);
app.use("/api/pump-machine-details", pumpMachineDetailsRoutes);
app.use("/api/tank-details", tankDetailsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
