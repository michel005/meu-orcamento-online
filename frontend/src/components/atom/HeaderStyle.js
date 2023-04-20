import styled from 'styled-components'

export const HeaderStyle = styled.header`
	display: flex;
	flex-direction: row;
	height: var(--LANDING-PAGE-HEADER-HEIGHT);
	justify-content: center;

	& > .centered {
		display: flex;
		flex-direction: row;
		width: var(--CENTERED-MAX-WIDTH);

		& > .nameLogo {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		& > .rightContent {
			display: flex;
			flex-direction: row;
			flex-grow: 1;
			gap: 21px;
			justify-content: flex-end;
			margin-block: auto;

			& > a {
				color: #999;
				font-size: 16px;
				font-weight: bold;
				margin-block: auto;

				&:hover {
					color: #666;
				}

				&.active {
					color: #111;
				}
			}

			.button {
				background-color: var(--ACTIVE_COLOR);
				border-radius: 7px;
				color: #fff;
				opacity: 1;
				padding: 10px 17px;
				transition: all 0.25s;

				&:hover {
					color: #fff;
					opacity: 0.8;
				}

				&.active {
					color: #fff;
				}
			}
		}
	}

	&[data-fixed] {
		background-color: #fff;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 100;
	}

	@media (max-width: 1200px) {
		background-color: #fff;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;

		& > .centered {
			padding-inline: 14px;

			& > .rightContent {
				display: none;
			}
		}
	}
`
