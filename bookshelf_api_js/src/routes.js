const handlers = require("./handlers")
const routes = [
    {
        path: "/books",
        method: "POST",
        handler: handlers.addBook
    },
    {
        path: "/books",
        method: "GET",
        handler: handlers.getAllBooks
    },
    {
        path: "/books/{bookid}",
        method: "GET",
        handler: handlers.findBookById
    },
    {
        path: "/books/{bookid}",
        method: "PUT",
        handler: handlers.updateBookById
    },
    {
        path: "/books/{bookid}",
        method: "DELETE",
        handler: handlers.deleteBookById
    },
]

module.exports = routes