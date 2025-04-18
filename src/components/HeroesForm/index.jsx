import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import {
	useCreateHeroMutation,
	useUpdateHeroMutation,
} from '../../api/apiSlice.js'
import { selectAll } from '../HeroesFilters/filtersSlice.js'
import { heroUpdated } from '../HeroesList/heroesSlice.js'

const HeroesForm = () => {
	const [createHero, { isLoading: isCreating }] = useCreateHeroMutation()
	const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation()

	const dispatch = useDispatch()

	const heroSelected = useSelector((state) => state.heroes.heroSelected)
	const filters = useSelector(selectAll)
	const [formValues, setFormValues] = useState({
		name: '',
		description: '',
		element: '',
	})

	useEffect(() => {
		onMount()
	}, [heroSelected])

	const onMount = () => {
		if (heroSelected && heroSelected.id) {
			setFormValues({
				name: heroSelected.name,
				description: heroSelected.description,
				element: heroSelected.element,
			})
		} else {
			setFormValues({ name: '', description: '', element: '' })
		}
	}

	const onSubmit = (formData) => {
		const hero = {
			id: heroSelected.id || uuid(),
			...Object.fromEntries(formData),
		}

		heroSelected.id
			? updateHero(hero)
					.unwrap()
					.then(() => dispatch(heroUpdated()))
			: createHero(hero)
					.unwrap()
					.then(() => dispatch(heroUpdated()))
		setFormValues({ name: '', description: '', element: '' })
	}

	return (
		<form action={onSubmit} className='border p-4 shadow-lg rounded'>
			<div className='mb-3'>
				<label htmlFor='name' className='form-label fs-4'>
					Имя нового героя
				</label>
				<input
					required
					type='text'
					name='name'
					className='form-control'
					id='name'
					placeholder='Как меня зовут?'
					value={formValues.name}
					onChange={(e) =>
						setFormValues({ ...formValues, name: e.target.value })
					}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='description' className='form-label fs-4'>
					Описание
				</label>
				<textarea
					required
					name='description'
					className='form-control'
					id='description'
					placeholder='Что я умею?'
					style={{ height: '130px' }}
					value={formValues.description}
					onChange={(e) =>
						setFormValues({ ...formValues, description: e.target.value })
					}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='element' className='form-label'>
					Выбрать элемент героя
				</label>
				<select
					required
					className='form-select'
					id='element'
					name='element'
					value={formValues.element}
					onChange={(e) =>
						setFormValues({ ...formValues, element: e.target.value })
					}
				>
					<option>Я владею элементом...</option>
					{filters.map(({ name, id, label }) => {
						if (name === 'all') return null

						return (
							<option key={id} value={name}>
								{label}
							</option>
						)
					})}
				</select>
			</div>

			<button
				type='submit'
				className='btn btn-primary'
				disabled={isCreating || isUpdating}
			>
				{heroSelected.id ? 'Сохранить' : 'Создать'}
			</button>
		</form>
	)
}

export default HeroesForm
