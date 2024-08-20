<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="addBorrowModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Borrow</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="borrowDate" class="form-label">Borrow Date:</label>
                    <input v-model="borrowDate" type="date" class="form-control" id="borrowDate">
                </div>
                <div class="mb-3">
                    <label for="returnDate" class="form-label">Return Date:</label>
                    <input v-model="returnDate" type="date" class="form-control" id="returnDate">
                </div>
                <div class="mb-3">
                    <label for="books" class="form-label">Available Books:</label>
                    <select v-model="selectedBooks" multiple class="form-select" id="books" @scroll="loadBooks" ref="authorsList">
                        <option v-for="book in availableBooks" :key="book.id_book" :value="book.id_book">
                            <div><strong>Title:</strong></div>
                            <div>{{ book.title }}</div>
                            <div><strong>Authors:</strong></div>
                            <div v-for="author in book.authors" :key="author.id"><div>{{ author.author_name }}</div></div>
                            <div><strong>Genres:</strong></div>
                            <div v-for="genre in book.genres" :key="genre.id"><div>{{ genre.genre_name }}</div></div>
                            <br>
                        </option>
                    </select>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createBorrows" 
            :disabled="addBtnDisable">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
<script>
import { defineComponent } from 'vue';
import BorrowsService from '@/services/BorrowsService';
import BookService from '../../services/BookService';

export default defineComponent({
    name: 'CreateBorrowModalComponent',
    props: {
        idModal: String,
        idUser: String
    },
    emits: ['close', 'add-borrows'],
    data() {
        return {
            availableBooks: [],
            selectedBooks: [],
            id_user: '',
            returnDate: '',
            borrowDate: '',

            offset: 0,
            limit: 10,
            status: true,
            desc: true,
            nextFrom: null,
        };
    },
    methods: {
        async fetchBooks(){
            await BookService.getBooksByStatus(
                this.offset,
                this.limit,
                this.status,
                this.desc
            )
            .then(response => {
                this.availableBooks = this.availableBooks.concat(response.data.books);
                this.nextFrom = response.data.next_from;
            })
            .catch(error => {
                console.log(error);
            })
        },
        async loadBooks(){
        const authorsList = this.$refs.authorsList;
        if (this.nextFrom){
            if(authorsList.scrollTop + authorsList.clientHeight >= authorsList.scrollHeight){
            await this.fetchBooks();
            }
        }
        },
        async createBorrows(){
            await BorrowsService.createBorrows(
                this.id_user,
                this.selectedBooks,
                this.borrowDate,
                this.returnDate
            )
            .then(response => {
                this.$emit('add-borrows')
                this.closeModal();
            })
            .catch(error => {
                console.log(error);
            })
        },
        closeModal() {    
            this.resetState();
            this.$emit('close');
        },
        resetState() {
            console.log('delete')
            this.availableBooks = [];
            this.selectedBooks = [];
            this.nextFrom = null;
        }
    },
    beforeUnmount() {
        const modalElement = document.getElementById(this.idModal);
        modalElement.removeEventListener('hidden.bs.modal', this.closeModal);
        modalElement.removeEventListener('show.bs.modal', this.fetchBooks);
        modalElement.removeEventListener('hidden.bs.modal', this.resetState);
    },
    mounted() {
        const modalElement = document.getElementById(this.idModal);
        modalElement.addEventListener('hidden.bs.modal', this.closeModal);
        modalElement.addEventListener('hidden.bs.modal', this.resetState);
        modalElement.addEventListener('show.bs.modal', this.fetchBooks);
    },
    computed: {
        addBtnDisable(){
            return this.selectedBooks.length == 0 || this.borrowDate === '' || this.returnDate === '';
        }
    },
    watch: {
        idUser:{
            async handler(newVal, oldVal){
                this.id_user = newVal;
            },
            immediate: true,
        }
    }
});
</script>
  