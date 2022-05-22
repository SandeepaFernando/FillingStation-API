import { Router } from "express";
import {
  createRefill,
  deleteRefill,
  getRefillById,
  updateRefill,
} from "../controllers/refillController";
const route = Router();

route.post("/create", async (req, res, next) => {
  const refillAmount: number = req.body.refillAmount;
  const date: string = req.body.date;
  const cost: number = req.body.cost;
  const tank: number = req.body.tank;

  const request = await createRefill(tank, refillAmount, date, cost);

  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const id: number = req.body.id;
  const refillAmount: number = req.body.refillAmount;
  const date: string = req.body.date;
  const cost: number = req.body.cost;
  const tank: number = req.body.tank;

  const request = await updateRefill(id, refillAmount, cost, date, tank);

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);

  const request = await getRefillById(id);

  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = req.body.id;

  const request = await deleteRefill(id);

  return res.status(request.status).json(request);
});

module.exports = route;
