import { Router } from "express";
import {
  createVendor,
  deleteVendor,
  getVendorById,
  updateVendor,
} from "../controllers/vendorController";
const route = Router();

route.post("/create", async (req, res, next) => {
  const vendorName: string = req.body.vendorName;
  const address: string = req.body.address;
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  // TODO: add user id from jwt (req.user)
  const user: number = 1;

  const request = await createVendor(vendorName, user, address, phone, email);
  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const id: number = req.body.id;
  const vendorName: string = req.body.vendorName;
  const address: string = req.body.address;
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  const balance: number = req.body.balance;
  // TODO: add user if from jwt (req.user)
  const user: number = 3;

  const request = await updateVendor(
    id,
    user,
    vendorName,
    address,
    phone,
    email,
    balance
  );

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);

  const request = await getVendorById(id);

  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = req.body.id;

  const request = await deleteVendor(id);

  return res.status(request.status).json(request);
});

module.exports = route;
