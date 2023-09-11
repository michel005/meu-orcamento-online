import styled from 'styled-components'

export const MainPageStyle = styled.main`
	--sub-menu-width: 300px;

	background-color: #fff;
	display: flex;
	flex-direction: row;
	height: 100%;
	inset: 0;
	position: absolute;
	width: 100%;

	& > section {
		display: flex;
		flex-direction: row;

		.options {
			--button-size: 42px;

			align-items: center;
			background-color: #222;
			display: flex;
			flex-direction: column;
			gap: 14px;
			padding: 14px;
			transition: all 0.25s;
			z-index: 2;

			& > a {
				background-color: #fff1;
				border-radius: var(--border-radius);
				color: #fff4;
				display: flex;
				flex-direction: row;
				gap: 7px;
				height: var(--button-size);
				justify-content: center;
				padding-block-start: 4px;
				transition: all 0.25s;
				width: var(--button-size);

				&:hover {
					background-color: #fff3;
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
		}

		.subOptions {
			align-items: flex-start;
			background-color: #f4f4f4;
			border-inline-end: 1px solid #ccc;
			color: #333;
			display: flex;
			flex-direction: column;
			gap: 14px;
			min-width: var(--sub-menu-width);
			overflow-y: scroll;
			padding: 14px;
			text-align: left;
			transition: all 0.25s;
			width: var(--sub-menu-width);
			z-index: 1;

			&::-webkit-scrollbar {
				width: 0;
			}

			label {
				color: #333;
				margin-block-start: 7px;
			}
		}
	}

	&[data-hide-menu='true'] {
		& > section {
			.options {
				background-color: #f4f4f4;
				border-inline-end: 1px solid #ccc;

				& > a {
					background-color: #2221;
					color: #666;

					&:hover {
						background-color: #2223;
						color: #666;
					}

					&.active {
						background-color: #222;
						color: #fff;
					}
				}
			}

			.subOptions {
				margin-inline-start: calc(var(--sub-menu-width) * -1);
				opacity: 0;
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
		transition: alll 0.25s;

		&::-webkit-scrollbar {
			width: 0;
		}

		& > section {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			gap: 14px;
			transition: alll 0.25s;
			z-index: 100;

			& > * {
				animation: fadeOut 0.5s linear;
				flex-grow: 1;
				transition: alll 0.25s;
			}
		}
	}
`
