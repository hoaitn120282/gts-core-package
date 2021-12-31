import express from "express";
import generationController from "src/modules/v1/generation/controllers/generation";
const router = express.Router();

router.post("/", generationController.create);

export default router;
