import { Router } from "express";
import {
  createPumpMachineDetails,
  deletePumpMachineDetails,
  getPumpMachineDetailsById,
  updatePumpMachineDetails,
} from "../controllers/pumpMachineDetailsController";
const route = Router();

route.post("/create", async (req, res, next) => {
  const pumpOperator: number = req.body.pumpOperator;
  const pumpMachine: number = req.body.pumpMachine;
  const startMeter: number = req.body.startMeter;
  const endMeter: number = req.body.endMeter;

  const request = await createPumpMachineDetails(
    pumpOperator,
    pumpMachine,
    startMeter,
    endMeter
  );
  return res.status(request.status).json(request);
});

route.post("/update", async (req, res, next) => {
  const pumpOperator: number = req.body.pumpOperator;
  const pumpMachine: number = req.body.pumpMachine;
  const startMeter: number = req.body.startMeter;
  const endMeter: number = req.body.endMeter;
  const id: number = req.body.id;

  const request = await updatePumpMachineDetails(
    id,
    pumpOperator,
    pumpMachine,
    startMeter,
    endMeter
  );

  return res.status(request.status).json(request);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);
  const request = await getPumpMachineDetailsById(id);

  return res.status(request.status).json(request);
});

route.post("/delete", async (req, res, next) => {
  const id: number = req.body.id;
  const request = await deletePumpMachineDetails(id);

  return res.status(request.status).json(request);
});

module.exports = route;
