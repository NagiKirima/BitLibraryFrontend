<template>
    <CreateGenreModalComponent
        :idModal="this.addModal"
        @add-genre="this.fetchGenres"
        @close="closeModal(this.addModal)"
    ></CreateGenreModalComponent>

    <EditGenreModalComponent v-if="this.editedGenre"
        :idModal="this.editModal"
        :genre="this.editedGenre"
        @edit-genre="this.fetchGenres"
        @close="closeModal(this.editModal)"
    ></EditGenreModalComponent>

    <div class="container mt-3 mb-3">
      <!-- controls -->
      <div class="d-flex justify-content-center align-items-center mb-3">
          <div style="max-width: 300px;">
              <button @click="openModal(this.addModal)" class="btn btn-primary mx-2">Add Genre</button>
          </div>
          
          <div class="input-group" style="max-width: 200px;">
              <label for="perPage" class="input-group-text">Per Page:</label>
              <select id="perPage" class="form-select" v-model="genresPerPage">
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
      <!-- genres table -->
      <div style="overflow-x: auto;">
          <table class="table table-hover table-bordered table-striped">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Genre Name</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="genre in genres" :key="genre.id_genre">
                      <td><div class="redirect" @click="this.$router.push(`/genres/${genre.id_genre}`)">{{ genre.id_genre }}</div></td>
                      <td>{{ genre.genre_name }}</td>
                      <td style="max-width: 100px;">
                          <button class="btn btn-outline-danger w-100 mb-1" @click="deleteGenre(genre.id_genre)">Delete</button>
                          <button class="btn btn-outline-primary w-100" @click="editGenre(genre)">Edit</button>
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
import GenresService from '@/services/GenresService.js'
import CreateGenreModalComponent from '@/components/modal/CreateGenreModalComponent.vue';
import EditGenreModalComponent from '@/components/modal/EditGenreModalComponent.vue';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

export default defineComponent({
    components: {
        CreateGenreModalComponent,
        EditGenreModalComponent
    },
    data() {
        return {
            addModal: 'add-genre-modal',
            editModal: 'edit-genre-modal',

            editedGenre: '',

            genres: [],
            currentPage: 1,
            totalPages: 0,
            genresPerPage: 10,
            desc: true,
            next_from: 0,
            totalCount: 0,
        };
    },
    methods:{
        async fetchGenres(){
            await GenresService.getGenres(
                (this.currentPage - 1) * this.genresPerPage,
                this.genresPerPage,
                this.desc
            )
            .then(response => {
                this.genres = response.data.genres;
                this.next_from = response.data.next_from;
                this.totalPages = response.data.total_pages;
                this.totalCount = response.data.total_count;
            })
            .catch(error => {
                console.log(error);
            })
        },
        async deleteGenre(id_genre){
            await GenresService.deleteGenre(id_genre)
            .then(response => {
                this.fetchGenres();
            })
            .catch(error => {
                console.log(error)
            })
        },

        editGenre(genre){
            this.editedGenre = genre;
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
        await this.fetchGenres();
    },
    watch: {
        currentPage: {
            async handler(newValue, oldValue) {
                await this.fetchGenres();
            },
        },
        genresPerPage: {
            async handler(newValue, oldValue) {
                this.genres = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.genresPerPage = newValue;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchGenres();
            },
        },
        desc: {
            async handler(newValue, oldValue) {
                this.genres = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchGenres();
            },
        },
    },
});
</script>
  
<style scoped lang="scss">
.redirect{
    color: blue; 
    text-decoration: underline; 
    cursor: pointer;
}
</style>
    