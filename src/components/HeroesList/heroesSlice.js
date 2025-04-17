import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	heroSelected: {},
}

export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	({ request, filterSelected }) => {
		const query = filterSelected === 'all' ? '' : `?element=${filterSelected}`

		return request(`http://localhost:3000/heroes${query}`)
	}
)

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroCreated: (state, action) => {
			state.heroes.push(action.payload)
		},
		heroDeleted: (state, action) => {
			state.heroSelected = {}
			state.heroes = state.heroes.filter((hero) => hero.id !== action.payload)
		},
		heroSelected: (state, action) => {
			state.heroSelected = action.payload
		},
		heroUpdated: (state, action) => {
			state.heroSelected = {}
			state.heroes = state.heroes.map((hero) =>
				hero.id === action.payload.id ? action.payload : hero
			)
		},
		heroesFiltered: (state, action) => {
			state.heroes = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = 'loading'
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = 'success'
				state.heroes = action.payload
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = 'error'
			})
			.addDefaultCase(() => {})
	},
})

const { actions, reducer } = heroesSlice
export default reducer
export const {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	heroCreated,
	heroDeleted,
	heroSelected,
	heroUpdated,
	heroesFiltered,
} = actions
