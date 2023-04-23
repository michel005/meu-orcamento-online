import styled from 'styled-components'

export const FooterStyle = styled.footer`
	background-color: var(--ACTIVE_COLOR);
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding-block: 28px 70px;
	position: relative;
	width: 100%;

	& > .centeredFooter {
		display: flex;
		flex-direction: row;
		gap: 35px;
		width: var(--CENTERED-MAX-WIDTH);

		& > .appInformation {
			display: flex;
			flex-direction: column;
			gap: 10px;
			margin-right: 100px;
			position: relative;
			width: 40%;

			img {
				filter: grayscale(1) invert(1);
			}

			span {
				color: #fff !important;
			}

			p {
				color: #fffc;
				font-size: 14px;
			}
		}

		& > .topic {
			display: flex;
			flex-direction: column;
			gap: 21px;
			flex-grow: 1;

			& > h3 {
				color: #fff;
				font-size: 16px;
			}

			& > .items {
				display: flex;
				flex-direction: column;
				gap: 4px;

				a {
					color: #fffc;
					font-size: 14px;

					&:hover {
						color: #fff;
					}
				}
			}
		}
	}

	@media (max-width: 1200px) {
		--CENTERED-MAX-WIDTH: 100%;

		flex-direction: column;

		& > .centeredFooter {
			flex-direction: column;
			text-align: center;
			width: 100%;

			& > .appInformation {
				margin: 0;
				width: 100%;

				& > div {
					margin-inline: auto;
				}

				p {
					padding-inline: 14px;
				}
			}
		}
	}
`
