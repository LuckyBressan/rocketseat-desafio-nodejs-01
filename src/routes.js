import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import buildRoutePath from "./utils/build-route-path.js";
import validateBody from "./middlewares/validate-body.js";
import dateFormated from "./utils/date-formated.js";
import csvImport from "./csv.js";

const database = new Database();

const table = "tasks";

const messageErrorId = (action = "atualizar") => {
  return {
    title: `Erro ao ${action} a task!`,
    description: "Task não encontrada para o ID informado.",
  };
};

export const routes = [
  {
    path: buildRoutePath(`/${table}`),
    method: "GET",
    handler: (req, res) => {
      const data = database.select(table);

      return res.writeHead(200).end(JSON.stringify(data));
    },
  },
  {
    path: buildRoutePath(`/${table}`),
    method: "POST",
    handler: (req, res) => {
      if (!validateBody(req, res, false)) return;

      const { title, description } = req.body;
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: dateFormated(),
        updated_at: null,
      };

      database.insert(table, task);

      return res.writeHead(201).end(JSON.stringify(task));
    },
  },
  {
    path: buildRoutePath(`/${table}/:id`),
    method: "PUT",
    handler: (req, res) => {
      if (!validateBody(req, res)) return;

      const { id } = req.params;

      const updated = database.update(table, id, {
        ...req.body,
        updated_at: dateFormated(),
      });

      if (!updated) {
        return res.writeHead(503).end(
          JSON.stringify({
            error: messageErrorId(),
          })
        );
      }
      return res.writeHead(204).end();
    },
  },
  {
    path: buildRoutePath(`/${table}/:id`),
    method: "DELETE",
    handler: (req, res) => {
      const { id } = req.params;

      const deleted = database.delete(table, id);

      if (!deleted) {
        return res.writeHead(503).end(
          JSON.stringify({
            error: messageErrorId("deletar"),
          })
        );
      }
      return res.writeHead(204).end();
    },
  },
  {
    path: buildRoutePath(`/${table}/:id`),
    method: "PATCH",
    handler: (req, res) => {
      const { id } = req.params;

      const date = dateFormated();
      const patched = database.patch(table, id, {
        key: "completed_at",
        value: date,
      });

      if (!patched) {
        return res.writeHead(503).end(
          JSON.stringify({
            error: messageErrorId("completar"),
          })
        );
      }
      return res.writeHead(200).end(
        JSON.stringify({
          success: `Task completada em ${date}!`,
        })
      );
    },
  },
  {
    path: buildRoutePath(`/${table}/import`),
    method: "POST",
    handler: async (req, res) => {
      const message = await csvImport();

      return res
        .writeHead(message.success ? 200 : 503)
        .end(JSON.stringify(message));
    },
  },
];
