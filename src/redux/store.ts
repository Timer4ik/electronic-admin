import { categoriesApi } from '@/redux/services/categories'
import { propertyTypesApi } from '@/redux/services/propertyTypes'
import { filesApi } from '@/redux/services/filesApi'
import { developersApi } from '@/redux/services/developersApi'
import { propertiesApi } from '@/redux/services/properties'
import { categoryPropertiesApi } from '@/redux/services/categoryPropertiesApi'
import { productsApi } from '@/redux/services/productsApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [propertyTypesApi.reducerPath]: propertyTypesApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [categoryPropertiesApi.reducerPath]: categoryPropertiesApi.reducer,
    [developersApi.reducerPath]: developersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(propertyTypesApi.middleware)
      .concat(productsApi.middleware)
      .concat(filesApi.middleware)
      .concat(developersApi.middleware)
      .concat(categoryPropertiesApi.middleware)
      .concat(propertiesApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch