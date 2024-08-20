import {privateApiInstance} from '@/http-common';

class BorrowsService {
    getUserBorrows(id_user, offset, limit, sort_by, desc, is_returned) {
        const url = 'books/borrows'
        const params = { 
            id_user: id_user, 
            offset: offset, 
            limit: limit,
            sort_by: sort_by,
            desc: desc,
            is_returned: is_returned
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getBookBorrows(id_book, offset, limit, sort_by, desc, is_returned) {
        const url = 'books/borrows'
        const params = { 
            id_book: id_book, 
            offset: offset, 
            limit: limit,
            sort_by: sort_by,
            desc: desc,
            is_returned: is_returned
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getBorrows(offset, limit, sort_by, desc, is_returned){
        const url = 'books/borrows'
        const params = { 
            offset: offset, 
            limit: limit,
            sort_by: sort_by,
            desc: desc,
            is_returned: is_returned
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    createBorrows(id_user, books_ids, borrow_date, return_date){
        const url = 'books/borrows'
        const params = { 
            id_user: id_user, 
        }
        const data = {
            books_ids: books_ids,
            borrow_date: borrow_date,
            return_date: return_date
        }
        return privateApiInstance.post(url, data, {
            params: {
                ...params
            }
        })
    }

    getBorrowById(id_borrow){
        const url = 'books/borrows/id'
        const params = { 
            id_borrow: id_borrow, 
        }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    deleteBorrow(id_borrow){
        const url = 'books/borrows/id'
        const params = { 
            id_borrow: id_borrow, 
        }
        return privateApiInstance.delete(url, {
            params: {
                ...params
            }
        })
    }

    editBorrowStatus(id_borrow, new_status){
        const url = 'books/borrows/id'
        const params = { 
            id_borrow: id_borrow,
            status: new_status 
        }
        return privateApiInstance.patch(url, null, {
            params: {
                ...params
            }
        })
    }
}
export default new BorrowsService