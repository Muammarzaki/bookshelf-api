const Hapi = require("@hapi/hapi")
const routes = require("./routes")


const serverInit = async () => {
    const server = Hapi.server({
        port: 80,
        host: 'localhost'
    })

    server.route(routes)

    await server.start()
    console.log(`server start at ${server.info.uri}`)
}

serverInit()
