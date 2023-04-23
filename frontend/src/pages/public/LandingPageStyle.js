import styled from 'styled-components'

export const LandingPageStyle = styled.div`
	--LANDING-PAGE-HEADER-HEIGHT: 70px;
	--CENTERED-MAX-WIDTH: 1200px;

	display: flex;
	flex-direction: column;
	height: 100%;
	min-height: 100%;
	position: relative;

	& > .buttonToTop {
		background-color: #333;
		border-radius: 50%;
		bottom: 10px;
		height: 40px;
		position: fixed;
		right: 10px;
		width: 40px;
		z-index: 100;
	}
`
