<template>
    <EditBorrowStatusModalComponent v-if="idBorrow"
    :idModal="this.editModalId"
    :idBorrow="this.idBorrow"
    :returned="this.borrow.is_returned"
    @edit-status="this.fetchBorrowData"
    ></EditBorrowStatusModalComponent>
    
    <div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <h4 class="mb-3">Book Borrow Information</h4>
                <p><strong>ID Borrow:</strong> {{ id_borrow }}</p>
                <p><strong>ID Book:</strong> <div class="redirect" @click="this.$router.push(`/books/${borrow.id_book}`)">{{ borrow.id_book }}</div></p>
                <p><strong>ID User:</strong> <div class="redirect" @click="this.$router.push(`/users/${borrow.id_user}`)">{{ borrow.id_user }}</div></p>
                <p><strong>Borrow Date:</strong> {{ borrow.borrow_date }}</p>
                <p><strong>Return Date:</strong> {{ borrow.return_date }}</p>
                <p><strong>Returned:</strong> {{ borrow.is_returned }}</p>
            </div>
            <div class="d-flex justify-content-center gap-2 mx-3 mb-3">
                <button class="btn btn-primary w-100" @click="openModal(this.editModalId)">Edit Status</button>
                <button class="btn btn-danger w-100" @click="deleteBorrow">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BorrowsService from '@/services/BorrowsService';
import EditBorrowStatusModalComponent from '@/components/modal/EditBorrowStatusModalComponent.vue';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'


export default defineComponent({
    components: {
        EditBorrowStatusModalComponent
    },
    data() {
        return {
            editModalId: 'edit-borrow-modal',
            idBorrow: null,
            borrow: {}

        };
    },
    async mounted() {
        this.idBorrow = this.$route.params.id_borrow;
        await this.fetchBorrowData();
    },
    methods: {
        openModal(idModal){
            this.$nextTick(() => {
                const modal = new bootstrap.Modal(document.getElementById(idModal));
                modal.show();
                }
            )
        },
        async deleteBorrow(){
            await BorrowsService.deleteBorrow(this.idBorrow)
            .then(response => {
                this.$router.push('/borrows')
            })
            .catch(error => {
                console.log(error);
            })
        },
        async fetchBorrowData() {
            await BorrowsService.getBorrowById(this.idBorrow)
            .then(response => {
                console.log(response.data.borrow);
                this.borrow = response.data.borrow;
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
})
</script>

<style scoped lang="scss">
.redirect{
    color: blue; 
    text-decoration: underline; 
    cursor: pointer;
}
</style>