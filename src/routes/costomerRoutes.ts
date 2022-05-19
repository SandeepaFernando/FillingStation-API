import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
} from "../controllers/customerController";

const route = Router();

route.post("/create", async (req, res, next) => {
  const customerName: string = req.body.customerName;
  const address: string = req.body.address;
  const phone: string = req.body.phone;
  const email: string = req.body.email;
  const nic: string = req.body.nic;
  const customerNature: number = Number(req.body.customerNature);
  //TODO: add user ID from jwt
  const userId: number = 1;
  const request = await createCustomer(
    customerName,
    userId,
    address,
    phone,
    email,
    nic,
    customerNature
  );

  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const id: number = Number(req.body.id);
  const customerName: string = req.body.customerName;
  const address: string = req.body.address;
  const phone: string = req.body.phone;
  const email: string = req.body.email;
  const nic: string = req.body.nic;
  const balance: number = Number(req.body.balance);
  const customerNature: number = Number(req.body.customerNature);
  //TODO: add user ID from jwt
  const userId: number = 1;

  const request = await updateCustomer(
    id,
    userId,
    customerName,
    address,
    phone,
    email,
    nic,
    customerNature,
    balance
  );

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);
  const request = await getCustomerById(id);

  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = Number(req.body.id);
  const request = await deleteCustomer(id);

  return res.status(request.status).json(request);
});

module.exports = route;
