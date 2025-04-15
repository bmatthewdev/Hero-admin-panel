import HeroesFilters from './HeroesFilters'
import HeroesForm from './HeroesForm'
import HeroesList from './HeroesList'

const App = () => (
	<main className='app'>
		<div className='content'>
			<HeroesList />
			<div className='content__interactive'>
				<HeroesForm />
				<HeroesFilters />
			</div>
		</div>
	</main>
)

export default App
