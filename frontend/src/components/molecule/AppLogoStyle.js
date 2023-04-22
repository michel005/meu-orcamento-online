import styled from 'styled-components'

export const AppLogoStyle = styled.div`
	--LOGO-SIZE: 46px;

	display: flex;
	flex-direction: row;
	gap: 7px;

	& > img {
		height: var(--LOGO-SIZE);
		margin: auto 0;
		object-fit: fill;
		transition: all 0.25s;
		width: var(--LOGO-SIZE);
	}

	& > .appName {
		display: flex;
		flex-direction: column;
		margin: auto 0;

		.name {
			color: #222;
			font-size: 20px;
			font-weight: bold;
		}

		.accent {
			color: var(--ACTIVE_COLOR);
		}

		.description {
			color: #aaa;
			font-size: 12px;
			margin-top: -2px;
		}
	}

	&[data-enable-click='true']:hover {
		cursor: pointer;
		& > img {
			rotate: -25deg;
			scale: 1.1;
		}

		& > .appName {
			.name {
				color: #000;
			}

			.description {
				color: #999;
			}
		}
	}
`
