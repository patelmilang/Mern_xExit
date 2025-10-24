import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getAllResignations, concludeResignation, getExitResponses } from "../controllers/adminController.js";

const router = express.Router();
router.get("/resignations", authenticate, getAllResignations);
router.put("/conclude_resignation", authenticate, concludeResignation);
router.get("/exit_responses", authenticate, getExitResponses);

export default router;
