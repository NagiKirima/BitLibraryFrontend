<template>
    <ErrorModalComponent 
        :idModal="this.modalId"
        :errorMessage="errorMessage" 
        @close="closeErrorModal"
    />
    <div class="container d-flex justify-content-center align-items-center">
        <form>
            <div class="mb-3 mt-3">
                <label for="login" class="form-label">Login</label>
                <input v-model="login" type="text" class="form-control" id="login" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <button :disabled="!login || !password || dataSending" @click="onLogin" type="submit" class="btn btn-primary w-100 mb-3">Login</button>
        </form>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

export default defineComponent({
    components: {
        ErrorModalComponent
    },
    data() {
        return {
            modalId: 'errorModal',
            errorMessage: '',
            login: '',
            password: '',
            dataSending: false
        }
    },
    methods: {
        onLogin(){
            this.dataSending = true;

            this.$store.dispatch('AuthModule/onLogin', {
                login: this.login,
                password: this.password,
            }).then((res) => {
                this.dataSending = false;
                this.$router.push('/');

            }).catch((error) => {
                this.dataSending = false;
                let error_msg = error.response.status == 401 ? 'Invalid login or password' : 'Something went wrong please try later';
                this.displayError(error_msg);
            })
        },
        displayError(message) {
            this.errorMessage = message;

            var errorModal = new bootstrap.Modal(document.getElementById(this.modalId));
            errorModal.show();
        },
        closeErrorModal() {
            this.errorMessage = '';
            var errorModal = new bootstrap.Modal(document.getElementById(this.modalId));
            errorModal.hide();
        },
    }
})
</script>

<style scoped lang="scss">

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 350px;
    max-height: 400px;
    border: 1px solid gray;
    border-radius: 10px;
}

</style>