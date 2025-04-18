import Error from '../Error.jsx'
import HeroesListItem from '../HeroesListItem'
import Spinner from '../Spinner.jsx'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/http.hook.js'
import {
	fetchHeroes,
	heroDeleted,
	heroSelected,
	selectAll,
} from './heroesSlice.js'

const HeroesList = () => {
	const heroes = useSelector(selectAll)
	const heroesLoadingStatus = useSelector(
		(state) => state.heroes.heroesLoadingStatus
	)
	const filterSelected = useSelector((state) => state.filters.filterSelected)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		onMount()
	}, [filterSelected])

	const onMount = () => {
		dispatch(fetchHeroes({ request, filterSelected }))
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
