import loaderReducer from "./slices/loaderSlice"
import authReducer from './slices/authSlice'
import { configureStore } from "@reduxjs/toolkit"
import { categoriesApi } from "./services/categoriesApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { filesApi } from "./services/filesApi"
import { propertiesApi } from "./services/propertiesApi"
import { categoryPropertiesApi } from "./services/categoryPropertiesApi"
import { productPhotosApi } from "./services/productPhotosApi"
import { developersApi } from "./services/developersApi"
import { productsApi } from "./services/productsApi"
import { propValuesApi } from "./services/propValuesApi"
import { productPropertyValuesApi } from "./services/productPropertyValuesApi"
import { slidersApi } from "./services/slidersApi"
import { shopsApi } from "./services/shopsApi"

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [categoryPropertiesApi.reducerPath]: categoryPropertiesApi.reducer,
    [productPhotosApi.reducerPath]: productPhotosApi.reducer,
    [developersApi.reducerPath]: developersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [propValuesApi.reducerPath]: propValuesApi.reducer,
    [productPropertyValuesApi.reducerPath]: productPropertyValuesApi.reducer,
    [shopsApi.reducerPath]: shopsApi.reducer,
    [slidersApi.reducerPath]: slidersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(productsApi.middleware)
      .concat(propertiesApi.middleware)
      .concat(filesApi.middleware)
      .concat(productPhotosApi.middleware)
      .concat(shopsApi.middleware)
      .concat(slidersApi.middleware)
      .concat(productPropertyValuesApi.middleware)
      .concat(developersApi.middleware)
      .concat(categoryPropertiesApi.middleware)
      .concat(propValuesApi.middleware)

})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch