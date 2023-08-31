import styled from 'styled-components'

export const ButtonStyle = styled.button`
	align-items: center;
	background: linear-gradient(
		45deg,
		var(--active-color),
		var(--active-color-80),
		var(--active-color)
	);
	background-size: 100%;
	border: none;
	border-radius: var(--border-radius);
	color: #fff;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	font-size: 16px;
	gap: 7px;
	height: var(--input-height);
	padding-inline: 14px;
	transition: background 0.5s, border-radius 0s, box-shadow 0.25s;
	width: fit-content;

	&[data-left-icon]::before,
	&[data-right-icon]::after {
		color: inherit;
		font-size: inherit;
		font-family: 'Material Symbols Outlined';
		font-weight: inherit;
	}

	&[data-left-icon]::before {
		content: attr(data-left-icon);
	}

	&[data-right-icon]::after {
		content: attr(data-right-icon);
	}

	&:hover {
		background-size: 200%;
		box-shadow: rgb(var(--active-color-value)) 0 0 7px 0;
	}

	&:disabled {
		opacity: 0.5;
		pointer-events: none;
		user-select: none;
	}

	&:active {
		box-shadow: rgb(var(--active-color-value)) 0 0 2px 0;
	}

	&[data-variation='sidebar'] {
		--active-color-value: 255, 255, 255 !important;
		--active-color: rgb(var(--active-color-value), 0.3);
		--active-color-90: rgb(var(--active-color-value), 0.39);
		--active-color-80: rgb(var(--active-color-value), 0.38);
		--active-color-70: rgb(var(--active-color-value), 0.37);
		--active-color-60: rgb(var(--active-color-value), 0.36);
		--active-color-50: rgb(var(--active-color-value), 0.35);
		--active-color-40: rgb(var(--active-color-value), 0.34);
		--active-color-30: rgb(var(--active-color-value), 0.33);
		--active-color-20: rgb(var(--active-color-value), 0.32);
		--active-color-10: rgb(var(--active-color-value), 0.31);

		&:hover {
			box-shadow: rgb(var(--active-color-value)) 0 0 4px 0;
		}
	}

	&[data-variation='secondary'] {
		--active-color-value: 30, 30, 30 !important;
		--active-color: rgb(var(--active-color-value), 1);
		--active-color-90: rgb(var(--active-color-value), 0.9);
		--active-color-80: rgb(var(--active-color-value), 0.8);
		--active-color-70: rgb(var(--active-color-value), 0.7);
		--active-color-60: rgb(var(--active-color-value), 0.6);
		--active-color-50: rgb(var(--active-color-value), 0.5);
		--active-color-40: rgb(var(--active-color-value), 0.4);
		--active-color-30: rgb(var(--active-color-value), 0.3);
		--active-color-20: rgb(var(--active-color-value), 0.2);
		--active-color-10: rgb(var(--active-color-value), 0.1);
	}

	&[data-variation='ghost'] {
		--active-color-value: 30, 30, 30 !important;
		--active-color: rgb(var(--active-color-value), 1);
		--active-color-90: rgb(var(--active-color-value), 0.9);
		--active-color-80: rgb(var(--active-color-value), 0.8);
		--active-color-70: rgb(var(--active-color-value), 0.7);
		--active-color-60: rgb(var(--active-color-value), 0.6);
		--active-color-50: rgb(var(--active-color-value), 0.5);
		--active-color-40: rgb(var(--active-color-value), 0.4);
		--active-color-30: rgb(var(--active-color-value), 0.3);
		--active-color-20: rgb(var(--active-color-value), 0.2);
		--active-color-10: rgb(var(--active-color-value), 0.1);

		background: none;
		border: 1px solid transparent;
		color: var(--active-color);

		&:hover {
			box-shadow: var(--active-color-30) 0 0 7px 0;
		}

		&:active {
			box-shadow: var(--active-color-30) 0 0 4px 0;
		}
	}

	&[data-loading='true'] {
		pointer-events: none;

		&::after {
			display: none;
		}

		&::before {
			animation: rotate 1s linear infinite;
			color: inherit;
			content: 'sync';
			font-size: inherit;
			font-family: 'Material Symbols Outlined';
			font-weight: inherit;
		}

		& > span {
			display: none;
		}
	}
`
