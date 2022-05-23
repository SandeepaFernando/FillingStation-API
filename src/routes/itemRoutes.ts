import { Router } from "express";
import {
  createItem,
  deleteItem,
  editItem,
  getItemById,
} from "../controllers/itemsController";
const route = Router();

route.post("/create", async (req, res, next) => {
  const vendor: number = req.body.vendor;
  const itemName: string = req.body.itemName;
  const qty: number = req.body.qty;
  const min: number = req.body.min;
  const max: number = req.body.max;
  const sellingPrice: number = Number(req.body.sellingPrice);
  const measurementType: number = Number(req.body.measurementType);
  const editable: boolean = req.body.editable;
  const cost: number = req.body.cost;
  // TODO: Get user ID from jwt
  const userId: number = 1;

  const item = await createItem(
    vendor,
    itemName,
    sellingPrice,
    editable,
    userId,
    qty,
    min,
    max,
    cost,
    measurementType
  );
  return res.status(item.status).json(item);
});

route.post("/edit", async (req, res, next) => {
  const id: number = req.body.id;
  const vendor: number = req.body.vendor;
  const itemName: string = req.body.itemName;
  const sellingPrice: number = req.body.sellingPrice;
  const editable: boolean = req.body.editable;
  const qty: number = req.body.qty;
  const min: number = req.body.min;
  const max: number = req.body.max;
  const cost: number = req.body.cost;
  const measurementType: number = req.body.measurementType;
  // TODO: Add user Id from jwt
  const userId: number = 1;

  const item = await editItem(
    id,
    userId,
    vendor,
    itemName,
    qty,
    min,
    max,
    cost,
    sellingPrice,
    measurementType,
    editable
  );

  return res.status(item.status).json(item);
});

route.get("/:id", async (req, res, next) => {
  const id: number = Number(req.params.id);

  const item = await getItemById(id);

  return res.status(item.status).json(item);
});

route.post("/delete", async (req, res, next) => {
  const id: number = Number(req.body.id);
  const item = await deleteItem(id);

  return res.status(item.status).json(item);
});

module.exports = route;
