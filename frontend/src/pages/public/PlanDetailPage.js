import { LandingPageTemplate } from 'components/template/LandingPageTemplate'
import { PLAN_PAGE } from 'localization/PlanPage'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const PlanDetailPage = () => {
	const navigate = useNavigate()
	const params = useParams()

	const selectedPlan = PLAN_PAGE()[0]?.cards?.[parseInt(params.plan) - 1]

	useEffect(() => {
		if (!PLAN_PAGE()[0]?.cards?.[parseInt(params.plan) - 1]) {
			navigate('/plans')
		}
		document.getElementById('root').scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [navigate, params.plan])

	return (
		<LandingPageTemplate
			loc={() => [
				{
					type: 'container',
					content: (
						<div>
							<button
								data-link
								data-icon="arrow_back"
								onClick={() => {
									navigate('/plans')
								}}
							>
								Voltar
							</button>
						</div>
					),
					master: {
						type: 'right_block',
						variation: 'modal',
						content: (
							<>
								<h1>{selectedPlan?.header}</h1>
								{selectedPlan?.content}
							</>
						),
						photo: selectedPlan?.photo,
					},
				},
			]}
		/>
	)
}
