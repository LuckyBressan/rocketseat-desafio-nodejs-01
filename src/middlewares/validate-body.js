export default function validateBody(req, res, update = true) {
    const { title, description } = req.body;

    const invalid = update //Se for update, só validamos se nenhum dos parametros foi passado
    ? !title && !description
    : !title || !description

    if (invalid) {
        res.writeHead(503).end(JSON.stringify({
            error: {
                title: 'Dados obrigatórios não informados!',
                description: `Dado '${!title ? 'title' : 'description'}' não informado`
            }
        }));
        return false
    }
    return true
};
