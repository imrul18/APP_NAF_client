import { configureStore } from "@reduxjs/toolkit"

import AuthReducer from './AuthStore'
import RequisitionReducer from './RequisitionStore'

export default configureStore({
    reducer: {
        authStore: AuthReducer,
        requisitionStore: RequisitionReducer,
    }
})