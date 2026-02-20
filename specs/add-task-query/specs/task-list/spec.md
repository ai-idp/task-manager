# task-list

## ADDED Requirements

### Requirement: Listagem de Tarefas

**Priority:** MUST

O sistema DEVE permitir listar todas as tarefas cadastradas através do endpoint GET /tasks, ordenadas por data de criação (mais recentes primeiro)

#### Scenario: Lista tarefas existentes

- **WHEN** GET /tasks é chamado e existem tarefas cadastradas
- **THEN** Retorna status 200 com array de tarefas contendo id, title e status, ordenadas por created_at decrescente

#### Scenario: Lista vazia

- **WHEN** GET /tasks é chamado e não existem tarefas cadastradas
- **THEN** Retorna status 200 com array vazio []

#### Scenario: Listagem é idempotente

- **WHEN** GET /tasks é chamado múltiplas vezes
- **THEN** Retorna sempre os mesmos dados sem alterar o estado das tarefas

