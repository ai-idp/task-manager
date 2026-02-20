# task-manager: Consulta de Tarefas por ID e Listagem

## Change ID
`add-task-query`

## Why

Permitir a consulta de tarefas específicas por ID e listagem de todas as tarefas cadastradas, complementando as funcionalidades de registro e conclusão já existentes no sistema.

## What Changes

- Endpoint GET /tasks/{id} para consultar tarefa específica
- Endpoint GET /tasks para listar todas as tarefas
- Retorno de erro 404 quando tarefa não existir
- Ordenação por data de criação (mais recentes primeiro)

## Impact

- **Affected areas:** src/controllers/task-controller.ts, src/app.ts
- **Breaking change:** No
- **Risk level:** low

## Affected Specs

- `specs/task-query-by-id/spec.md`
- `specs/task-list/spec.md`
