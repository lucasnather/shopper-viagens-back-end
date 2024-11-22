import { Router } from "express";
import { ConfirmRideController } from "../controller/ConfirmRideController";
import { CreateRideController } from "../controller/CreateRideController";
import { FindManyRidesController } from "../controller/FindManyRidesController";

const router = Router()

const createRideController = new CreateRideController()
const confirmRideController = new ConfirmRideController()
const findManyRidesController = new FindManyRidesController()

router
   /**
 * @swagger
 * /ride/estimate:
 *   post:
 *     summary: Estimativa de corrida
 *     tags: [Rides]
 *     description: Solicitação para estimar o valor de uma corrida.
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: 231f5831-86cf-4db3-968c-83ec2c887eb5
 *               origin:
 *                 type: string
 *                 example: Avenida Paulista
 *               destination:
 *                 type: string
 *                 example: Morumbi
 *     responses: 
 *       201:
 *         description: Estimativa de corrida gerada com sucesso
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties: 
 *                 origin:
 *                   type: object
 *                   properties:
 *                     latitude: 
 *                       type: number
 *                     longitude: 
 *                       type: number
 *                 destination:
 *                   type: object
 *                   properties:
 *                     latitude: 
 *                       type: number
 *                     longitude: 
 *                       type: number
 *                 distance:
 *                   type: number
 *                   description: Distância estimada entre a origem e o destino (em km)
 *                 duration:
 *                   type: number
 *                   description: Duração estimada da corrida (em minutos)
 *                 options:
 *                   type: object
 *                   properties:
 *                     drivers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           vehicle:
 *                             type: string
 *                           review:
 *                             type: object
 *                             properties:
 *                               rating:
 *                                 type: string
 *                               comment:
 *                                 type: string
 *                           value:
 *                             type: number
 *       404:
 *         description: Dados Inválidos/Ou Nulos
 */
    .post('/ride/estimate', (req, res) => createRideController.create(req, res))
/**
* @swagger
*  /ride/confirm:
*    patch:
*      summary: Confirmar de corrida
*      tags: [Rides]
*      description: Confirmar a corrida vindo da solicitação
*      produces:
*        - application/json
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                customer_id:
*                  type: string
*                  format: uuid
*                  example: 231f5831-86cf-4db3-968c-83ec2c887eb5
*                origin:
*                  type: string
*                  example: Avenida Paulista
*                destination:
*                  type: string
*                  example: Morumbi
*                distance:
*                  type: number
*                  example: 10.5
*                duration:
*                  type: number
*                  example: 25
*                value:
*                  type: number
*                  example: 16.352
*                driver:
*                  type: object
*                  properties:
*                    id:
*                      type: string
*                      example: 5808c614-5f91-472b-b1f8-203a392049d2
*                    name:
*                      type: string
*                      example: Homer Simpson
*      responses:
*        201:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  success:
*                    type: boolean
*                    example: true
*        404:
*          description: Dados inválidos
*        403:
*          description: Motorista Não Encontrado
*        402:
*          description: Quilometragem Inválid com a do Motorista
*/
.patch('/ride/confirm', (req, res) => confirmRideController.confirm(req, res))
/**
* @swagger
*   /ride/{customer_id}:
*     get:
*       summary: Estimativa de corridas para um cliente específico
*       tags: [Rides]
*       description: Solicita estimativas de corrida com base no ID do cliente e, opcionalmente, no ID do motorista.
*       parameters:
*         - name: customer_id
*           in: path
*           required: true
*           description: ID do cliente
*           schema:
*             type: string
*             format: uuid
*             example: "231f5831-86cf-4db3-968c-83ec2c887eb5"
*         - name: driver_id
*           in: query
*           required: false
*           description: ID do motorista
*           schema:
*             type: string
*             format: uuid
*             example: "5808c614-5f91-472b-b1f8-203a392049d2"
*       responses:
*         200:
*           description: Lista de estimativas de corrida
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       example: 1
*                     date:
*                       type: string
*                       format: date-time
*                       example: "2024-11-22T02:14:35.934Z"
*                     origin:
*                       type: string
*                       example: "Condomínio Parque Aripuanã"
*                     destination:
*                       type: string
*                       example: "Maternidade Balbina Mestrinho"
*                     distance:
*                       type: number
*                       example: 8
*                     duration:
*                       type: number
*                       example: 17
*                     value:
*                       type: number
*                       example: 16
*                     customerId:
*                       type: string
*                       format: uuid
*                       example: "231f5831-86cf-4db3-968c-83ec2c887eb5"
*                     driverId:
*                       type: string
*                       format: uuid
*                       example: "5808c614-5f91-472b-b1f8-203a392049d2"
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: "2024-11-22T16:16:28.897Z"
*         404:
*           description: Nenhuma corrida encontrada para o cliente ou motorista não encontrado
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Nenhuma corrida encontrada para o cliente ou motorista não encontrado"
* 
 */
.get('/ride/:customer_id', (req, res) => findManyRidesController.find(req, res))

export const rideRouter = router


