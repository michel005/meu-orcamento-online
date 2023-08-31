import styled from 'styled-components'

export const TextStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	gap: 4px;

	input,
	textarea {
		background-color: #fff;
		border: none;
		border-radius: var(--border-radius);
		font-size: inherit;
		height: var(--input-height);
		max-width: 100%;
		min-width: 100%;
		outline: 1px solid #aaa;
		order: 1;
		padding-inline: 10px;
		transition: all 0.5s;

		&::placeholder {
			color: #ccc;
		}

		&:focus {
			outline: 1px solid var(--active-color);
		}

		&:disabled {
			background: #f4f4f4;
			cursor: not-allowed;
		}
	}
	textarea {
		min-height: 100px;
		padding-block-start: 10px;
	}

	&[data-error='true'] {
		input,
		textarea {
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
		input,
		textarea {
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
	}
`
