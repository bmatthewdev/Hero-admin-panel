import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore as createStore,
} from 'redux'
import { thunk } from 'redux-thunk'
import filters from '../reducers/filters'
import heroes from '../reducers/heroes'

const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === 'string') {
		return dispatch({
			type: action,
		})
	}
	return dispatch(action)
}

const store = createStore(
	combineReducers({
		heroes,
		filters,
	}),
	compose(
		applyMiddleware(thunk, stringMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store
