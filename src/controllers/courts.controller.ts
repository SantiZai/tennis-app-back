import { RequestHandler } from 'express'
import { pool } from '../db'

export const getCourts: RequestHandler = async (req, res) => {
    try {
        const [courts] = await pool.promise().query('SELECT * FROM courts')
        res.json(courts)
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getCourt: RequestHandler = async (req, res) => {
    try {
        const [rows] = await pool.promise().query('SELECT * FROM courts WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Court not found'
        })
        res.json(rows[0])
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createCourt: RequestHandler = async (req, res) => {
    try {
        const { name, max_players } = req.body
        await pool.promise().query('INSERT INTO courts (name, max_players) VALUES (?,?)', [name, max_players])
        res.status(200).json({
            message: 'Court created'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateCourt: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const { name, max_players, current_players } = req.body
        const [result] = await pool.promise().query('UPDATE courts SET name = IFNULL(?, name), max_players = IFNULL(?, max_players), current_players = IFNULL(?, current_players) WHERE id = ?', [name, max_players, current_players, id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Court not found'
        })
        res.status(200).json({
            message: 'Court updated'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteCourt: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.promise().query('DELETE FROM courts WHERE id = ?', [id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Court not found'
        })
        res.status(200).json({
            message: 'Court deleted'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}