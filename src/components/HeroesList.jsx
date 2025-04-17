import Error from './Error'
import HeroesListItem from './HeroesListItem'
import Spinner from './Spinner'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchHeroes,
	heroDeleted,
	heroFiltered,
	heroSelected,
} from '../actions/index.js'
import { useHttp } from '../hooks/http.hook'

const HeroesList = () => {
	const heroes = useSelector((state) => state.heroes.heroes)
	const heroesLoadingStatus = useSelector(
		(state) => state.heroes.heroesLoadingStatus
	)
	const filterSelected = useSelector((state) => state.filters.filterSelected)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		onMount()
	}, [])

	useEffect(() => {
		onFilter(filterSelected)
	}, [filterSelected])

	const onMount = () => {
		dispatch(fetchHeroes(request))
	}

	const onDelete = (heroId) => {
		request(`http://localhost:3000/heroes/${heroId}`, 'DELETE')
			.then(() => dispatch(heroDeleted(heroId)))
			.catch((e) => console.error(e))
	}

	const onSelect = (heroId) => {
		request(`http://localhost:3000/heroes/${heroId}`)
			.then((data) => dispatch(heroSelected(data)))
			.catch((e) => console.error(e))
	}

	const onFilter = (filterSelected) => {
		request(
			`http://localhost:3000/heroes?${
				filterSelected === 'all' ? '' : `${`element=${filterSelected}`}`
			}`
		)
			.then((data) => dispatch(heroFiltered(data)))
			.catch((e) => console.error(e))
	}

	return (
		<div>
			{heroesLoadingStatus === 'loading' && <Spinner />}
			{heroesLoadingStatus === 'error' && <Error />}
			{heroesLoadingStatus === 'success' &&
				(heroes.length > 0 ? (
					heroes.map(({ id, ...props }) => (
						<HeroesListItem
							handleDelete={() => onDelete(id)}
							handleSelect={() => onSelect(id)}
							key={id}
							{...props}
						/>
					))
				) : (
					<h5 className='text-center mt-5'>Героев пока нет</h5>
				))}
		</div>
	)
}

export default HeroesList
