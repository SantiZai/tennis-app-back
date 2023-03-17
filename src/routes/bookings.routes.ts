import { Router } from 'express'
import * as bookingController from '../controllers/bookings.controller'

const bRouter = Router()

bRouter.get('/', bookingController.getBookings)
bRouter.get('/:id', bookingController.getBooking)
bRouter.post('/', bookingController.createBooking)
bRouter.patch('/:id', bookingController.updateBooking)
bRouter.delete('/:id', bookingController.deleteBooking)

export default bRouter