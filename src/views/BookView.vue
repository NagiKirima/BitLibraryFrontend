<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <h4 class="mb-3">Book Information</h4>
                <p><strong>ID Book:</strong> {{ id_book }}</p>
                <p><strong>Book Title:</strong> {{ book.title }}</p>
                <p><strong>Book Authors:</strong> <div v-for="author in book.authors" :key="author.id_author">{{ author.author_name }}</div></p>
                <p><strong>Book Genres:</strong> <div v-for="genre in book.genres" :key="genre.id_genre">{{ genre.genre_name }}</div></p>
                <p><strong>Book avaliable status:</strong> {{ book.is_available }}</p>
            </div>
        </div>

         <!-- controls -->
         <div class="d-flex justify-content-center align-items-center mb-3 mt-3">
            <div class="input-group" style="max-width: 200px;">
                <label for="perPage" class="input-group-text">Per Page:</label>
                <select id="perPage" class="form-select" v-model="borrowsPerPage">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <div class="input-group mx-2" style="max-width: 250px;">
                <label for="sortBy" class="input-group-text">Sort By:</label>
                <select id="sortBy" class="form-select" v-model="sortBy">
                    <option value=""></option>
                    <option value="borrow_date">Borrow Date</option>
                    <option value="return_date">Return Date</option>
                </select>
            </div>

            <div class="input-group mx-2" style="max-width: 300px;">
                <label for="isReturned" class="input-group-text">Returned:</label>
                <select id="isReturned" class="form-select" v-model="isReturned">
                    <option :value="null">All</option>
                    <option :value="true">Returned</option>
                    <option :value="false">Not Returned</option>
                </select>
            </div>

            <div class="form-check form-switch mx-2">
                <input class="form-check-input" v-model="desc" type="checkbox" id="filter2">
                <label class="form-check-label" for="filter2">Sort Desc</label>
            </div>
        </div>

        <div style="overflow-x: auto;" class="mt-3">
            <table class="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID Borrow</th>
                        <th>ID User</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Returned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="borrow in borrows" :key="borrow.id_borrow">
                        <td><div class="redirect" @click="this.$router.push(`/borrows/${borrow.id_borrow}`)">{{ borrow.id_borrow }}</div></td>
                        <td><div class="redirect" @click="this.$router.push(`/users/${borrow.id_user}`)">{{ borrow.id_user }}</div></td>
                        <td>{{ borrow.borrow_date }}</td>
                        <td>{{ borrow.return_date }}</td>
                        <td>{{ borrow.is_returned }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-3">
            <button style="min-width: 100px;" class="btn btn-outline-primary mx-2" @click="prevPage">Previous</button>
            <span>{{ currentPage }}...{{ totalPages }}</span>
            <button style="min-width: 100px;" class="btn btn-outline-primary mx-2" @click="nextPage">Next</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BookService from '@/services/BookService.js'
import BorrowsService from '@/services/BorrowsService';


export default defineComponent({
    data() {
        return {
            id_book: null,
            book: {
                title: '',
                genres: [],
                authors: [],
                is_available: null
            },

            borrows: [],
            sortBy: '',
            isReturned: null,
            desc: true,
            borrowsPerPage: 10,
            currentPage: 1,
            totalPages: 0,
            next_from: 0,
            totalCount: 0,
        };
    },
    async mounted() {
        this.id_book = this.$route.params.id_book;
        await this.fetchBookData();
        await this.fetchBookBorrows();
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
            }
        },
        async fetchBookBorrows(){
            await BorrowsService.getBookBorrows(
                this.id_book,
                (this.currentPage - 1) * this.borrowsPerPage,
                this.borrowsPerPage,
                this.sortBy,
                this.desc,
                this.isReturned
            )
            .then(response => {
                console.log(response);
                this.borrows = response.data.borrows;
                this.totalPages = response.data.total_pages;
                this.totalCount = response.data.totalCount;
            })
            .catch(error => {
                console.log(error);
            })
        },
        async fetchBookData() {
            await BookService.getBookStatusById(this.id_book)
            .then(response => {
                console.log(response.data.book);
                this.book = response.data.book;
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    watch: {
        currentPage: {
            async handler(newValue, oldValue) {
                await this.fetchBookBorrows();
            },
        },
        borrowsPerPage: {
            async handler(newValue, oldValue) {
                this.borrows = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.nextFrom = 0;
                this.totalCount = 0;
                await this.fetchBookBorrows();
            },
        },
        sortBy: {
            async handler(newValue, oldValue) {
                await this.fetchBookBorrows();
            },
        },
        desc: {
            async handler(newValue, oldValue) {
                await this.fetchBookBorrows();
            },
        },
        isReturned: {
            async handler(newValue, oldValue) {
                await this.fetchBookBorrows();
            },
        },
    }
})
</script>

<style scoped lang="scss">
.redirect{
    color: blue; 
    text-decoration: underline; 
    cursor: pointer;
}
</style>
