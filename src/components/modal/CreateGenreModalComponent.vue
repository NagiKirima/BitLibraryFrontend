<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="addAuthorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Genre</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="genreName" class="form-label">Name:</label>
                <input v-model="genreName" type="text" class="form-control" id="genreName">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addGenre" 
            :disabled="addBtnDisable">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { defineComponent } from 'vue';
  import GenresService from '@/services/GenresService';
  
  export default defineComponent({
    name: 'CreateGenreModalComponent',
    props: {
      idModal: String
    },
    emits: ['close', 'add-genre'],
    data() {
      return {
        genreName: '',
      };
    },
    methods: {
      async addGenre(){
        await GenresService.createGenre(this.genreName)
        .then(response => {
            this.$emit('add-genre');
            this.closeModal()
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
        this.genreName = '';
      }
    },
    computed: {
      addBtnDisable(){
        return this.genreName == '';
      }
    }
  });
  </script>
  