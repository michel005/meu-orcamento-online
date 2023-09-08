import styled from 'styled-components'

export const SelectStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	gap: 4px;

	& > div {
		display: flex;
		flex-direction: row;
		position: relative;

		&::after {
			align-items: center;
			content: 'expand_more';
			color: inherit;
			display: flex;
			font-size: inherit;
			font-family: 'Material Symbols Outlined';
			font-weight: inherit;
			height: 100%;
			inset-block-start: 0;
			inset-inline-end: 7px;
			pointer-events: none;
			position: absolute;
		}
	}

	select {
		appearance: none;
		background-color: #fff;
		border: none;
		border-radius: var(--border-radius);
		flex-grow: 1;
		font-size: inherit;
		height: var(--input-height);
		outline: 1px solid var(--input-border-color);
		order: 1;
		padding-inline: 10px;
		transition: all 0.5s;

		&:focus {
			outline: 1px solid var(--active-color);
		}

		&:disabled {
			background: #f4f4f4;
			cursor: not-allowed;
		}
	}

	&[data-error='true'] {
		select {
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
		select {
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
