import {privateApiInstance} from '@/http-common';

class ReportsService {
    availableBooks(){
        const url = '/reports/books/available'
        return privateApiInstance.get(url)
    }
    usersBorrowedBooksAllTime() {
        const url = '/reports/books/users/all'
        return privateApiInstance.get(url)
    }
    usersBorrowedBooksCurrent() {
        const url = '/reports/books/users/current'
        return privateApiInstance.get(url)
    }
    usersLastEntryTime() {
        const url = '/reports/visit/last'
        return privateApiInstance.get(url)
    }
    popularGenres() {
        const url = '/reports/genres/popular'
        return privateApiInstance.get(url)
    }
    borrowsFines() {
        const url = '/reports/borrows/fine'
        return privateApiInstance.get(url)
    }
    borrowsGeo() {
        const url = '/reports/borrows/geo'
        return privateApiInstance.get(url)
    }
}
export default new ReportsService