import { LandingPageFooter } from 'components/molecule/LandingPageFooter'
import { LandingPageHeader } from 'components/molecule/LandingPageHeader'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './HomePage'
import { LandingPageStyle } from './LandingPageStyle'

export const LandingPage = () => {
	return (
		<LandingPageStyle>
			<LandingPageHeader />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</main>
			<LandingPageFooter />
		</LandingPageStyle>
	)
}
