import { Router } from "express";
import { ConfirmRideController } from "../controller/ConfirmRideController";
import { CreateRideController } from "../controller/CreateRideController";
import { FindManyRidesController } from "../controller/FindManyRidesController";

const router = Router()

const createRideController = new CreateRideController()
const confirmRideController = new ConfirmRideController()
const findManyRidesController = new FindManyRidesController()

router
    .post('/ride/estimate', (req, res) => createRideController.create(req, res))
    .patch('/ride/confirm', (req, res) => confirmRideController.confirm(req, res))
    .get('/ride/:customer_id', (req, res) => findManyRidesController.find(req, res))

export const rideRouter = router
