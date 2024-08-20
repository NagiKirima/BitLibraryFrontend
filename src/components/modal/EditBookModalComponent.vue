<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="addBookModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Book</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="bookTitle" class="form-label">Title:</label>
                <input v-model="bookTitle" type="text" class="form-control" id="bookTitle">
              </div>
              <div class="mb-3">
                <label for="authors" class="form-label">Authors:</label>
                <select v-model="selectedAuthors" multiple class="form-select" id="authors" @scroll="loadAuthors" ref="authorsList">
                  <option v-for="author in authors" :key="author.id_author" :value="author.id_author">{{ author.author_name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="genres" class="form-label">Genres:</label>
                <select v-model="selectedGenres" multiple class="form-select" id="genres" @scroll="loadGenres" ref="genresList">
                  <option v-for="genre in genres" :key="genre.id_genre" :value="genre.id_genre">{{ genre.genre_name }}</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editBook" 
            :disabled="editBtnDisable">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { defineComponent } from 'vue';
  import AuthorsService from '@/services/AuthorsService';
  import GenresService from '@/services/GenresService';
  import BookService from '@/services/BookService'
  
  export default defineComponent({
    name: 'EditBookModalComponent',
    props: {
      idModal: String,
      idBook: String
    },
    emits: ['close', 'edit-book'],
    data() {
      return {
        bookTitle: '',  
        authors: [],
        genres: [],
        selectedAuthors: [],
        selectedGenres: [],
        
        limitAuthors: 10,
        nextFromAuthors: null,
        
        limitGenres: 10,
        nextFromGenres: null,
      };
    },
    methods: {
      async fetchBookData(){
        await BookService.getBookById(this.$props.idBook)
        .then(response => {
          this.bookTitle = response.data.book.title;
          this.selectedAuthors = response.data.book.authors.map(author => author.id_author);
          this.selectedGenres = response.data.book.genres.map(genre => genre.id_genre);
        })
        .catch(error => {
          console.log(error);
        })
      },
      async fetchAuthors(){
        await AuthorsService.getAuthors(
          this.nextFromAuthors,
          this.limitAuthors,
          false
        )
        .then(response => {
            this.authors = this.authors.concat(response.data.authors);
            this.nextFromAuthors = response.data.next_from;
        })
        .catch(error=>{
          console.log(error);
        })
      },
      async fetchGenres(){
        await GenresService.getGenres(
            this.nextFromGenres,
            this.limitGenres,
            false
        )
        .then(response => {
            this.genres = this.genres.concat(response.data.genres);
            this.nextFromGenres = response.data.next_from;
        })
        .catch(error=>{
            console.log(error);
        })
      },
      async loadAuthors(){
        const authorsList = this.$refs.authorsList;
        if (this.nextFromAuthors){
          if(authorsList.scrollTop + authorsList.clientHeight >= authorsList.scrollHeight){
            await this.fetchAuthors();
          }
        }
      },
      async loadGenres(){
        const genresList = this.$refs.genresList;
        if (this.nextFromGenres){
          if(genresList.scrollTop + genresList.clientHeight >= genresList.scrollHeight){
            await this.fetchGenres();
          }
        }
      },
      async editBook(){
        await BookService.editBook(
          this.$props.idBook,
          this.bookTitle,
          this.selectedAuthors,
          this.selectedGenres
        )
        .then(response => {
          console.log(response);
          this.$emit('edit-book');
          this.closeAddModal();
        })
        .catch(error => {
          console.log(error);
        })
      },
      closeAddModal() {    
        this.resetState();  
        this.$emit('close');
      },
      resetState() {
        this.bookTitle = '';
        this.selectedAuthors = [];
        this.selectedGenres = [];
        this.authors = [];
        this.genres = [];
        this.nextFromAuthors = null;
        this.nextFromGenres = null;
      }
    },
    beforeUnmount() {
      const modalElement = document.getElementById(this.idModal);
      modalElement.removeEventListener('hidden.bs.modal', this.closeAddModal);
      modalElement.removeEventListener('show.bs.modal', this.fetchAuthors);
      modalElement.removeEventListener('show.bs.modal', this.fetchGenres);
      modalElement.removeEventListener('show.bs.modal', this.fetchBookData);
    },
    mounted() {
      const modalElement = document.getElementById(this.idModal);
      modalElement.addEventListener('hidden.bs.modal', this.closeAddModal);
      modalElement.addEventListener('show.bs.modal', this.fetchAuthors);
      modalElement.addEventListener('show.bs.modal', this.fetchGenres);
      modalElement.addEventListener('show.bs.modal', this.fetchBookData);
    },
    computed: {
      editBtnDisable(){
        return this.selectedAuthors.length == 0 || this.selectedGenres.length == 0 || this.bookTitle == '';
      }
    }
  });
  </script>
  