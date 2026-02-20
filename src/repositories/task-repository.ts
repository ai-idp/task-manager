import { Task } from '../models/task.js';

/**
 * Repositório de tarefas em memória
 * Armazena até 1.000 tarefas conforme requisito do sistema
 */
export class TaskRepository {
  private tasks: Map<string, Task>;
  private readonly MAX_TASKS = 1000;

  constructor() {
    this.tasks = new Map<string, Task>();
  }

  /**
   * Busca uma tarefa por ID
   * @param id - Identificador único da tarefa (UUID)
   * @returns Task se encontrada, undefined caso contrário
   */
  findById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  /**
   * Retorna todas as tarefas ordenadas por data de criação (mais recentes primeiro)
   * @returns Array de tarefas ordenadas por created_at decrescente
   */
  findAll(): Task[] {
    const allTasks = Array.from(this.tasks.values());
    
    // Ordena por created_at decrescente (mais recentes primeiro)
    return allTasks.sort((a, b) => {
      return b.created_at.getTime() - a.created_at.getTime();
    });
  }

  /**
   * Adiciona uma nova tarefa ao repositório
   * @param task - Tarefa a ser adicionada
   * @throws Error se o limite de tarefas for excedido
   */
  save(task: Task): void {
    if (this.tasks.size >= this.MAX_TASKS && !this.tasks.has(task.id)) {
      throw new Error(`Limite de ${this.MAX_TASKS} tarefas atingido`);
    }
    this.tasks.set(task.id, task);
  }

  /**
   * Atualiza uma tarefa existente
   * @param task - Tarefa com dados atualizados
   * @returns true se atualizada, false se não encontrada
   */
  update(task: Task): boolean {
    if (!this.tasks.has(task.id)) {
      return false;
    }
    this.tasks.set(task.id, task);
    return true;
  }

  /**
   * Remove uma tarefa do repositório
   * @param id - Identificador da tarefa a ser removida
   * @returns true se removida, false se não encontrada
   */
  delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  /**
   * Retorna o número total de tarefas armazenadas
   * @returns Quantidade de tarefas
   */
  count(): number {
    return this.tasks.size;
  }

  /**
   * Remove todas as tarefas do repositório
   * Útil para testes e limpeza
   */
  clear(): void {
    this.tasks.clear();
  }
}

/**
 * Instância singleton do repositório de tarefas
 * Garante que todas as partes da aplicação usem o mesmo armazenamento em memória
 */
export const taskRepository = new TaskRepository();
