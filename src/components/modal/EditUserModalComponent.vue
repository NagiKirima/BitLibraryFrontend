<template>
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="full_name" class="form-label">Full Name:</label>
                            <input v-model="this.fullName" type="text" class="form-control" id="full_name">
                        </div>
                        <div class="mb-3">
                            <label for="birth_date" class="form-label">Date of Birth:</label>
                            <input v-model="this.birthDate" type="date" class="form-control" id="birth_date">
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">Address:</label>
                            <input v-model="this.currentAddress" type="text" class="form-control" id="address">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editUser" :disabled="editBtnDisable">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import UsersService from '@/services/UsersService';

export default defineComponent({
    name: 'EditUserModalComponent',
    props: {
        idModal: String,
        id_user: String,
        full_name: String,
        birth_date: String,
        address: String
    },
    emits: ['close', 'edit-user'],
    data() {
        return {
            idUser: '',
            fullName: '',
            birthDate: '',
            currentAddress: ''
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async editUser(){
            await UsersService.updateUser(
                this.idUser,
                this.fullName,
                this.birthDate,
                this.currentAddress,
            )
            .then(response => {
                this.$emit('edit-user');
                this.closeModal();
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    computed: {
        editBtnDisable() {
            return this.fullName === this.$props.full_name && this.birthDate === this.$props.birth_date && this.currentAddress === this.$props.address;
        }
    },
    watch: {
        id_user: {
            async handler(newVal, oldVal){
                this.idUser = newVal;
            },
            immediate: true,
        },
        full_name: {
            async handler(newVal, oldVal){
                this.fullName = newVal;
            },
            immediate: true,
        },
        birth_date: {
            async handler(newVal, oldVal){
                this.birthDate = newVal;
            },
            immediate: true,
        },
        address: {
            async handler(newVal, oldVal){
                this.currentAddress = newVal;
            },
            immediate: true,
        },
    }
});
</script>