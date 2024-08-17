import {createStore} from 'vuex'
import AuthModule from "./modules/AuthModule"

const store = createStore({
    modules: {
        AuthModule,
    }
})

export default store