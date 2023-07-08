const services = require("./services")
const nId = require("nanoid")
const Msg = {
    status: "",
    message: "",
    data: {},
}

const errMsg = (message) => {
    let errorMessage = { ...Msg }
    delete errorMessage.data
    errorMessage.status = "fail"
    errorMessage.message = message
    return errorMessage
}

const addBook = (req, h) => {
    // let reqBody = req.payload
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

    if (name == null)
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400);


    const book = {
        id: nId(),
        name: name,
        year: year,
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: pageCount,
        readPage: readPage,
        finished: pageCount == readPage,
        reading: reading,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }


    if (book.pageCount < book.readPage)
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400);


    services.saveBook(book)

    let response = {
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: book.id
        },
    }

    return h.response(response).header("Content-Type", "application/json").code(201)
}

const getAllBooks = (req, h) => {
    /* no implemented */
    let response = { ...Msg }
    let books;
    const queryParam = req.query

    if (queryParam.name != null) {
        books = services.findAllBookByname(queryParam.name)
    } else if (queryParam.reading != null) {
        books = services.findAllBookByReading(queryParam.reading == 1 ? true : false)
    } else if (queryParam.finished != null) {
        books = services.findAllBookByFinished(queryParam.finished == 1 ? true : false)
    } else {
        books = services.findAllBook()
    }

    delete response.message
    response.status = "success"
    response.data = {
        books: books
    }

    return h.response(response).code(200)
}
const findBookById = (req, h) => {
    let response = { ...Msg }
    let id = req.params["bookid"]
    let book = services.findBookById(id)

    if (book[0] == null) return h.response(errMsg("Buku tidak ditemukan")).code(404);
    delete response.data["bookId"]
    response.status = "success"
    response.data["book"] = book[0]
    delete response.message
    return h.response(response).code(200)
}

const updateBookById = (req, h) => {
    /* update buku */
    let { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
    let id = req.params.bookid


    if (name == null) return h.response(errMsg("Gagal memperbarui buku. Mohon isi nama buku")).code(400);
    if (pageCount < readPage) return h.response(errMsg("Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount")).code(400);

    let newBook = {
        name: name,
        year: year,
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: pageCount,
        readPage: readPage,
        reading: reading,
    }

    let isSucces = services.setBookById(id, newBook)
    if (isSucces) {
        return h.response({
            status: "success",
            message: "Buku berhasil diperbarui"
        }).code(200)
    } else {
        return h.response(errMsg("Gagal memperbarui buku. Id tidak ditemukan")).code(404);
    }
}
const deleteBookById = (req, h) => {
    /* delete buku */
    let id = req.params.bookid
    let response = { ...Msg }
    const isSucces = services.deleteBookById(id)
    if (!isSucces) {
        let errorMessage = errMsg("Buku gagal dihapus. Id tidak ditemukan")
        return h.response(errorMessage).code(404)
    }
    delete response.data
    response.message = "Buku berhasil dihapus"
    response.status = "success"
    return h.response(response).code(200)
}

module.exports = {
    addBook,
    getAllBooks,
    findBookById,
    updateBookById,
    deleteBookById,
}