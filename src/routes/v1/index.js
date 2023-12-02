import express from "express";
const router = express.Router();
import { helpDetails } from "../../controllers/help.controller.js";

router.get("/help", helpDetails);

export {router};

