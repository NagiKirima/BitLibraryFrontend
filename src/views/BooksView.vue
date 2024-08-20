<template>
    <CreateBookModalComponent
        :idModal="this.createBookModal"
        @add-book="this.fetchBooks"
        @close="closeAddBookModal()"
    ></CreateBookModalComponent>

    <EditBookModalComponent v-if="this.editedBookId"
        :idModal="this.editBookModal"
        :idBook="this.editedBookId"
        @edit-book="this.fetchBooks"
        @close="closeEditBookModal()"
    ></EditBookModalComponent>

    <div class="container mt-3 mb-3">
        <!-- controls -->
        <div class="d-flex justify-content-center align-items-center mb-3">
            <div style="max-width: 300px;">
                <button @click="openAddBookModal()" class="btn btn-primary mx-2">Add book</button>
            </div>
            
            <div class="input-group" style="max-width: 200px;">
                <label for="perPage" class="input-group-text">Per Page:</label>
                <select id="perPage" class="form-select" v-model="booksPerPage">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>

            <div class="form-check form-switch mx-2">
                <input class="form-check-input" v-model="status" type="checkbox" id="filter1">
                <label class="form-check-label" for="filter1">Not Borrowed</label>
            </div>
            <div class="form-check form-switch mx-2">
                <input class="form-check-input" v-model="desc" type="checkbox" id="filter2">
                <label class="form-check-label" for="filter2">Sort Desc</label>
            </div>
        </div>
        <!-- books table -->
        <div style="overflow-x: auto;">
            <table class="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Genres</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book.id_book">
                        <td> <div class="redirect" @click="this.$router.push(`books/${book.id_book}`)">{{ book.id_book }}</div></td>
                        <td>{{ book.title }}</td>
                        <td><div class="redirect" v-for="author in book.authors" :key="author.id_author" @click="this.$router.push(`authors/${author.id_author}`)">{{ author.author_name }}</div></td>
                        <td><div class="redirect" v-for="genre in book.genres" :key="genre.id_genre" @click="this.$router.push(`genres/${genre.id_genre}`)">{{ genre.genre_name }}</div></td>
                        <td>{{ book.is_available }}</td>
                        <td style="max-width: 100px;">
                            <button class="btn btn-outline-danger w-100 mb-1" @click="deleteBook(book.id_book)">Delete</button>
                            <button class="btn btn-outline-primary w-100" @click="openEditBookModal(book.id_book)">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <button style="min-width: 100px;" class="btn btn-outline-primary mx-2" @click="prevPage">Previous</button>
            <span>{{ currentPage }}...{{ totalPages }}</span>
            <button style="min-width: 100px;" class="btn btn-outline-primary mx-2" @click="nextPage">Next</button>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import CreateBookModalComponent from '@/components/modal/CreateBookModalComponent.vue';
import EditBookModalComponent from '@/components/modal/EditBookModalComponent.vue';
import BookService from '@/services/BookService';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'


export default defineComponent({
    components: {
        CreateBookModalComponent,
        EditBookModalComponent
    },
    data() {
        return {
            books: [],
            currentPage: 1,
            totalPages: 0,
            booksPerPage: 10,
            next_from: 0,
            totalCount: 0,

            editedBookId: '',

            status: true,
            desc: true,

            createBookModal: 'create-book',
            editBookModal: 'edit-book'
        }
    },
    methods: {
        openAddBookModal(){
            const modal = new bootstrap.Modal(document.getElementById(this.createBookModal));
            modal.show();
        },
        closeAddBookModal() {
            const modal = new bootstrap.Modal(document.getElementById(this.createBookModal));
            modal.hide();
        },
        openEditBookModal(id_book){
            this.editedBookId = id_book;
            this.$nextTick(() => {
                    const modal = new bootstrap.Modal(document.getElementById(this.editBookModal));
                    modal.show();
                }
            )
        },
        closeEditBookModal(){
            const modal = new bootstrap.Modal(document.getElementById(this.editBookModal));
            modal.hide();
            this.editedBookId = '';
        },
        
        async fetchBooks() {
            await BookService.getBooksByStatus(
                (this.currentPage - 1) * this.booksPerPage,
                this.booksPerPage,
                this.status,
                this.desc
            )
            .then(response => {
                console.log(response.data.books);
                this.books = response.data.books;
                this.next_from = response.data.next_from;
                this.totalPages = response.data.total_pages;
                this.totalCount = response.data.total_count;
            })
            .catch(error => {
                console.log(error);
            })
        },

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

        async deleteBook(id_book){
            await BookService.deleteBook(id_book)
            .then(response => {
                console.log(response);
                this.fetchBooks();
            })
            .catch(error => {
                console.log(error);
            })
        },
    },
    async beforeMount(){
        await this.fetchBooks();
    },
    watch: {
        currentPage: {
            async handler(newValue, oldValue) {
                await this.fetchBooks();
            },
        },
        status: {
            async handler(newValue, oldValue) {
                this.books = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchBooks();
            },
        },
        desc: {
            async handler(newValue, oldValue) {
                this.books = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchBooks();
            },
        },
        booksPerPage: {
            async handler(newValue, oldValue) {
                this.books = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.booksPerPage = newValue;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchBooks();
            },
        }
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