import { LandingPageTemplate } from 'components/template/LandingPageTemplate'
import { PLAN_PAGE } from 'localization/PlanPage'

export const PlanPage = () => {
	return (
		<LandingPageTemplate
			loc={PLAN_PAGE}
			events={[{ cards: [() => alert('Card 1'), () => alert('Card 2')] }]}
		/>
	)
}
