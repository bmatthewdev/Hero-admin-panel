import { configureStore } from '@reduxjs/toolkit'
import filters from '../components/HeroesFilters/filtersSlice'
import heroes from '../components/HeroesList/heroesSlice'

const store = configureStore({
	reducer: {
		heroes,
		filters,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
