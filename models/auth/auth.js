import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { connectionString } from '../../utils/db-connect.js';

export class AuthModel {

  static async isUserExists({ email }) {
    const connection = await mysql.createConnection(connectionString);
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();
    return rows.length > 0;
  }

  static async register({ input }) {
    const connection = await mysql.createConnection(connectionString);
    const id = uuidv4();
    const user = { id, ...input };
    const sql = 'INSERT INTO users SET ?';
    await connection.query(sql, user);
    await connection.end();
    return user;
  }

}
