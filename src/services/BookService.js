import {privateApiInstance} from '@/http-common';

class BookService {
    getBooksByStatus(offset = 0, limit = 10, status = true, desc = true) {
        const url = '/books/status'
        const params = { 
            offset: offset, 
            limit: limit, 
            status: status,
            desc: desc 
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getBookStatusById(id_book){
        const url = '/books/status/id'
        const params = { 
            id_book: id_book, 
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getBookByGenre(id_genre, offset = 0, limit = 10, sort_by = '', desc = true){
        const url = '/books'
        const params = {
            id_genre: id_genre,
            offset: offset, 
            limit: limit,
            sort_by: sort_by,
            desc: desc 
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getBookByAuthor(id_author, offset = 0, limit = 10, sort_by = '', desc = true){
        const url = '/books'
        const params = {
            id_author: id_author,
            offset: offset, 
            limit: limit,
            sort_by: sort_by,
            desc: desc 
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getBookById(id_book){
        const url = '/books/id'
        const params = { 
            id_book: id_book
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    addBook(title, author_ids, genre_ids){
        const url = '/books'
        const data = { 
            title: title, 
            author_ids: author_ids, 
            genre_ids: genre_ids,
        }
        return privateApiInstance.post(url, data)
    }

    editBook(id_book, title, author_ids, genre_ids){
        const url = '/books/id'
        const data = { 
            title: title, 
            author_ids: author_ids, 
            genre_ids: genre_ids,
        }
        return privateApiInstance.put(url, data, {
            params: {
                id_book: id_book
            }
        })
    }

    deleteBook(id_book){
        const url = '/books/id'
        const params = { 
            id_book: id_book, 

        }
        return privateApiInstance.delete(url, {
            params: {
                ...params
            }
        })
    }
}
export default new BookService