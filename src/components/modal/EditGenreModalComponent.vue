<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="editAuthorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Genre</h5>
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
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editGenre" 
            :disabled="editBtnDisable">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
<script>
import { defineComponent } from 'vue';
import GenresService from '@/services/GenresService';

export default defineComponent({
    name: 'EditGenreModalComponent',
    props: {
        idModal: String,
        genre: {
            genre_name: String,
            id_genre: String
        }
    },
    emits: ['close', 'edit-genre'],
    data() {
        return {
            genreName: this.$props.genre.genre_name,
        };
    },
    methods: {
        async editGenre(){
            await GenresService.editGenre(this.$props.genre.id_genre, this.genreName)
            .then(response => {
                this.$emit('edit-genre');
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
            this.genre_name = '';
        }
    },
    computed: {
      editBtnDisable(){
        return this.genreName == '';
      }
    }
});
</script>
  