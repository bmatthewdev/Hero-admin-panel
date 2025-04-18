import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import filters from '../components/HeroesFilters/filtersSlice'
import heroes from '../components/HeroesList/heroesSlice'

const store = configureStore({
	reducer: {
		heroes,
		filters,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
