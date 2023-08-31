import styled from 'styled-components'

export const DateInputStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	gap: 4px;

	& > div {
		display: flex;
		flex-direction: row;
		position: relative;

		& > input {
			background-color: #fff;
			border: none;
			border-radius: var(--border-radius);
			flex-grow: 1;
			font-size: inherit;
			height: var(--input-height);
			outline: 1px solid #aaa;
			order: 1;
			padding-inline: 10px;
			transition: all 0.5s;
			z-index: 50;

			&:focus {
				outline: 1px solid var(--active-color);
			}

			&:disabled {
				background: #f4f4f4;
				cursor: not-allowed;
			}

			&::-webkit-calendar-picker-indicator {
				display: none;
			}
		}

		& > button {
			align-items: center;
			align-self: center;
			background-color: #fff;
			border: none;
			border-inline-start: 1px solid #aaa;
			border-radius: 0 var(--border-radius) var(--border-radius) 0;
			color: #999;
			cursor: pointer;
			display: flex;
			flex-direction: row;
			font-weight: bold;
			gap: 4px;
			height: 100%;
			inset-inline-end: 0;
			padding-inline: 14px;
			position: absolute;
			transition: all 0.5s;
			z-index: 100;

			&:hover {
				background-color: #f4f4f4;
			}

			&::before {
				content: 'calendar_month';
				color: inherit;
				font-size: inherit;
				font-family: 'Material Symbols Outlined';
				font-weight: inherit;
			}
		}
	}

	&[data-disabled='true'] {
		button {
			opacity: 0.5;
			pointer-events: none;
		}
	}

	&[data-error='true'] {
		input {
			outline-color: red;
		}

		span {
			align-self: flex-start;
			color: red;
			font-size: 0.6em;
			order: 2;
		}
	}

	&[data-loading='true'] {
		input {
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

		button {
			display: none;
		}
	}
`
