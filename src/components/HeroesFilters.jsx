import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	filterChanged,
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
} from '../actions'
import { useHttp } from '../hooks/http.hook'
import Spinner from './Spinner'

const HeroesFilters = () => {
	const dispatch = useDispatch()
	const filters = useSelector((state) => state.filters)
	const filterSelected = useSelector((state) => state.filterSelected)
	const filtersLoadingStatus = useSelector(
		(state) => state.filtersLoadingStatus
	)
	const { request } = useHttp()

	useEffect(() => {
		onMount()
	}, [])

	const onMount = () => {
		dispatch(filtersFetching())
		request('http://localhost:3000/filters')
			.then((data) => dispatch(filtersFetched(data)))
			.catch(() => dispatch(filtersFetchingError()))
	}

	return (
		<div className='card shadow-lg mt-4'>
			<div className='card-body'>
				{filtersLoadingStatus === 'loading' && <Spinner />}
				{filtersLoadingStatus === 'error' && <Error />}
				{filtersLoadingStatus === 'success' && (
					<>
						<p className='card-text'>Отфильтруйте героев по элементам</p>
						{filters.length > 0 ? (
							<>
								<ul className='btn-group'>
									{filters.map(({ className, name, label, id }) => (
										<li key={id}>
											<button
												onClick={() => dispatch(filterChanged(name))}
												className={`btn ${className} ${
													filterSelected === name ? 'active' : ''
												}`}
											>
												{label}
											</button>
										</li>
									))}
								</ul>
							</>
						) : (
							<h6 className='mt-4 font-sm'>Фильтров пока нет</h6>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default HeroesFilters
