import { LandingPageTemplate } from 'components/template/LandingPageTemplate'
import { LOGIN } from 'localization/LoginPage'
import { useState } from 'react'

export const LoginPage = () => {
	const [login, setLogin] = useState({})
	const [showPassword, setShowPassword] = useState(false)

	return (
		<LandingPageTemplate
			loc={LOGIN}
			events={{
				showPassword,
				email: login?.email,
				onEmailChange: (e) =>
					setLogin((x) => {
						x.email = e
						return { ...x }
					}),
				password: login?.password,
				onPasswordChange: (e) =>
					setLogin((x) => {
						x.password = e
						return { ...x }
					}),
				signIn: () => {
					setShowPassword(true)
				},
				back: () => {
					setShowPassword(false)
				},
			}}
		/>
	)
}
