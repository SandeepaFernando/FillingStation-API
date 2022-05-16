import { Router } from "express";
import {
  createBranch,
  deleteBranch,
  getBranchById,
  updateBranch,
} from "../controllers/branchController";
const route = Router();

route.post("/create", async (req, res, next) => {
  const branchName: string = req.body.branchName;
  const address: string = req.body.address;
  const phone: string = req.body.phone;
  //TODO: Add the userId from the jwt
  const usersId: number = 3;

  const request = await createBranch(branchName, usersId, phone, address);

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);

  const request = await getBranchById(id);

  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const id: number = Number(req.body.id);
  const branchName: string = req.body.branchName;
  const address: string = req.body.address;
  const phone: string = req.body.phone;
  //TODO: Add usersId from jwt
  const usersId: number = 3;

  const request = await updateBranch(id, branchName, usersId, phone, address);

  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = Number(req.body.id);

  const request = await deleteBranch(id);

  return res.status(request.status).json(request);
});

module.exports = route;
