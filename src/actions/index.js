import {
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
} from '../components/HeroesFilters/filtersSlice'

const fetchFilters = function (request) {
	return function (dispatch) {
		dispatch(filtersFetching())
		request('http://localhost:3000/filters')
			.then((data) => dispatch(filtersFetched(data)))
			.catch(() => dispatch(filtersFetchingError()))
	}
}

export { fetchFilters }
