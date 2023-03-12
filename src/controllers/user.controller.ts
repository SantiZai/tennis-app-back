import { RequestHandler } from 'express'
import { pool } from '../db'

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const [users] = await pool.promise().query('SELECT * FROM users')
        res.json(users)
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getUser: RequestHandler = async (req, res) => {
    try {
        const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'User not found'
        })
        res.json(rows[0])
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createUser: RequestHandler = async (req, res) => {
    try {
        const { fullname, password } = req.body
        await pool.promise().query('INSERT INTO users (fullname, password) VALUES (?,?)', [fullname, password])
        res.status(200).json({
            message: 'User created'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const { fullname, password, has_turn } = req.body
        const [result] = await pool.promise().query('UPDATE users SET fullname = IFNULL(?, fullname), password = IFNULL(?, password), has_turn = IFNULL(?, has_turn) WHERE id = ?', [fullname, password, has_turn, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'User not found'
        })
        res.status(200).json({
            message: 'User updated'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.promise().query('DELETE FROM users WHERE id =?', [id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'User not found'
        })
        res.status(200).json({
            message: 'User deleted successfully'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}