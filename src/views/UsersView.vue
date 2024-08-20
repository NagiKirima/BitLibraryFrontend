<template>
    <CreateUserModalComponent
        :idModal="this.addModal"
        @add-user="this.fetchUsers"
        @close="this.closeModal(this.addModal)"
    ></CreateUserModalComponent>
    <div class="container mt-3 mb-3">
        <!-- controls -->
        <div class="d-flex justify-content-center align-items-center mb-3">
            <div style="max-width: 300px;">
                <button @click="openModal(this.addModal)" class="btn btn-primary mx-2">Add User</button>
            </div>
          
            <div class="input-group" style="max-width: 200px;">
                <label for="perPage" class="input-group-text">Per Page:</label>
                <select id="perPage" class="form-select" v-model="usersPerPage">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
          
            <div class="input-group mx-2" style="max-width: 300px;">
                <label for="sortBy" class="input-group-text">Sort By:</label>
                <select id="sortBy" class="form-select" v-model="sortBy">
                    <option value=""></option>
                    <option value="full_name">Full Name</option>
                    <option value="address">Address</option>
                </select>
            </div>

            <div class="form-check form-switch mx-2">
                <input class="form-check-input" v-model="desc" type="checkbox" id="filter2">
                <label class="form-check-label" for="filter2">Sort Desc</label>
            </div>
        </div>
        <!-- users table -->
        <div style="overflow-x: auto;">
            <table class="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>BirthDate</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id_user">
                        <td><div class="redirect" @click="this.$router.push(`/users/${user.id_user}`)">{{ user.id_user }}</div></td>
                        <td>{{ user.full_name }}</td>
                        <td>{{ user.birth_date }}</td>
                        <td>{{ user.address }}</td>
                        <td>{{ user.phone_number }}</td>
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
import UsersService from '@/services/UsersService.js'
import CreateUserModalComponent from '@/components/modal/CreateUserModalComponent.vue';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

export default defineComponent({
    components: {
        CreateUserModalComponent
    },
    data() {
        return {
            addModal: 'add-user-modal',

            users: [],
            currentPage: 1,
            totalPages: 0,
            usersPerPage: 10,
            sortBy: '',
            desc: true,
            next_from: 0,
            totalCount: 0,
        };
    },
    methods:{
        async fetchUsers(){
            await UsersService.getUsers(
                (this.currentPage - 1) * this.usersPerPage,
                this.usersPerPage,
                this.sortBy,
                this.desc
            )
            .then(response => {
                this.users = response.data.users;
                this.next_from = response.data.next_from;
                this.totalPages = response.data.total_pages;
                this.totalCount = response.data.total_count;
            })
            .catch(error => {
                console.log(error);
            })
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
        await this.fetchUsers();
    },
    watch: {
        currentPage: {
            async handler(newValue, oldValue) {
                await this.fetchUsers();
            },
        },
        usersPerPage: {
            async handler(newValue, oldValue) {
                this.users = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.usersPerPage = newValue;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchUsers();
            },
        },
        desc: {
            async handler(newValue, oldValue) {
                this.users = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchUsers();
            },
        },
        sortBy: {
            async handler(newValue, oldValue) {
                this.users = [];
                this.currentPage = 1;
                this.totalPages = 0;
                this.next_from = 0;
                this.totalCount = 0;
                await this.fetchUsers();
            },
        }
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
    