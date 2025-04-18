import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'

const heroesAdapter = createEntityAdapter()
const initialState = heroesAdapter.getInitialState({
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
		},
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
