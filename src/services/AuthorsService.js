import {privateApiInstance} from '@/http-common';

class AuthorsService {
    getAuthors(offset, limit, desc) {
        const url = '/authors'
        const params = { offset: offset, limit: limit, desc: desc }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getAuthorById(id_author){
        const url = '/authors/id'
        const params = { id_author: id_author }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    deleteAuthor(id_author){
        const url = '/authors/id'
        const params = { id_author: id_author }
        return privateApiInstance.delete(url, {
            params: {
                ...params
            }
        })
    }

    createAuthor(author_name){
        const url = '/authors'
        return privateApiInstance.post(url, {author_name: author_name})
    }

    editAuthor(id_author, author_name){
        const url = '/authors/id'
        return privateApiInstance.put(url, {author_name: author_name}, {
            params: {
                id_author: id_author
            }
        })
    }
}
export default new AuthorsService