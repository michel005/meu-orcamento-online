import styled from 'styled-components'

export const HeaderStyle = styled.header`
	background-color: #fff;
	display: flex;
	flex-direction: row;
	height: var(--LANDING-PAGE-HEADER-HEIGHT);
	min-height: var(--LANDING-PAGE-HEADER-HEIGHT);
	justify-content: center;
	z-index: 100;

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

		& > .buttonContainer {
			display: none;
			flex-direction: row;
			justify-content: flex-end;
			flex-grow: 1;
			margin-right: 8px;
			z-index: 100;

			.menuButton {
				font-size: 22px;
				font-weight: bold;
			}
		}
	}

	&[data-fixed] {
		background-color: #fff;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 101;
	}

	@media (max-width: 1200px) {
		& > .centered {
			padding-inline: 14px;
		}
	}

	@media (max-width: 700px) {
		& > .centered {
			& > .rightContent {
				background-color: #fff;
				backdrop-filter: blur(10px);
				border-radius: 14px;
				box-shadow: #ccc 0 0 4px;
				flex-direction: column;
				justify-content: flex-start;
				opacity: 0;
				padding: 50px 14px 14px;
				pointer-events: none;
				position: absolute;
				right: 10px;
				top: 10px;
				transition: all 0.25s;
				z-index: 100;

				&[data-show='true'] {
					opacity: 1;
					pointer-events: all;
				}

				& > a {
					margin: 0;
				}
			}

			& > .buttonContainer {
				display: flex;
			}
		}
	}
`
