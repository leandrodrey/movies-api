import { validatePartialUser, validateUser } from '../schemas/auth.js'
import jwt from 'jsonwebtoken'

export class AuthController {

    constructor ({ authModel }) {
        this.authModel = authModel
    }

    login = async (req, res) => {
        const result = validatePartialUser(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        try {
            const isUserExists = await this.authModel.isUserExists({ email: result.data.email })
            if (!isUserExists) {
                return res.status(401).json({ error: 'User doesnt exist' })
            }
            const isPasswordCorrect = await this.authModel.isPasswordCorrect({ user: result.data })
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Invalid credentials' })
            }
            const user = await this.authModel.login({ email: result.data.email })
            const token = jwt.sign({ user }, process.env.JWT_SECRET ?? 'secret test to use in local', { expiresIn: '1h' })
            if (user) {
                res.cookie('access_token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                })
                res.status(200).json({ user, token })
            } else {
                return res.status(401).json({ error: 'Invalid credentials' })
            }
        } catch (error) {
            console.error('Login failed for an unknown reason:', error)
            return res.status(500).json({ error: 'Login failed' })
        }
    }

    register = async (req, res) => {
        const result = validateUser(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        try {
            const isUserExists = await this.authModel.isUserExists({ email: result.data.email })
            if (isUserExists) {
                return res.status(400).json({ error: 'User already exists' })
            }
            const user = await this.authModel.register({ user: result.data })
            if (user) {
                return res.status(201).json(user)
            } else {
                console.error('Registration failed for an unknown reason')
                return res.status(500).json({ error: 'User creation failed' })
            }
        } catch (error) {
            res.status(500).send('Registration failed for an unknown reason')
        }
    }

    logout = async (req, res) => {
    }

    getLoggedUserFromSession = (req, res) => {
        const { user } = req.session
        console.log('user:', user)
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        return res.status(200).json(user)
    }

}
