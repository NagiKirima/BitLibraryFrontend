import {privateApiInstance} from '@/http-common';

class GenresService {
    getGenres(offset, limit, desc) {
        const url = '/genres'
        const params = { offset: offset, limit: limit, desc: desc }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getGenreById(id_genre){
        const url = '/genres/id'
        const params = { id_genre: id_genre }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    deleteGenre(id_genre){
        const url = '/genres/id'
        const params = { id_genre: id_genre }
        return privateApiInstance.delete(url, {
            params: {
                ...params
            }
        })
    }

    createGenre(genre_name){
        const url = '/genres'
        return privateApiInstance.post(url, {genre_name: genre_name})
    }

    editGenre(id_genre, genre_name){
        const url = '/genres/id'
        return privateApiInstance.put(url, {genre_name: genre_name},{
            params: { id_genre: id_genre }
        })
    }
}
export default new GenresService