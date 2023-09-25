import styled from 'styled-components'

export const ToggleStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	gap: 4px;

	section {
		display: flex;
		flex-direction: row;
		gap: 7px;

		label {
			cursor: pointer;
			margin-block: auto !important;
		}

		& > div {
			align-self: flex-start;
			background-color: #ccc;
			border: none;
			border-radius: calc(var(--input-height) / 2);
			cursor: pointer;
			display: flex;
			flex-direction: row;
			font-size: inherit;
			height: calc((var(--input-height) / 2) + 2px);
			padding-inline: 4px;
			transition: all 0.5s;
			width: calc(var(--input-height) - 2px);

			&::before {
				align-self: center;
				background-color: #fff;
				border-radius: calc(var(--input-height) / 2);
				content: '';
				height: calc((var(--input-height) / 2) - 6px);
				transition: all 0.25s;
				width: calc((var(--input-height) / 2) - 6px);
			}
		}
	}

	&[data-value='true'] {
		section {
			& > div {
				background-color: var(--active-color);
				outline-color: var(--active-color);

				&::before {
					margin-left: calc((var(--input-height) / 2) - 4px);
				}
			}
		}
	}

	&[data-error='true'] {
		section {
			div {
				outline: 1px solid red;
			}
		}

		span {
			align-self: flex-start;
			color: red;
			font-size: 0.6em;
			order: 2;
		}
	}

	&[data-disabled='true'] {
		section {
			& > div {
				background-color: #ccc;
				opacity: 0.6;
				pointer-events: none;
			}

			& > label {
				pointer-events: none;
			}
		}
	}

	&[data-loading='true'] {
		div {
			animation: loading 2s linear infinite;
			background-image: linear-gradient(90deg, #f4f4f4, #ddd, #f4f4f4);
			background-size: 1000px;
			color: transparent;
			outline-color: transparent;
			pointer-events: none;

			&::placeholder {
				color: transparent;
			}
		}

		label {
			pointer-events: none;
		}
	}
`
