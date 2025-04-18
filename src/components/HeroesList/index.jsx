import Error from '../Error.jsx'
import HeroesListItem from '../HeroesListItem'
import Spinner from '../Spinner.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { useDeleteHeroMutation, useGetHeroesQuery } from '../../api/apiSlice.js'
import { useHttp } from '../../hooks/http.hook.js'
import { heroSelected } from './heroesSlice.js'

const HeroesList = () => {
	const filterSelected = useSelector((state) => state.filters.filterSelected)
	const {
		data: heroes,
		isLoading,
		isSuccess,
		isError,
	} = useGetHeroesQuery(filterSelected)
	const [deleteHero] = useDeleteHeroMutation()

	const { request } = useHttp()
	const dispatch = useDispatch()

	const onDelete = (heroId) => {
		deleteHero(heroId).unwrap()
	}

	const onSelect = (heroId) => {
		request(`http://localhost:3000/heroes/${heroId}`)
			.then((data) => dispatch(heroSelected(data)))
			.catch((e) => console.error(e))
	}

	return (
		<div>
			{isLoading && <Spinner />}
			{isError && <Error />}
			{isSuccess &&
				(heroes?.length > 0 ? (
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
