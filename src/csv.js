import fs from "node:fs";
import { parse } from "csv-parse";
import { title } from "node:process";

const tasksPath = new URL("tasks.csv", import.meta.url);

export default async function csvImport() {
  const parser = fs.createReadStream(tasksPath).pipe(
    parse({
      from_line: 2,
    })
  );

  let error   = false

  for await (const [title, description] of parser) {

    const data = await postTask({
      title,
      description,
    });
    if(data.status === 503 && !error) {
        error = true
        console.error(await data.json())
    }
  }

  let message = {
    success: {
        title: 'Sucesso ao importar tasks!'
    }
  }

  if(error) {
    message = {
        error: {
            title: 'Erro ao enviar tasks!',
            description: 'Verifique o console.'
        }
    }
  }

  return message
}

function postTask(data) {
  return fetch("http://localhost:3333/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
