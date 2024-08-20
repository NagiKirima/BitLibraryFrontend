<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <h4 class="mb-3">Genre Information</h4>
                <p><strong>ID Genre:</strong> {{ id_genre }}</p>
                <p><strong>Genre Name:</strong> {{ genre.genre_name }}</p>
            </div>
        </div>

        <!-- controls -->
        <div class="d-flex justify-content-center align-items-center mb-3 mt-3">
            <div class="input-group" style="max-width: 200px;">
                <label for="perPage" class="input-group-text">Per Page:</label>
                <select id="perPage" class="form-select" v-model="booksPerPage">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
          
            <div class="input-group mx-2" style="max-width: 300px;">
                <label for="sortBy" class="input-group-text">Sort By:</label>
                <select id="sortBy" class="form-select" v-model="sortBy">
                    <option value=""></option>
                    <option value="title">Title</option>
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
                        <th>ID Book</th>
                        <th>Book Title</th>
                        <th>Book Authors</th>
                        <th>Book Genres</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book.id_book">
                        <td><div class="redirect" @click="this.$router.push(`/books/${book.id_book}`)">{{ book.id_book }}</div></td>
                        <td>{{ book.title }}</td>
                        <td><div class="redirect" v-for="author in book.authors" :key="author.id_author" @click="this.$router.push(`/authors/${author.id_author}`)">{{ author.author_name }}</div></td>
                        <td><div class="redirect" v-for="genre in book.genres" :key="genre.id_genre" @click="this.$router.push(`/genres/${genre.id_genre}`);">{{ genre.genre_name }}</div></td>
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
import BookService from '@/services/BookService';
import GenresService from '@/services/GenresService';

export default defineComponent({
    data() {
        return {
            id_genre: null,
            genre: {
                genre_name: '',
            },

            books: [],
            sortBy: '',
            desc: true,
            booksPerPage: 10,
            currentPage: 1,
            totalPages: 0,
            nextFrom: 0,
            totalCount: 0,
        };
    },
    methods: {
        async fetchGenre(){
            await GenresService.getGenreById(this.id_genre)
            .then(response => {
                this.genre = response.data.genre;
            })
            .catch(error => {
                console.log(error);
            })
        },
        async fetchBooks(){
            await BookService.getBookByGenre(
                this.id_genre,
                (this.currentPage - 1) * this.booksPerPage,
                this.booksPerPage,
                this.sortBy,
                this.desc
            )
            .then(response => {
                console.log(response);
                this.books = response.data.books;
                this.totalCount = response.data.total_count;
                this.totalPages = response.data.total_pages;
                this.nextFrom = response.data.next_from;
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
    },
    watch: {
        currentPage: {
            async handler(newValue, oldValue) {
                await this.fetchBooks();
            },
        },
        booksPerPage: {
            async handler(newValue, oldValue) {
                this.books = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.nextFrom = 0;
                this.totalCount = 0;
                await this.fetchBooks();
            },
        },
        sortBy: {
            async handler(newValue, oldValue) {
                await this.fetchBooks();
            },
        },
        desc: {
            async handler(newValue, oldValue) {
                await this.fetchBooks();
            },
        },
        '$route.params': {
            async handler(newParams, oldParams) {
                this.id_genre = newParams.id_genre;
                await this.fetchGenre();
                await this.fetchBooks();
            },
            immediate: true,
            deep: true 
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
