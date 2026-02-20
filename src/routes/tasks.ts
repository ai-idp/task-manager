import { Router } from 'express';
import { taskController } from '../controllers/task-controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas
 *     description: Retorna um array de tarefas ordenadas por data de criação (mais recentes primeiro). Se não houver tarefas cadastradas, retorna um array vazio.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identificador único da tarefa (UUID)
 *                     example: "550e8400-e29b-41d4-a716-446655440000"
 *                   title:
 *                     type: string
 *                     description: Título da tarefa
 *                     example: "Implementar endpoint de consulta"
 *                   status:
 *                     type: string
 *                     enum: [PENDING, DONE]
 *                     description: Status atual da tarefa
 *                     example: "PENDING"
 */
router.get('/', (req, res) => taskController.getAllTasks(req, res));

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Consulta uma tarefa específica por ID
 *     description: Retorna os dados completos de uma tarefa. Se a tarefa não existir, retorna erro 404.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único da tarefa (UUID)
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identificador único da tarefa (UUID)
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 title:
 *                   type: string
 *                   description: Título da tarefa
 *                   example: "Implementar endpoint de consulta"
 *                 description:
 *                   type: string
 *                   description: Descrição detalhada da tarefa
 *                   example: "Criar endpoints GET /tasks e GET /tasks/{id}"
 *                 status:
 *                   type: string
 *                   enum: [PENDING, DONE]
 *                   description: Status atual da tarefa
 *                   example: "PENDING"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora de criação da tarefa
 *                   example: "2024-01-15T10:30:00.000Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora da última atualização da tarefa
 *                   example: "2024-01-15T10:30:00.000Z"
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa com ID 550e8400-e29b-41d4-a716-446655440000 não encontrada"
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 */
router.get('/:id', (req, res) => taskController.getTaskById(req, res));

export default router;
