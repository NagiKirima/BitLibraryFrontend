<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="editBorrowStatusModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Borrow Status</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="status" class="form-label">Status:</label>
                <select v-model="status" class="form-select" id="status">
                  <option :value="true">Returned</option>
                  <option :value="false">Not Returned</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" :disabled="editBtnDisabled" @click="editStatus">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { defineComponent } from 'vue';
import BorrowsService from '../../services/BorrowsService';
  
export default defineComponent({
  name: 'EditBorrowStatusModalComponent',
  props: {
    idModal: String,
    idBorrow: String,
    returned: Boolean,
    currentStatus: Boolean,
  },
  emits: ['close', 'edit-status'],
  data() {
    return {
      status: false,
      id_borrow: this.idBorrow,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async editStatus() {
      await BorrowsService.editBorrowStatus(
        this.id_borrow,
        this.status
      )
      .then(response => {
        this.$emit('edit-status');
        this.closeModal();
      })
      .catch(error => {
        console.log(error);
      })
    },
  },
  beforeUnmount() {
    const modalElement = document.getElementById(this.idModal);
    modalElement.removeEventListener('hidden.bs.modal', this.closeModal);
  },
  mounted() {
    const modalElement = document.getElementById(this.idModal);
    modalElement.addEventListener('hidden.bs.modal', this.closeModal);
  },
  computed: {
    editBtnDisabled(){
      return this.$props.returned === this.status;
    }
  },
  watch: {
    idBorrow: {
      async handler(newVal, oldVal){
          this.id_borrow = newVal;
      },
      immediate: true,
    },
    returned: {
      async handler(newVal, oldVal){
          this.status = newVal;
      },
      immediate: true,
    },
  }
});
</script>