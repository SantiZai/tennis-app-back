import { Router } from 'express'
import * as courtController from '../controllers/courts.controller'

const cRouter = Router()

cRouter.get('/', courtController.getCourts)
cRouter.get('/:id', courtController.getCourt)
cRouter.post('/', courtController.createCourt)
cRouter.patch('/:id', courtController.updateCourt)
cRouter.delete('/:id', courtController.deleteCourt)

export default cRouter