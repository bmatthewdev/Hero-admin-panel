import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'

const filterAdapter = createEntityAdapter()
const initialState = filterAdapter.getInitialState({
	filtersLoadingStatus: 'idle',
	filterSelected: 'all',
})

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	({ request }) => {
		return request('http://localhost:3000/filters')
	}
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filterChanged: (state, action) => {
			state.filterSelected = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, (state) => {
				state.filtersLoadingStatus = 'loading'
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filtersLoadingStatus = 'success'
				filterAdapter.setAll(state, action.payload)
			})
			.addCase(fetchFilters.rejected, (state) => {
				state.filtersLoadingStatus = 'error'
			})
	},
})

const { actions, reducer } = filtersSlice
export default reducer
export const { selectAll } = filterAdapter.getSelectors(
	(state) => state.filters
)
export const {
	filtersFetching,
	filtersFetched,
	filtersFetchingError,
	filterChanged,
} = actions
