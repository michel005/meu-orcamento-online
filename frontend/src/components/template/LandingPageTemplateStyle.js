import styled from 'styled-components'

export const LandingPageTemplateStyle = styled.main`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: flex-start;
	gap: 100px;
	margin-inline: auto;
	padding-block: 35px;
	width: var(--CENTERED-MAX-WIDTH);

	@media (max-width: 1200px) {
		--CENTERED-MAX-WIDTH: 100%;
		gap: 50px;
		padding-inline: 28px;
	}
`
