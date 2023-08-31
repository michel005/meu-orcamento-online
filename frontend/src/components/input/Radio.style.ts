import styled from 'styled-components'

export const RadioStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	gap: 4px;

	section {
		display: flex;
		flex-direction: row;
		gap: 7px;

		label {
			align-self: center;
			cursor: pointer;
			font-size: 1em;
			font-weight: initial;
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
			justify-content: center;
			padding: 4px;
			transition: background-color 0.5s;

			&::before {
				align-self: center;
				background-color: #fff;
				border-radius: calc(var(--input-height) / 2);
				content: '';
				font-family: 'Material Symbols Outlined';
				height: calc((var(--input-height) / 2) - 8px);
				transition: background-color 0.25s, opacity 0.25s;
				width: calc((var(--input-height) / 2) - 8px);
			}
		}
	}

	&[data-value='true'] {
		div {
			background-color: var(--active-color);

			&::before {
				opacity: 0;
			}
		}
	}

	&[data-error='true'] {
		div {
			outline: 1px solid red;
		}

		span {
			align-self: flex-start;
			color: red;
			font-size: 0.6em;
			order: 2;
		}
	}

	&[data-loading='true'] {
		div,
		div::before {
			animation: loading 2s linear infinite;
			background-image: linear-gradient(90deg, #f4f4f4, #ddd, #f4f4f4);
			background-size: 1000px;
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

	&[data-disabled='true'] {
		pointer-events: none;

		& > div {
			cursor: not-allowed;
			opacity: 0.5;
			pointer-events: auto;
		}
	}
`
