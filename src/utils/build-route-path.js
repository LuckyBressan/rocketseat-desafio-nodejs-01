// /users/:id
export default function buildRoutePath(path) {
    const routeParameterRegex = /:([a-zA-Z]+)/g
    //$1 pega o "nome" do parametro da rota que no caso aqui é id
    const pathWithParams = path.replaceAll(routeParameterRegex, '(?<$1>[a-z0-9\-_)]+)')

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
};
