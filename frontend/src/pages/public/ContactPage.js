import { LandingPageTemplate } from 'components/template/LandingPageTemplate'
import { CONTACT_PAGE } from 'localization/ContactPage'
import { useState } from 'react'

export const ContactPage = () => {
	const [form, setForm] = useState({})

	return (
		<LandingPageTemplate
			loc={CONTACT_PAGE}
			events={{
				...form,
				onEmailChange: (x) =>
					setForm((f) => {
						f.email = x
						return { ...f }
					}),
				onSubmitChange: (x) =>
					setForm((f) => {
						f.submit = x
						return { ...f }
					}),
				onMessageChange: (x) =>
					setForm((f) => {
						f.message = x
						return { ...f }
					}),
			}}
		/>
	)
}
