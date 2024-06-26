import mysql from 'mysql2/promise';

const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'secret',
    database: 'moviesdb'
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

export class MovieModel {

    static async getAll() {
        let connection;
        try {
            connection = await mysql.createConnection(connectionString);

            const query = `
                SELECT 
                    m.*,
                    GROUP_CONCAT(DISTINCT a.name) AS actors,
                    GROUP_CONCAT(DISTINCT d.name) AS directors,
                    GROUP_CONCAT(DISTINCT g.name) AS genres
                FROM movie m
                LEFT JOIN movie_actor ma ON m.id = ma.movie_id
                LEFT JOIN actor a ON ma.actor_id = a.id
                LEFT JOIN movie_director md ON m.id = md.movie_id
                LEFT JOIN director d ON md.director_id = d.id
                LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                LEFT JOIN genre g ON mg.genre_id = g.id
                GROUP BY m.id
            `;
            const [rows] = await connection.execute(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las películas:', error);
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }

    static async getById({ id }) {
        let connection;
        try {
            connection = await mysql.createConnection(connectionString);

            const query = `
                SELECT 
                    m.*,
                    GROUP_CONCAT(DISTINCT a.name) AS actors,
                    GROUP_CONCAT(DISTINCT d.name) AS directors,
                    GROUP_CONCAT(DISTINCT g.name) AS genres
                FROM movie m
                LEFT JOIN movie_actor ma ON m.id = ma.movie_id
                LEFT JOIN actor a ON ma.actor_id = a.id
                LEFT JOIN movie_director md ON m.id = md.movie_id
                LEFT JOIN director d ON md.director_id = d.id
                LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                LEFT JOIN genre g ON mg.genre_id = g.id
                WHERE m.id = UNHEX(REPLACE(?, "-", ""))
                GROUP BY m.id
            `;

            const [rows] = await connection.execute(query, [id]);

            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error('Error al obtener la película por ID:', error);
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }

    static async create({input}) {
        const connection = await mysql.createConnection(connectionString);

        try {
            // Iniciar una transacción para garantizar la consistencia de los datos
            await connection.beginTransaction();

            // Insertar la nueva película en la tabla 'movie'
            const [result] = await connection.execute(
                mysql.format(
                    'INSERT INTO movie (id, title, year, duration, poster, rate, trailer, status, budget, revenue) VALUES (UNHEX(REPLACE(UUID(), "-", "")), ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [input.title, input.year, input.duration, input.poster, input.rate, input.trailer, input.status, input.budget, input.revenue]
                )
            );
            const movieId = result.insertId;

            // Insertar o obtener los IDs de los actores
            const actorIds = await Promise.all(input.actors.map(async (actor) => {
                const [rows] = await connection.query('SELECT id FROM actor WHERE name = ?', [actor]);
                if (rows.length) {
                    return rows[0].id;
                } else {
                    const [result] = await connection.query('INSERT INTO actor (name) VALUES (?)', [actor]);
                    return result.insertId;
                }
            }));
            const actorValues = actorIds.map(actorId => [movieId, actorId]);
            await connection.query('INSERT INTO movie_actor (movie_id, actor_id) VALUES ?', [actorValues]);

            // Insertar o obtener los IDs de los directores
            const [directorRows] = await connection.query('SELECT id FROM director WHERE name = ?', [input.director]);
            let directorId;
            if (directorRows.length) {
                directorId = directorRows[0].id;
            } else {
                const [result] = await connection.query('INSERT INTO director (name) VALUES (?)', [input.director]);
                directorId = result.insertId;
            }
            await connection.query('INSERT INTO movie_director (movie_id, director_id) VALUES (?, ?)', [movieId, directorId]);

            // Insertar o obtener los IDs de los géneros
            const genreIds = await Promise.all(input.genre.map(async (genre) => {
                const [rows] = await connection.query('SELECT id FROM genre WHERE name = ?', [genre]);
                if (rows.length) {
                    return rows[0].id;
                } else {
                    const [result] = await connection.query('INSERT INTO genre (name) VALUES (?)', [genre]);
                    return result.insertId;
                }
            }));
            const genreValues = genreIds.map(genreId => [movieId, genreId]);
            await connection.query('INSERT INTO movie_genre (movie_id, genre_id) VALUES ?', [genreValues]);

            // Confirmar la transacción si todo salió bien
            await connection.commit();

            return movieId;
        } catch (error) {
            // Revertir la transacción en caso de error
            await connection.rollback();
            console.error('Error al crear la película:', error);
            throw error;
        } finally {
            // Cerrar la conexión en cualquier caso
            connection.end();
        }
    }

    static async delete({ id }) {
        let connection;
        try {
            connection = await mysql.createConnection(connectionString);
            await connection.beginTransaction(); // Iniciar una transacción

            // Eliminar relaciones en las tablas intermedias
            await connection.execute('DELETE FROM movie_actor WHERE movie_id = UNHEX(REPLACE(?, "-", ""))', [id]);
            await connection.execute('DELETE FROM movie_director WHERE movie_id = UNHEX(REPLACE(?, "-", ""))', [id]);
            await connection.execute('DELETE FROM movie_genre WHERE movie_id = UNHEX(REPLACE(?, "-", ""))', [id]);

            // Eliminar la película de la tabla 'movie'
            const [result] = await connection.execute('DELETE FROM movie WHERE id = UNHEX(REPLACE(?, "-", ""))', [id]);

            await connection.commit(); // Confirmar la transacción

            return result.affectedRows > 0; // Devolver true si se eliminó la película
        } catch (error) {
            if (connection) await connection.rollback(); // Revertir la transacción en caso de error
            console.error('Error al eliminar la película:', error);
            throw error;
        } finally {
            if (connection) connection.end(); // Cerrar la conexión
        }
    }

    static async update({id, input}) {
        let connection;
        try {
            connection = await mysql.createConnection(connectionString);
            const [result] = await connection.execute(
                'UPDATE movie SET title = ?, year = ?, duration = ?, poster = ?, rate = ?, trailer = ?, status = ?, budget = ?, revenue = ? WHERE id = UNHEX(REPLACE(?, "-", ""))',
                [input.title, input.year, input.duration, input.poster, input.rate, input.trailer, input.status, input.budget, input.revenue, id]
            );
            return result.affectedRows > 0; // Devuelve true si se actualizó alguna fila
        } catch (error) {
            console.error('Error al actualizar la película:', error);
            throw error;
        } finally {
            if (connection) connection.end();
        }
    }
}
