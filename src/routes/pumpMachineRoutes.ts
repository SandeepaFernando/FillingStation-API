import { Router } from "express";
import {
  createPumpMachine,
  deletePumpMachine,
  getPumpMachineById,
  updatePumpMachine,
} from "../controllers/pumpMachineController";
const route = Router();

route.post("/create", async (req, res, next) => {
  const pumpName: string = req.body.pumpName;
  const meter: number = req.body.meter;
  const pumpOperator: number = req.body.pumpOperator;
  const tank: number = req.body.tank;

  const request = await createPumpMachine(pumpName, meter, pumpOperator, tank);

  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const pumpName: string = req.body.pumpName;
  const meter: number = req.body.meter;
  const pumpOperator: number = req.body.pumpOperator;
  const tank: number = req.body.tank;
  const id: number = req.body.id;

  const request = await updatePumpMachine(
    id,
    pumpName,
    meter,
    pumpOperator,
    tank
  );

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);
  const request = await getPumpMachineById(id);
  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = req.body.id;
  const request = await deletePumpMachine(id);
  return res.status(request.status).json(request);
});

module.exports = route;
