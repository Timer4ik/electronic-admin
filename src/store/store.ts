import { categoriesApi } from '@/api/categories'
import { propertyTypesApi } from '@/api/propertyTypes'
import { filesApi } from '@/api/filesApi'
import { developersApi } from '@/api/developersApi'
import { propertiesApi } from '@/api/properties'
import { categoryPropertiesApi } from '@/api/categoryPropertiesApi'
import { productsApi } from '@/api/productsApi'
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [propertyTypesApi.reducerPath]: propertyTypesApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [categoryPropertiesApi.reducerPath]: categoryPropertiesApi.reducer,
    [developersApi.reducerPath]: developersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
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

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch