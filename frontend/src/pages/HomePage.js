import { Assets } from 'assets/Assets'
import { Gallery } from 'components/atom/Gallery'
import { LeftRightSide } from 'components/atom/LeftRightSide'
import { Photo } from 'components/atom/Photo'
import { PROJECT_INFO } from 'config/ProjectInfo'

export const HomePage = () => {
	return (
		<>
			<LeftRightSide
				left={
					<>
						<h1>A solução completa para o seu restaurante</h1>
						<p>
							Ad dolore magna cillum mollit in Lorem laborum et ex elit velit cillum. Reprehenderit
							enim et duis do. Nulla qui consectetur velit cillum laborum sunt labore.
						</p>
						<p>
							Exercitation elit cupidatat velit elit. Et Lorem ut laborum qui ipsum voluptate Lorem
							laboris in ex ex. Labore elit duis Lorem officia pariatur ullamco.
						</p>
						<div className="buttons">
							<button>Solicitar orçamento</button>
						</div>
					</>
				}
				right={
					<>
						<Photo src="https://i.pinimg.com/564x/04/be/f6/04bef61884051d5695ad0d2ce37632f2.jpg" />
					</>
				}
			/>
			<Gallery
				header={`Tenha muitas vantagens com o ${PROJECT_INFO.name}`}
				content="Irure ut elit aliqua officia excepteur in nostrud laborum laboris duis laborum. Velit reprehenderit do laborum officia nisi cupidatat officia cupidatat dolor. Mollit sunt consectetur commodo occaecat in dolor minim. Ea non fugiat veniam ullamco labore irure ex sint est veniam sint reprehenderit sint. Consequat consequat duis consectetur incididunt minim. Duis fugiat labore ea pariatur veniam veniam laboris enim excepteur ex. Nulla est velit pariatur ipsum minim nulla exercitation."
				photos={[
					Assets.carro_landscape,
					Assets.sample1,
					Assets.sample2,
					Assets.sample3,
					Assets.sample4,
				]}
			/>
		</>
	)
}
