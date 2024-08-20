<template>
  <CreateAuthorModalComponent
  :idModal="this.addModal"
  @add-author="this.fetchAuthors"
  @close="closeModal(this.addModal)"
  ></CreateAuthorModalComponent>

  <EditAuthorModalComponent v-if="editedAuthor"
    :idModal="this.editModal"
    :author="editedAuthor"
    @edit-author="this.fetchAuthors"
    @close="closeModal(this.editModal)"
  ></EditAuthorModalComponent>

  <div class="container mt-3 mb-3">
    <!-- controls -->
    <div class="d-flex justify-content-center align-items-center mb-3">
        <div style="max-width: 300px;">
            <button @click="openModal(this.addModal)" class="btn btn-primary mx-2">Add Author</button>
        </div>
        
        <div class="input-group" style="max-width: 200px;">
            <label for="perPage" class="input-group-text">Per Page:</label>
            <select id="perPage" class="form-select" v-model="authorsPerPage">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
            </select>
        </div>

        <div class="form-check form-switch mx-2">
            <input class="form-check-input" v-model="desc" type="checkbox" id="filter2">
            <label class="form-check-label" for="filter2">Sort Desc</label>
        </div>
    </div>
    <!-- authors table -->
    <div style="overflow-x: auto;">
        <table class="table table-hover table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Author Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="author in authors" :key="author.id_author">
                    <td><div class="redirect" @click="this.$router.push(`/authors/${author.id_author}`)">{{ author.id_author }}</div></td>
                    <td>{{ author.author_name }}</td>
                    <td style="max-width: 100px;">
                        <button class="btn btn-outline-danger w-100 mb-1" @click="deleteAuthor(author.id_author)">Delete</button>
                        <button class="btn btn-outline-primary w-100" @click="editAuthor(author)">Edit</button>
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
import { defineComponent } from 'vue';
import CreateAuthorModalComponent from '@/components/modal/CreateAuthorModalComponent.vue';
import EditAuthorModalComponent from '@/components/modal/EditAuthorModalComponent.vue';
import AuthorsService from '@/services/AuthorsService';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

export default defineComponent({
  components: {
    CreateAuthorModalComponent,
    EditAuthorModalComponent
  },
  data() {
    return {
      addModal: 'add-author-modal',
      editModal: 'edit-author-modal',

      editedAuthor: '',

      authors: [],
      currentPage: 1,
      totalPages: 0,
      authorsPerPage: 10,
      desc: true,
      next_from: 0,
      totalCount: 0,
    };
  },
  methods:{
    async fetchAuthors(){
      await AuthorsService.getAuthors(
        (this.currentPage - 1) * this.authorsPerPage,
        this.authorsPerPage,
        this.desc
      )
      .then(response => {
        this.authors = response.data.authors;
        this.next_from = response.data.next_from;
        this.totalPages = response.data.total_pages;
        this.totalCount = response.data.total_count;
      })
      .catch(error => {
        console.log(error);
      })
    },
    async deleteAuthor(id_author){
      await AuthorsService.deleteAuthor(id_author)
      .then(response => {
        this.fetchAuthors();
      })
      .catch(error => {
        console.log(error)
      })
    },

    editAuthor(author){
      this.editedAuthor = author;
      this.$nextTick(() => {
          const modal = new bootstrap.Modal(document.getElementById(this.editModal));
          modal.show();
        }
      )
    },

    openModal(idModal){
      const modal = new bootstrap.Modal(document.getElementById(idModal));
      modal.show();
    },
    closeModal(idModal) {
      const modal = new bootstrap.Modal(document.getElementById(idModal));
      modal.hide();
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
  async beforeMount(){
    await this.fetchAuthors();
  },
  watch: {
    currentPage: {
      async handler(newValue, oldValue) {
          await this.fetchAuthors();
      },
    },
    authorsPerPage: {
      async handler(newValue, oldValue) {
          this.authors = [];
          this.currentPage = 1;
          this.totalPages = 0;
          this.authorsPerPage = newValue;
          this.next_from = 0;
          this.totalCount = 0;
          await this.fetchAuthors();
      },
    },
    desc: {
      async handler(newValue, oldValue) {
        this.authors = [];
        this.currentPage = 1;
        this.totalPages = 0;
        this.next_from = 0;
        this.totalCount = 0;
        await this.fetchAuthors();
      },
    },
  }
});
</script>

<style scoped lang="scss">
.redirect{
    color: blue; 
    text-decoration: underline; 
    cursor: pointer;
}
</style>
  