<template>
    <EditUserModalComponent v-if="this.id_user"
        :idModal="this.editModalId"
        :id_user="this.id_user"
        :full_name="this.user.full_name"
        :address="this.user.address"
        :birth_date="this.user.birth_date"
        @edit-user="this.fetchUserData"
        @close="closeModal(this.editModalId)"
    ></EditUserModalComponent>

    <CreateBorrowModalComponent v-if="this.id_user"
        :idModal="this.addModalId"
        :idUser="this.id_user"
        @add-borrows="this.fetchUserBorrows"
        @close="closeModal(this.addModalId)"
    ></CreateBorrowModalComponent>
    
    <div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <h4 class="mb-3">User Information</h4>
                <p><strong>ID User:</strong> {{ id_user }}</p>
                <p><strong>User Name:</strong> {{ user.full_name }}</p>
                <p><strong>Birth Date:</strong> {{ user.birth_date }}</p>
                <p><strong>Phone Number:</strong> {{ user.phone_number }}</p>
                <p><strong>Address:</strong> {{ user.address }}</p>
            </div>
            <div class="d-flex justify-content-center gap-2 mx-3 mb-3">
                <button class="btn btn-outline-primary w-100"@click="openModal(this.editModalId)">Edit User</button>
                <button class="btn btn-primary w-100" @click="openModal(this.addModalId)">Add Borrow</button>
                <button class="btn btn-danger w-100" @click="deleteUser">Delete User</button>
            </div>
        </div>

         <!-- controls -->
         <div class="d-flex justify-content-center align-items-center mb-3 mt-3">
            <div class="input-group" style="max-width: 200px;">
                <label for="perPage" class="input-group-text">Per Page:</label>
                <select id="perPage" class="form-select" v-model="borrowsPerPage">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <div class="input-group mx-2" style="max-width: 250px;">
                <label for="sortBy" class="input-group-text">Sort By:</label>
                <select id="sortBy" class="form-select" v-model="sortBy">
                    <option value=""></option>
                    <option value="borrow_date">Borrow Date</option>
                    <option value="return_date">Return Date</option>
                </select>
            </div>

            <div class="input-group mx-2" style="max-width: 300px;">
                <label for="isReturned" class="input-group-text">Returned:</label>
                <select id="isReturned" class="form-select" v-model="isReturned">
                    <option :value="null">All</option>
                    <option :value="true">Returned</option>
                    <option :value="false">Not Returned</option>
                </select>
            </div>

            <div class="form-check form-switch mx-2">
                <input class="form-check-input" v-model="desc" type="checkbox" id="filter2">
                <label class="form-check-label" for="filter2">Sort Desc</label>
            </div>
        </div>

        <div style="overflow-x: auto;" class="mt-3">
            <table class="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID Borrow</th>
                        <th>ID Book</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Returned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="borrow in borrows" :key="borrow.id_borrow">
                        <td><div class="redirect" @click="this.$router.push(`/borrows/${borrow.id_borrow}`)">{{ borrow.id_borrow }}</div></td>
                        <td><div class="redirect" @click="this.$router.push(`/books/${borrow.id_book}`)">{{ borrow.id_book }}</div></td>
                        <td>{{ borrow.borrow_date }}</td>
                        <td>{{ borrow.return_date }}</td>
                        <td>{{ borrow.is_returned }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-3">
            <button style="min-width: 100px;" class="btn btn-outline-primary mx-2" @click="prevPage">Previous</button>
            <span>{{ currentPage }}...{{ totalPages }}</span>
            <button style="min-width: 100px;" class="btn btn-outline-primary mx-2" @click="nextPage">Next</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import EditUserModalComponent from '@/components/modal/EditUserModalComponent.vue';
import UsersService from '@/services/UsersService.js'
import BorrowsService from '@/services/BorrowsService';
import CreateBorrowModalComponent from '@/components/modal/CreateBorrowModalComponent.vue';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

export default defineComponent({
    components:{
        EditUserModalComponent,
        CreateBorrowModalComponent
    },
    data() {
        return {
            editModalId: 'edit-user-modal',
            addModalId: 'create-borrow-modal',

            id_user: null,
            user: {
                full_name: '',
                phone_number: '',
                address: '',
                birth_date: ''
            },

            borrows: [],
            sortBy: '',
            isReturned: null,
            desc: true,
            borrowsPerPage: 10,
            currentPage: 1,
            totalPages: 0,
            next_from: 0,
            totalCount: 0,
        };
    },
    async mounted() {
        this.id_user = this.$route.params.id_user;
        await this.fetchUserData();
        await this.fetchUserBorrows()
    },
    methods: {
        openModal(idModal){
            this.$nextTick(() => {
                const modal = new bootstrap.Modal(document.getElementById(idModal));
                modal.show();
                }
            )
        },
        closeModal(idModal){
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
        async deleteUser(){
            await UsersService.deleteUser(this.id_user)
            .then(response => {
                this.$router.push('/users');
            })
            .catch(error => {
                console.log(error);
            })
        },
        async fetchUserBorrows(){
            await BorrowsService.getUserBorrows(
                this.id_user,
                (this.currentPage - 1) * this.borrowsPerPage,
                this.borrowsPerPage,
                this.sortBy,
                this.desc,
                this.isReturned
            )
            .then(response => {
                console.log(response);
                this.borrows = response.data.borrows;
                this.totalPages = response.data.total_pages;
                this.totalCount = response.data.totalCount;
            })
            .catch(error => {
                console.log(error);
            })
        },
        async fetchUserData() {
            await UsersService.getUserById(this.id_user)
            .then(response => {
                console.log(response);
                this.user = { ... response.data.user };
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    watch: {
        currentPage: {
            async handler(newValue, oldValue) {
                await this.fetchUserBorrows();
            },
        },
        borrowsPerPage: {
            async handler(newValue, oldValue) {
                this.borrows = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.nextFrom = 0;
                this.totalCount = 0;
                await this.fetchUserBorrows();
            },
        },
        sortBy: {
            async handler(newValue, oldValue) {
                await this.fetchUserBorrows();
            },
        },
        desc: {
            async handler(newValue, oldValue) {
                await this.fetchUserBorrows();
            },
        },
        isReturned: {
            async handler(newValue, oldValue) {
                await this.fetchUserBorrows();
            },
        },
    }
})
</script>

<style scoped lang="scss">
.redirect{
    color: blue; 
    text-decoration: underline; 
    cursor: pointer;
}
</style>
