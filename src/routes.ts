import { Router } from "express";
import CityController from "./controller/CityController";
import StateController from "./controller/StateController";

const router = Router();

// * ROTAS DOS ESTADOS
router.post('/state',StateController.handlePost)
router.get('/state',StateController.handleGetAll)
router.get('/state/:id',StateController.handleGetById)
router.put('/state/:id',StateController.handlePut)
router.delete('/state/:id',StateController.handleDelete)

// * ROTAS DAS CIDADES
router.post('/city', CityController.handlePost)
router.get('/city', CityController.handleGetAll)
router.get('/city/:id', CityController.handleGetById)

export { router };
