import { Router } from "express";
import {
  createTankDetails,
  deleteTankDetails,
  getTankDetailsById,
  updateTankDetails,
} from "../controllers/tankDetailsController";
const route = Router();

route.post("/create", async (req, res, next) => {
  const tanksId: number = req.body.tank;
  const pumpOperatorsId: number = req.body.pumpOperator;

  const request = await createTankDetails(tanksId, pumpOperatorsId);
  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const id: number = req.body.id;
  const tanksId: number = req.body.tanks;
  const pumpOperatorsId: number = req.body.pumpOperator;
  const startMeter: number = req.body.startMeter;
  const endMeter: number = req.body.endMeter;
  const sell: number = req.body.sell;
  const refill: number = req.body.refill;
  const wastage: number = req.body.wastage;
  const cost: number = req.body.cost;

  const request = await updateTankDetails(
    id,
    tanksId,
    startMeter,
    endMeter,
    sell,
    refill,
    wastage,
    pumpOperatorsId,
    cost
  );

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);
  const request = await getTankDetailsById(id);

  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = req.body.id;
  const request = await deleteTankDetails(id);

  return res.status(request.status).json(request);
});

module.exports = route;
