import styled from 'styled-components'

export const LandingPageTemplateStyle = styled.main`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: flex-start;
	gap: 50px;
	margin-inline: auto;
	padding-block: 35px;
	width: var(--CENTERED-MAX-WIDTH);

	&::before {
		background-color: #eee;
		background-image: var(--BACKGROUND-IMAGE);
		background-position: center;
		background-size: cover;
		content: '';
		left: 0;
		position: absolute;
		top: 0;
		height: 75%;
		width: 100%;
		z-index: 0;
	}

	&[data-background='false']::before {
		content: none;
	}

	@media (max-width: 1200px) {
		--CENTERED-MAX-WIDTH: 100%;
		gap: 35px;
		padding-inline: 21px;
	}
`
