import { categoriesApi } from '@/redux/services/categoriesApi'
import { filesApi } from '@/redux/services/filesApi'
import { developersApi } from '@/redux/services/developersApi'
import { propertiesApi } from '@/redux/services/propertiesApi'
import { propValuesApi } from '@/redux/services/propValuesApi'
import { productPhotosApi } from '@/redux/services/productPhotosApi'
import { categoryPropertiesApi } from '@/redux/services/categoryPropertiesApi'
import { productsApi } from '@/redux/services/productsApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [categoryPropertiesApi.reducerPath]: categoryPropertiesApi.reducer,
    [productPhotosApi.reducerPath]: productPhotosApi.reducer,
    [developersApi.reducerPath]: developersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [propValuesApi.reducerPath]: propValuesApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(productsApi.middleware)
      .concat(propertiesApi.middleware)
      .concat(filesApi.middleware)
      .concat(productPhotosApi.middleware)
      .concat(developersApi.middleware)
      .concat(categoryPropertiesApi.middleware)
      .concat(propValuesApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch