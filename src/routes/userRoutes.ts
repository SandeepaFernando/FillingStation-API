import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  updateUser,
} from "../controllers/userController";

const route = Router();

route.post("/createUser", async (req, res, next) => {
  const userName: string = req.body.userName;
  const nic: string = req.body.nic;
  const userRole: number = req.body.userRole;
  const password: string = req.body.password;

  const user = await createUser(userName, nic, userRole, password);

  return res.status(user.status).json({
    status: user.status,
    message: user.message,
    user: user.user,
  });
});

route.get("/getUser/:id", async (req, res, next) => {
  const id: string = req.params.id;
  const user = await getUserById(Number(id));

  return res.status(user.status).json({
    status: user.status,
    message: user.message,
    user: user.user,
  });
});

route.post("/updateUser", async (req, res, next) => {
  const id: number = req.body.id;
  const userName: string = req.body.userName;
  const nic: string = req.body.nic;
  const password: string = req.body.password;
  const userRole: number = req.body.userRole;

  const user = await updateUser(id, userName, nic, userRole, password);
  return res
    .status(user.status)
    .json({ status: user.status, message: user.message, user: user.user });
});

route.post("/deleteUser", async (req, res, next) => {
  const id: number = req.body.id;
  const user = await deleteUserById(id);

  return res.status(user.status).json({
    status: user.status,
    message: user.message,
    user: user.user,
  });
});

module.exports = route;
