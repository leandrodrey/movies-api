import mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { connectionString } from '../../db/db-connect.js'

export class AuthModel {

    static async isUserExists ({ email }) {
        let connection
        try {
            const connection = await mysql.createConnection(connectionString)
            const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email])
            return rows.length > 0
        } catch (error) {
            console.error(error)
            return false
        } finally {
            if (connection) {
                await connection.end()
            }
        }
    }

    static async isPasswordCorrect ({ user }) {
        let connection
        try {
            connection = await mysql.createConnection(connectionString)
            const [rows] = await connection.execute('SELECT password FROM users WHERE email = ?', [user.email])
            const hashedPassword = rows[0].password
            return await bcrypt.compare(user.password, hashedPassword)
        } catch (error) {
            console.error('Error checking password:', error)
            return false
        } finally {
            if (connection) {
                await connection.end()
            }
        }
    }

    static async register ({ user }) {
        let connection
        try {
            connection = await mysql.createConnection(connectionString)
            const generatedUserId = uuidv4()
            const hashedPassword = await bcrypt.hash(user.password, 10)
            const newUser = { generatedUserId, ...user }
            const sql = 'INSERT INTO users (id, name, lastname, email, password, birthdate, country) VALUES (?, ?, ?, ?, ?, ?, ?)'
            await connection.query(sql, [
                generatedUserId,
                user.name,
                user.lastname,
                user.email,
                hashedPassword,
                user.birthdate,
                user.country
            ])
            return newUser
        } catch (error) {
            console.error('Error registering user:', error)
            throw error
        } finally {
            if (connection) {
                await connection.end()
            }
        }
    }

    static async login ({ email }) {
        let connection
        try {
            connection = await mysql.createConnection(connectionString);
            const [rows] = await connection.execute(
                'SELECT name, email FROM users WHERE email = ?',
                [email]
            );
            const [foundUser] = rows;
            return foundUser;
        } catch (error) {
            console.error('Error logging in:', error)
            throw error
        } finally {
            if (connection) {
                await connection.end()
            }
        }
    }

}
