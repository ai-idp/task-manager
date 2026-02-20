# task-query-by-id

## ADDED Requirements

### Requirement: Consulta de Tarefa por ID

**Priority:** MUST

O sistema DEVE permitir consultar uma tarefa específica através do endpoint GET /tasks/{id}, retornando todos os dados da tarefa (id, title, description, status, created_at, updated_at)

#### Scenario: Consulta tarefa existente

- **WHEN** GET /tasks/{id} é chamado com um ID de tarefa existente
- **THEN** Retorna status 200 com os dados completos da tarefa (id, title, description, status, created_at, updated_at)

#### Scenario: Consulta tarefa inexistente

- **WHEN** GET /tasks/{id} é chamado com um ID de tarefa que não existe
- **THEN** Retorna status 404 com mensagem de erro apropriada

#### Scenario: Consulta é idempotente

- **WHEN** GET /tasks/{id} é chamado múltiplas vezes para a mesma tarefa
- **THEN** Retorna sempre os mesmos dados sem alterar o estado da tarefa

