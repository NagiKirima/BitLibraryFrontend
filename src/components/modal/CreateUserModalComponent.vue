<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Full Name:</label>
                            <input v-model="fullName" type="text" class="form-control" id="fullName">
                        </div>
                        <div class="mb-3">
                            <label for="dateOfBirth" class="form-label">Date of Birth:</label>
                            <input v-model="dateOfBirth" type="date" class="form-control" id="dateOfBirth">
                        </div>
                        <div class="mb-3">
                            <label for="phoneNumber" class="form-label">Phone Number:</label>
                            <input v-model="phoneNumber" type="text" class="form-control" id="phoneNumber">
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">Address:</label>
                            <input v-model="address" type="text" class="form-control" id="address">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addUser" :disabled="addBtnDisable">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import UsersService from '@/services/UsersService';

export default defineComponent({
    name: 'CreateUserModalComponent',
    props: {
        idModal: String
    },
    emits: ['close', 'add-user'],
    data() {
        return {
            fullName: '',
            dateOfBirth: '',
            phoneNumber: '',
            address: ''
        };
    },
    methods: {
        async addUser(){
            await UsersService.createUser(
                this.fullName,
                this.dateOfBirth,
                this.phoneNumber,
                this.address
            )
            .then(response => {
                this.$emit('add-user');
                this.closeModal();
            })
            .catch(error => {
                console.log(error);
            });
        },
        closeModal() {
            this.resetState();
            this.$emit('close');
        },
        resetState() {
            this.fullName = '';
            this.dateOfBirth = '';
            this.phoneNumber = '';
            this.address = '';
        }
    },
    computed: {
        addBtnDisable(){
            return this.fullName === '' || this.dateOfBirth === '' || this.phoneNumber === '' || this.address === '';
        }
    }
});
</script>