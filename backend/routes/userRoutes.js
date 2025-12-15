import e from "express";
import { createUser, getAllUsers, getUserById, loginUser } from "../controllers/userControllers.js";


const router = e.Router();

router.post("/usercreate", createUser);
router.get("/usergetAll", getAllUsers);
router.get("/usergetSingle/:id", getUserById);
router.post("/login", loginUser);



export default router;  