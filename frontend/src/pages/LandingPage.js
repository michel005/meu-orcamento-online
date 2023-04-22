import { LandingPageFooter } from 'components/organism/LandingPageFooter'
import { LandingPageHeader } from 'components/organism/LandingPageHeader'
import { Route, Routes } from 'react-router-dom'
import { ContactPage } from './ContactPage'
import { HomePage } from './HomePage'
import { LandingPageStyle } from './LandingPageStyle'
import { PlanPage } from './PlanPage'

export const LandingPage = () => {
	return (
		<LandingPageStyle>
			<LandingPageHeader />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/plans" element={<PlanPage />} />
				<Route path="/contact" element={<ContactPage />} />
			</Routes>
			<LandingPageFooter />
		</LandingPageStyle>
	)
}
