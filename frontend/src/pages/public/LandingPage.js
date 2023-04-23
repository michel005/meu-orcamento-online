import { LandingPageFooter } from 'components/organism/LandingPageFooter'
import { LandingPageHeader } from 'components/organism/LandingPageHeader'
import { ModalManager } from 'components/organism/ModalManager'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ContactPage } from './ContactPage'
import { HomePage } from './HomePage'
import { LandingPageStyle } from './LandingPageStyle'
import { NotFoundPage } from './NotFoundPage'
import { PlanPage } from './PlanPage'
import { PlanDetailPage } from './PlanDetailPage'
import { LoginPage } from './LoginPage'

export const LandingPage = () => {
	const [showTopBtn, setShowTopBtn] = useState(false)

	const goToTop = () => {
		document.getElementById('root').scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		document.getElementById('root').addEventListener('scroll', (e) => {
			if (e.target.scrollTop > 200) {
				setShowTopBtn(true)
			} else {
				setShowTopBtn(false)
			}
		})
	}, [])

	return (
		<LandingPageStyle>
			<LandingPageHeader />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/plans" element={<PlanPage />} />
				<Route path="/plans/:plan" element={<PlanDetailPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			{showTopBtn && (
				<button className="buttonToTop" data-icon="keyboard_double_arrow_up" onClick={goToTop} />
			)}
			<LandingPageFooter />
			<ModalManager />
		</LandingPageStyle>
	)
}
