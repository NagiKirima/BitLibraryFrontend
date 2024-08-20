<template>
    <div class="container mt-3">
        <h4>Reports in Console</h4>
        <div class="d-flex flex-column gap-2 justify-content-center w-100 mt-3">
            <button class="btn btn-primary" @click="getAvailableBooks()">Available Books</button>
            <button class="btn btn-primary" @click="getUsersBorrowedBooksAllTime()">Users borrowed books all-time</button>
            <button class="btn btn-primary" @click="getUsersBorrowedBooksCurrent()">Users current borrowed books</button>
            <button class="btn btn-primary" @click="getUsersLastEntryTime()">Users last entry time</button>
            <button class="btn btn-primary" @click="getPopularGenres()">Popular Genres</button>
            <button class="btn btn-primary" @click="getBorrowsFines()">Borrows Fines</button>
            <button class="btn btn-primary" @click="getBorrowsGeo()">Borrows Geo</button>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import ReportsService from '@/services/ReportsService';

export default defineComponent({
    name: 'ReportsPage',
    methods: {
        async getAvailableBooks(){
            await ReportsService.availableBooks()
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getUsersBorrowedBooksAllTime(){
            await ReportsService.usersBorrowedBooksAllTime()
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getUsersBorrowedBooksCurrent(){
            await ReportsService.usersBorrowedBooksCurrent()
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getUsersLastEntryTime(){
            await ReportsService.usersLastEntryTime()
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getPopularGenres(){
            await ReportsService.popularGenres()
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getBorrowsFines(){
            await ReportsService.borrowsFines()
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getBorrowsGeo(){
            await ReportsService.borrowsGeo()
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
});
</script>
  
<style scoped lang="scss">
</style>
  