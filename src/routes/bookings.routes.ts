import { Router } from 'express'

const bRouter = Router()

bRouter.get('/')
bRouter.get('/:id') 
bRouter.post('/')
bRouter.patch('/:id')
bRouter.delete('/:id')

export default bRouter