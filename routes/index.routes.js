import * as dotenv from "dotenv";

dotenv.config();

import { Router } from "express";
import { indexController } from "../controllers/index.controller.js";

const router = Router();

router.get("/", indexController.welcomeMessage);

router.get("/joyas", indexController.getAlljewells);

/* router.post("/posts", indexController.makePost); */

router.get("/joyas/:id", indexController.getOne);

router.get("/joyas/filtros", indexController.reportandoQuery, indexController.filter);

/* router.put("/posts/like/:id", indexController.modifyPost);

router.delete("/posts/:id", indexController.deletePost); */



export default router;
