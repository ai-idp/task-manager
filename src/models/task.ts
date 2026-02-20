/**
 * Status possíveis de uma tarefa
 */
export enum TaskStatus {
  PENDING = 'PENDING',
  DONE = 'DONE'
}

/**
 * Interface completa de uma tarefa
 */
export interface Task {
  /**
   * Identificador único da tarefa (UUID)
   */
  id: string;

  /**
   * Título da tarefa
   */
  title: string;

  /**
   * Descrição detalhada da tarefa (opcional)
   */
  description: string | null;

  /**
   * Status atual da tarefa
   */
  status: TaskStatus;

  /**
   * Data de criação da tarefa
   */
  created_at: Date;

  /**
   * Data da última atualização da tarefa
   */
  updated_at: Date;
}

/**
 * Interface resumida para listagem de tarefas
 * Contém apenas os campos essenciais para otimizar a resposta
 */
export interface TaskListItem {
  /**
   * Identificador único da tarefa (UUID)
   */
  id: string;

  /**
   * Título da tarefa
   */
  title: string;

  /**
   * Status atual da tarefa
   */
  status: TaskStatus;
}
