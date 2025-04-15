const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	heroSelected: {},
	filters: [],
	filtersLoadingStatus: 'idle',
	filterSelected: 'all',
	error: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading',
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroesLoadingStatus: 'success',
				heroes: action.payload,
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			}
		case 'FILTERS_FETCHING':
			return {
				...state,
				filtersLoadingStatus: 'loading',
			}
		case 'FILTERS_FETCHED':
			return {
				...state,
				filtersLoadingStatus: 'success',
				filters: action.payload,
			}
		case 'FILTERS_FETCHING_ERROR':
			return {
				...state,
				filtersLoadingStatus: 'error',
			}
		case 'FILTER_CHANGED':
			return {
				...state,
				filterSelected: action.payload,
			}
		case 'HERO_FILTERED':
			return {
				...state,
				heroes: action.payload,
			}
		case 'HERO_DELETED':
			return {
				...state,
				heroSelected: {},
				heroes: state.heroes.filter((hero) => hero.id !== action.payload),
			}
		case 'HERO_CREATED':
			return {
				...state,
				heroes: [...state.heroes, action.payload],
			}
		case 'HERO_SELECTED':
			return {
				...state,
				heroSelected: action.payload,
			}
		case 'HERO_UPDATED':
			return {
				...state,
				heroSelected: {},
				heroes: state.heroes.map((hero) =>
					hero.id === action.payload.id ? action.payload : hero
				),
			}
		default:
			return state
	}
}

export default reducer
