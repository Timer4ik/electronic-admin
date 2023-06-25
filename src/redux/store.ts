import { categoriesApi } from '@/redux/services/categoriesApi'
import { filesApi } from '@/redux/services/filesApi'
import { developersApi } from '@/redux/services/developersApi'
import { propertiesApi } from '@/redux/services/propertiesApi'
import { propValuesApi } from '@/redux/services/propValuesApi'
import { productPropertyValuesApi } from '@/redux/services/productPropertyValuesApi'
import { productPhotosApi } from '@/redux/services/productPhotosApi'
import { slidersApi } from '@/redux/services/slidersApi'
import { categoryPropertiesApi } from '@/redux/services/categoryPropertiesApi'
import { productsApi } from '@/redux/services/productsApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import loaderReducer from "./slices/loaderSlice"
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    loader:loaderReducer,
    auth:authReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [categoryPropertiesApi.reducerPath]: categoryPropertiesApi.reducer,
    [productPhotosApi.reducerPath]: productPhotosApi.reducer,
    [developersApi.reducerPath]: developersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [propValuesApi.reducerPath]: propValuesApi.reducer,
    [productPropertyValuesApi.reducerPath]: productPropertyValuesApi.reducer,
    [slidersApi.reducerPath]: slidersApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(productsApi.middleware)
      .concat(propertiesApi.middleware)
      .concat(filesApi.middleware)
      .concat(productPhotosApi.middleware)
      .concat(slidersApi.middleware)
      .concat(productPropertyValuesApi.middleware)
      .concat(developersApi.middleware)
      .concat(categoryPropertiesApi.middleware)
      .concat(propValuesApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch