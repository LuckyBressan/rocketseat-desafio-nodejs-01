# Desafio 01
Desafio referente ao módulo: Fundamentos do Node.js

## Sobre o desafio
Neste desafio era necessário desenvolver uma API CRUD de tasks.

## O que foi desenvolvido?

Modelo de dados da Task:
```json
{
    "id": "279ef34d-649a-460f-a01a-ec86169ae87b",
    "title": "Título",
    "description": "Descrição",
    "completed_at": null, //data de quando a task foi completada
    "created_at": "12/07/2025 13:51:53", //data de quando a task foi criada
    "updated_at": "12/07/2025 14:06:03", //data de quando a task foi atualizada
}
```

Rotas da API:

- `GET - /tasks`
    - Retorna todas as tasks armazenadas no arquivo json de tasks
- `POST - /tasks`
    - cria uma task armazenando-a no arquivo json de tasks
    - Esta rota recebe via body os dados de `title` e `description`, validando se ambos foram enviados no body, caso não tenha sido, dispara um erro na request
- `PUT - /tasks/:id`
    - atualiza uma task baseado no ID passado por parâmetro da rota
    - valida se ao menos o `title` ou `description` foi passado para a request
    - Valida se o registro existe para o ID informado
- `PATCH - /tasks/:id/complete`
    - marca a task como concluída atualizando somente o valor `completed_at`, baseando-se na data e hora da realização da request
    - Valida se o registro existe para o ID informado
- `DELETE - /tasks/:id`
    - exclui uma task baseado no ID passado por parâmetro da rota
    - Valida se o registro existe para o ID informado
- `POST - /tasks/import`
    -  importa tasks a partir de um csv que se encontra na raiz do projeto

## Como testar/desenvolver a API

1. Com a pasta do projeto aberta no cmd, execute:
    -  Isto vai instalar as depêndencias e iniciar o server.js

```sh
pnpm i
npm run dev
```

2. Pegue a collection `test-api.yaml` e importe no insomnia
3. Pronto, basta executar as requests através do insomnia

