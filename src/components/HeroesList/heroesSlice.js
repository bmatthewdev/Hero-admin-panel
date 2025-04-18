import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'

const heroesAdapter = createEntityAdapter()
const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle',
	heroSelected: {},
})

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
			heroesAdapter.addOne(state, action.payload)
		},
		heroDeleted: (state, action) => {
			state.heroSelected = {}
			heroesAdapter.removeOne(state, action.payload)
		},
		heroSelected: (state, action) => {
			state.heroSelected = action.payload
		},
		heroUpdated: (state, action) => {
			state.heroSelected = {}
			heroesAdapter.updateOne(state, {
				id: action.payload.id,
				changes: action.payload,
			})
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = 'loading'
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = 'success'
				heroesAdapter.setAll(state, action.payload)
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = 'error'
			})
			.addDefaultCase(() => {})
	},
})

const { actions, reducer } = heroesSlice
export default reducer
export const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes)
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
