import { LandingPageTemplate } from 'components/template/LandingPageTemplate'
import { PLAN_PAGE } from 'localization/PlanPage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const PlanPage = () => {
	const navigate = useNavigate()

	useEffect(() => {
		document.getElementById('root').scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	return (
		<LandingPageTemplate
			loc={PLAN_PAGE}
			events={{
				plan1: () => {
					navigate('/plans/1')
				},
				plan2: () => {
					navigate('/plans/2')
				},
				plan3: () => {
					navigate('/plans/3')
				},
			}}
		/>
	)
}
