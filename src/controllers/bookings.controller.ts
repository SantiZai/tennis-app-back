import { RequestHandler } from 'express'
import { pool } from '../db'

interface IBooking {
    id?: number
    court_id: number
    start_time: Date
    end_time?: Date
    player_1_id: number
    player_2_id: number
}

export const getBookings: RequestHandler = async (req, res) => {
    try {
        const [bookings] = await pool.promise().query('SELECT * FROM bookings')
        res.json(bookings)
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getBooking: RequestHandler = async (req, res) => {
    try {
        const [rows] = await pool.promise().query('SELECT * FROM bookings WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Booking not found'
        })
        res.json(rows[0])
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createBooking: RequestHandler = async (req, res) => {
    try {
        const booking: IBooking = req.body
        const start_time = new Date(booking.start_time);
        const end_time = new Date(start_time.getTime() + 90 * 60000);
        await pool.promise().query('INSERT INTO bookings (court_id, start_time, end_time, player_1_id, player_2_id) VALUES (?,?,?,?,?)', [booking.court_id, start_time, end_time, booking.player_1_id, booking.player_2_id])
        res.status(200).json({
            message: 'Booking created'
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateBooking: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const booking: IBooking = req.body
        const start_time = new Date(booking.start_time);
        const end_time = new Date(start_time.getTime() + 90 * 60000);
        const [result] = await pool.promise().query('UPDATE bookings SET court_id = IFNULL(?, court_id), start_time = IFNULL(?, start_time), end_time = IFNULL(?, end_time), player_1_id = IFNULL(?, player_1_id), player_2_id = IFNULL (?, player_2_id) WHERE id = ?', [booking.court_id, start_time, end_time, booking.player_1_id, booking.player_2_id, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Booking not found'
        })
        res.status(200).json({
            message: 'Booking updated'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteBooking: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.promise().query('DELETE FROM bookings WHERE id =?', [id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Booking not found'
        })
        res.status(200).json({
            message: 'Booking deleted'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}