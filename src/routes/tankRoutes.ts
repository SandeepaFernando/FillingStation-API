import { Router } from "express";
import {
  createTank,
  deleteTank,
  getTankById,
  updateTank,
} from "../controllers/tankController";

const route = Router();

route.post("/create", async (req, res, next) => {
  const item: number = req.body.item;
  // TODO: add user id from jwt
  const userId: number = 1;

  const request = await createTank(userId, item);

  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const id: number = req.body.id;
  const remainQty: number = req.body.remainQty;
  const itemId: number = req.body.item;

  const request = await updateTank(id, remainQty, itemId);

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);

  const request = await getTankById(id);

  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = req.body.id;
  const request = await deleteTank(id);

  return res.status(request.status).json(request);
});

module.exports = route;
