import { Request, Response } from 'express';
import { Task, TaskListItem } from '../models/task.js';
import { taskRepository } from '../repositories/task-repository.js';

/**
 * Controller para gerenciamento de tarefas
 * Fornece métodos para consulta de tarefas por ID e listagem de todas as tarefas
 */
export class TaskController {
  /**
   * Consulta uma tarefa específica por ID
   * 
   * @param req - Request do Express contendo o ID da tarefa nos params
   * @param res - Response do Express
   * @returns Dados completos da tarefa ou erro 404
   */
  public getTaskById(req: Request, res: Response): Response {
    const { id } = req.params;
    const taskId = Array.isArray(id) ? id[0] : id;
    const task = taskRepository.findById(taskId);
    
    if (!task) {
      return res.status(404).json({
        message: `Tarefa com ID ${id} não encontrada`,
        error: 'Not Found'
      });
    }
    
    return res.status(200).json(task);
  }

  /**
   * Lista todas as tarefas cadastradas
   * 
   * Retorna um array de tarefas ordenadas por data de criação (mais recentes primeiro).
   * Se não houver tarefas cadastradas, retorna um array vazio.
   * 
   * @param req - Request do Express
   * @param res - Response do Express
   * @returns Array de tarefas com campos resumidos (id, title, status)
   */
  public getAllTasks(req: Request, res: Response): Response {
    const tasks = taskRepository.findAll();
    
    // Mapeia para TaskListItem (apenas id, title, status)
    const taskList: TaskListItem[] = tasks.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status
    }));
    
    return res.status(200).json(taskList);
  }
}

/**
 * Instância singleton do TaskController para uso nas rotas
 */
export const taskController = new TaskController();
