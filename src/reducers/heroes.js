const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	heroSelected: {},
}

const heroes = (state = initialState, action) => {
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

export default heroes
