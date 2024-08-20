<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="editAuthorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Author</h5>
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
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editAuthor" 
            :disabled="editBtnDisable">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { defineComponent } from 'vue';
  import AuthorsService from '@/services/AuthorsService';
  
  export default defineComponent({
    name: 'EditAuthorModalComponent',
    props: {
      idModal: String,
      author: {
        author_name: String,
        id_author: String
      }
    },
    emits: ['close', 'edit-author'],
    data() {
      return {
        idAuthor: '',
        authorName: '',
      };
    },
    methods: {
      async editAuthor(){
        await AuthorsService.editAuthor(this.idAuthor, this.authorName)
        .then(response => {
            this.$emit('edit-author');
            this.closeModal()
        })
        .catch(error => {
            console.log(error);
        })
      },
      closeModal() {    
        this.$emit('close');
      },
    },
    computed: {
      editBtnDisable(){
        return this.authorName == '';
      }
    },
    watch: {
      author: {
        async handler(newVal, oldVal){
          this.idAuthor = newVal.id_author;
          this.authorName = newVal.author_name;
        },
        immediate: true,
        deep: true
      },
    }
  });
  </script>
  