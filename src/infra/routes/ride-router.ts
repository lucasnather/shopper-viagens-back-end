import { Router } from "express";
import { CreateRideController } from "../controller/CreateRideController";

const router = Router()

const createRideController = new CreateRideController()

router
    .post('/ride/estimate', (req, res) => createRideController.create(req, res))

export const rideRouter = router
