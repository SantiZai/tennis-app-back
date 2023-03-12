import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const uRouter = Router()

uRouter.get('/', userController.getUsers)
uRouter.get('/:id', userController.getUser)
uRouter.post('/', userController.createUser)
uRouter.patch('/:id', userController.updateUser)
uRouter.delete('/:id', userController.deleteUser)

export default uRouter