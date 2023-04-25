import { Assets } from 'assets/Assets'
import { LandingPageTemplate } from 'components/template/LandingPageTemplate'
import { HOME_PAGE } from 'localization/HomePage'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
	const navigate = useNavigate()

	return (
		<>
			<LandingPageTemplate
				background={`url(https://i.pinimg.com/564x/04/be/f6/04bef61884051d5695ad0d2ce37632f2.jpg)`}
				loc={HOME_PAGE}
				events={{
					showMoreDetails: () => {
						navigate('/plans')
					},
				}}
			/>
		</>
	)
}
