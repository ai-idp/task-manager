# Tasks

## Implementation

- [ ] **1.1** Criar modelo Task e tipos de resposta
  - Criar interface Task com campos: id (string UUID), title (string), description (string | null), status (enum 'PENDING' | 'DONE'), created_at (Date), updated_at (Date). Criar interface TaskListItem com campos resumidos: id, title, status. Criar em src/models/task.ts. Exportar tipos para uso no controller.

- [ ] **1.2** Criar repositório de tarefas com operações de consulta (depends on: 1.1)
  - Criar src/repositories/task-repository.ts com armazenamento em memória (Map<string, Task>). Implementar métodos: findById(id: string): Task | undefined - busca tarefa por ID; findAll(): Task[] - retorna todas as tarefas ordenadas por created_at decrescente. Exportar instância singleton do repositório.

- [ ] **2.1** Criar TaskController com endpoints de consulta e registrar rotas (depends on: 1.2)
  - Criar src/controllers/task-controller.ts com decorators tsoa: @Route('tasks'), @Tags('Tasks'). Implementar GET /tasks/{id} com @Get('{id}') retornando Task completa ou erro 404 (usar @Response<NotFoundError>(404)). Implementar GET /tasks com @Get() retornando array de TaskListItem. Registrar RegisterRoutes no src/app.ts. Usar imports com extensão .js.

## Testing

- [ ] **3.1** Implementar testes dos endpoints de consulta (depends on: 2.1)
  - Criar src/tests/task-query.test.ts. Testar GET /tasks/{id}: cenário sucesso (200 com dados completos), cenário erro (404 para ID inexistente). Testar GET /tasks: cenário lista vazia (200 com []), cenário com tarefas (200 com array ordenado por created_at desc). Verificar idempotência das consultas.

