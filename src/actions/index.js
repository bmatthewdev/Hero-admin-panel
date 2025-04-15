export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING',
	}
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes,
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR',
	}
}

export const filtersFetching = () => {
	return {
		type: 'FILTERS_FETCHING',
	}
}

export const filtersFetched = (filters) => {
	return {
		type: 'FILTERS_FETCHED',
		payload: filters,
	}
}

export const filtersFetchingError = () => {
	return {
		type: 'FILTERS_FETCHING_ERROR',
	}
}

export const filterChanged = (filter) => {
	return {
		type: 'FILTER_CHANGED',
		payload: filter,
	}
}

export const heroFiltered = (heroes) => ({
	type: 'HERO_FILTERED',
	payload: heroes,
})

export const heroDeleted = (heroId) => ({
	type: 'HERO_DELETED',
	payload: heroId,
})

export const heroCreated = (hero) => ({
	type: 'HERO_CREATED',
	payload: hero,
})

export const heroSelected = (hero) => ({
	type: 'HERO_SELECTED',
	payload: hero,
})

export const heroUpdated = (hero) => ({
	type: 'HERO_UPDATED',
	payload: hero,
})
