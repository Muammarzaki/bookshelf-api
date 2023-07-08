let storage = require("./datastore")

const unique = (data) => {
    return storage.filter(book => book.name == data.name) <= 0;
};

let services = {
    saveBook: (data) => {
        storage.push(data);
        return storage.filter(book => book.id == data.id).length > 0
    },

    findAllBook: () => {
        return storage.map(item => {
            return {
                id: item.id,
                name: item.name,
                publisher: item.publisher
            }
        })
    },
    findAllBookByname: (name) => {
        return storage.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
            .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    publisher: item.publisher
                }
            })
    },
    findAllBookByReading: (isReading) => {
        return storage
            .filter(item => item.reading == isReading)
            .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    publisher: item.publisher
                }
            })
    },

    findAllBookByFinished: (isFinish) => {
        return storage.filter(item => item.finished == isFinish)
            .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    publisher: item.publisher
                }
            })
    },

    findBookById: (bookId) => {
        return storage.filter(book => book.id === bookId)
    },

    setBookById: (bookId, newValue) => {

        let BookUpdated = storage.filter(book => book.id === bookId)

        if (BookUpdated[0] == null) return false;

        BookUpdated.forEach(book => {
            book.name = newValue.name
            book.year = newValue.year
            book.author = newValue.author
            book.summary = newValue.summary
            book.publisher = newValue.publisher
            book.pageCount = newValue.pageCount
            book.readPage = newValue.readPage
            book.reading = newValue.reading
        })

        return true;
    },

    deleteBookById: (bookId) => {
        let bookDeleted = storage.filter(book => book.id == bookId)
        if (bookDeleted[0] === undefined) return false;
        if (bookDeleted[0] === null) return false;

        storage.forEach((value, index, arr) => {
            if (value.id == bookId) {
                arr.splice(index, 1)
                return true
            }
            return false;
        })
        return true
    }
}

module.exports = services