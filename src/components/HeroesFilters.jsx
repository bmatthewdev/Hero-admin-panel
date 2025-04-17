import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilters, filterChanged } from '../actions'
import { useHttp } from '../hooks/http.hook'
import Spinner from './Spinner'

const HeroesFilters = () => {
	const dispatch = useDispatch()
	const filters = useSelector((state) => state.filters.filters)
	const filterSelected = useSelector((state) => state.filters.filterSelected)
	const filtersLoadingStatus = useSelector(
		(state) => state.filters.filtersLoadingStatus
	)
	const { request } = useHttp()

	useEffect(() => {
		onMount()
	}, [])

	const onMount = () => {
		dispatch(fetchFilters(request))
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
