import { validateUser } from '../schemas/auth.js'

export class AuthController {

    constructor({authModel}) {
        this.authModel = authModel;
    }

    login = async (req, res) => {
    }

    register = async (req, res) =>{
        const result = validateUser(req.body);
        if (result.error) {
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }
        try {
            const isUserExists = await this.authModel.isUserExists(result.email);
            if (isUserExists) {
                return res.status(400).json({error: 'User already exists'});
            }
            const user = await this.authModel.register(result);
            if (user) {
                return res.status(201).json(user);
            }
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }

    logout = async (req, res) => {
    }

    getProtected = async (req, res) => {
    }

}
