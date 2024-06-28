import {Router} from 'express';
import {MoviesController} from "../controllers/movies.js";

export const createMoviesRouter = ({movieModel}) => {

    const moviesRouter = Router();
    const moviesController = new MoviesController({movieModel});

    /**
     * @swagger
     * tags:
     *   name: Películas
     *   description: Operaciones relacionadas con películas
     */

    /**
     * @swagger
     * /movies:
     *   get:
     *     summary: Obtiene todas las películas.
     *     responses:
     *       200:
     *         description: Lista de películas.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     */
    moviesRouter.get('/', moviesController.getAll);

    /**
     * @swagger
     * /movies:
     *   post:
     *     summary: Crea una nueva película.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Movie'
     *     responses:
     *       201:
     *         description: Película creada exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     */
    moviesRouter.post('/', moviesController.create);

    /**
     * @swagger
     * /movies/{id}:
     *   get:
     *     summary: Obtiene una película por ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID de la película
     *         example: "e928473a-3331-11ef-8fb0-50e0859c1e71"
     *     responses:
     *       200:
     *         description: Película encontrada.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       404:
     *         description: Película no encontrada.
     */
    moviesRouter.get('/:id', moviesController.getById);

    /**
     * @swagger
     * /movies/{id}:
     *   delete:
     *     summary: Elimina una película por ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la película
     *     responses:
     *       204:
     *         description: Película eliminada exitosamente.
     *       404:
     *         description: Película no encontrada.
     */
    moviesRouter.delete('/:id', moviesController.delete);

    /**
     * @swagger
     * /movies/{id}:
     *   patch:
     *     summary: Actualiza una película por ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la película
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Movie'
     *     responses:
     *       200:
     *         description: Película actualizada exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       404:
     *         description: Película no encontrada.
     */
    moviesRouter.patch('/:id', moviesController.update);

    return moviesRouter;

    /**
     * @swagger
     * components:
     *   schemas:
     *     Movie:
     *       type: object
     *       required:
     *         - title
     *         - year
     *         - duration
     *       properties:
     *         title:
     *           type: string
     *           description: Título de la película
     *         year:
     *           type: integer
     *           format: int32
     *           description: Año de estreno
     *         duration:
     *           type: integer
     *           format: int32
     *           description: Duración en minutos
     *         poster:
     *           type: string
     *           format: uri
     *           description: URL del póster
     *         rate:
     *           type: number
     *           format: double
     *           description: Calificación (1-10)
     *         trailer:
     *           type: string
     *           format: uri
     *           description: URL del tráiler
     *         status:
     *           type: string
     *           enum: [Rumored, Planned, In Production, Post Production, Released, Canceled]
     *           description: Estado de la película
     *         budget:
     *           type: integer
     *           format: int64
     *           description: Presupuesto en dólares
     *         revenue:
     *           type: integer
     *           format: int64
     *           description: Ingresos en dólares
     *         genres:
     *           type: array
     *           items:
     *             type: string
     *           description: Géneros de la película
     *         actors:
     *           type: array
     *           items:
     *             type: string
     *           description: Actores de la película
     *         directors:
     *           type: array
     *           items:
     *             type: string
     *           description: Directores de la película
     */

}
