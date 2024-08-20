<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="addAuthorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Author</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="authorName" class="form-label">Name:</label>
                <input v-model="authorName" type="text" class="form-control" id="authorName">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addAuthor" 
            :disabled="addBtnDisable">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { defineComponent } from 'vue';
  import AuthorsService from '@/services/AuthorsService';
  
  export default defineComponent({
    name: 'CreateAuthorModalComponent',
    props: {
      idModal: String
    },
    emits: ['close', 'add-author'],
    data() {
      return {
        authorName: '',
      };
    },
    methods: {
      async addAuthor(){
        await AuthorsService.createAuthor(this.authorName)
        .then(response => {
            this.$emit('add-author');
            this.closeAddModal()
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
        this.authorName = '';
      }
    },
    computed: {
      addBtnDisable(){
        return this.authorName == '';
      }
    }
  });
  </script>
  