import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { submitResignation, submitExitResponses } from "../controllers/userController.js";

const router = express.Router();
router.post("/resign", authenticate, submitResignation);
router.post("/responses", authenticate, submitExitResponses);

export default router;
