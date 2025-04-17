const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching())
	request('http://localhost:3000/heroes')
		.then((data) => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}

const fetchFilters = function (request) {
	return function (dispatch) {
		dispatch(filtersFetching())
		request('http://localhost:3000/filters')
			.then((data) => dispatch(filtersFetched(data)))
			.catch(() => dispatch(filtersFetchingError()))
	}
}

const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING',
	}
}

const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes,
	}
}

const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR',
	}
}

const filtersFetching = () => {
	return {
		type: 'FILTERS_FETCHING',
	}
}

const filtersFetched = (filters) => {
	return {
		type: 'FILTERS_FETCHED',
		payload: filters,
	}
}

const filtersFetchingError = () => {
	return {
		type: 'FILTERS_FETCHING_ERROR',
	}
}

const filterChanged = (filter) => {
	return {
		type: 'FILTER_CHANGED',
		payload: filter,
	}
}

const heroFiltered = (heroes) => ({
	type: 'HERO_FILTERED',
	payload: heroes,
})

const heroDeleted = (heroId) => ({
	type: 'HERO_DELETED',
	payload: heroId,
})

const heroCreated = (hero) => ({
	type: 'HERO_CREATED',
	payload: hero,
})

const heroSelected = (hero) => ({
	type: 'HERO_SELECTED',
	payload: hero,
})

const heroUpdated = (hero) => ({
	type: 'HERO_UPDATED',
	payload: hero,
})

export {
	fetchFilters,
	fetchHeroes,
	filterChanged,
	heroCreated,
	heroDeleted,
	heroFiltered,
	heroSelected,
	heroUpdated,
}
