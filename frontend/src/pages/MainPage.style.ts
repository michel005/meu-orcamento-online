import styled from 'styled-components'

export const MainPageStyle = styled.main`
	background-color: #fff;
	display: flex;
	flex-direction: row;
	height: 100%;
	inset: 0;
	position: absolute;
	width: 100%;

	& > nav {
		align-items: center;
		background-color: #222;
		display: flex;
		flex-direction: column;
		gap: 7px;
		padding: 7px;

		& > a {
			border-radius: var(--border-radius);
			color: #fff4;
			display: flex;
			flex-direction: row;
			gap: 7px;
			height: 48px;
			justify-content: center;
			padding-block-start: 4px;
			transition: all 0.25s;
			width: 48px;

			&:hover {
				background-color: #fff1;
				color: #fff;
			}

			&::before {
				align-self: center;
				color: inherit;
				content: attr(data-icon);
				font-size: 1.2em;
				font-family: 'Material Symbols Outlined';
				font-weight: normal;
				transform: translateY(-2px);
			}

			&.active {
				background-color: var(--active-color);
				color: #fff;
			}
		}

		&.subOptions {
			align-items: flex-start;
			background-color: #323232;
			color: #fff;
			display: flex;
			flex-direction: column;
			gap: 14px;
			padding: 14px;
			text-align: left;
			width: 250px;

			header {
				display: flex;
				flex-direction: column;
				gap: 4px;

				h2 {
					padding-block-start: 4px;
				}

				small {
					color: #fff6;
				}
			}

			button {
				justify-content: center;
				width: 100%;
			}
		}
	}

	& > main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 7px;
		overflow-y: auto;
		position: relative;

		&::-webkit-scrollbar {
			width: 0;
		}

		& > section {
			display: flex;
			flex-direction: column;
			gap: 14px;
			padding: 14px;
			z-index: 100;

			& > * {
				animation: fadeOut 0.5s linear;
			}
		}
	}
`
