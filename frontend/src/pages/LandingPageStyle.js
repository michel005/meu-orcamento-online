import styled from 'styled-components'

export const LandingPageStyle = styled.div`
	--LANDING-PAGE-HEADER-HEIGHT: 70px;
	--CENTERED-MAX-WIDTH: 1200px;

	display: flex;
	flex-direction: column;

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 150px;
		margin-inline: auto;
		padding: 100px 0;
		width: var(--CENTERED-MAX-WIDTH);
	}

	@media (max-width: 1200px) {
		--CENTERED-MAX-WIDTH: 100%;

		main {
			gap: 50px;
			padding-inline: 28px;
		}
	}
`
