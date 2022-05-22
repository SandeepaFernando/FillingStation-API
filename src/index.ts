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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/tank", tankRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
