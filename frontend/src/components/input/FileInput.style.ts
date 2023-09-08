import styled from 'styled-components'

export const FileInputStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	gap: 4px;

	& > section {
		border: 1px solid var(--input-border-color);
		border-radius: var(--border-radius);
		display: flex;
		flex-direction: row;
		height: 200px;
		min-height: 200px;
		overflow: hidden;
		position: relative;

		&::before {
			background-image: var(--value);
			background-position: center;
			background-size: 100% auto;
			content: '';
			filter: blur(10px);
			inset-block-start: 0;
			inset-inline-start: 0;
			position: absolute;
			height: 100%;
			opacity: 0.3;
			pointer-events: none;
			width: 100%;
		}

		& > div {
			align-items: center;
			background-color: #fff;
			color: #333;
			display: flex;
			flex-direction: row;
			flex-grow: 1;
			gap: 10px;
			justify-content: center;
			padding-inline: 21px;
			transition: all 0.5s;

			&:focus {
				outline: 1px solid var(--active-color);
			}

			&:disabled {
				background: #f4f4f4;
				cursor: not-allowed;
			}

			& > img {
				background-color: #fff;
				border-radius: var(--border-radius);
				box-shadow: #999 0 0 10px;
				height: 180px;
				object-fit: cover;
				pointer-events: none;
				width: auto;
				z-index: 100;
			}

			& > span {
				align-self: center;
				text-align: center;
			}
		}

		button {
			align-items: center;
			align-self: center;
			background-color: #fff;
			border: none;
			border-inline-start: 1px solid #ccc;
			border-radius: 0;
			color: #999;
			cursor: pointer;
			display: flex;
			flex-direction: column;
			font-weight: bold;
			justify-content: center;
			gap: 4px;
			height: 100%;
			padding-inline: 14px;
			transition: all 0.5s;
			writing-mode: vertical-rl;
			z-index: 100;

			& > span {
				writing-mode: vertical-rl; /* Texto na vertical da direita para a esquerda */
				transform: rotate(0); /* Inverte o texto para que fique legível */
				white-space: nowrap; /* Evita quebras de linha automáticas */
				text-orientation: mixed; /* Melhora a orientação dos caracteres */
			}

			&:hover {
				background-color: #f4f4f4;
			}

			&[data-icon]::before {
				content: attr(data-icon);
				color: inherit;
				font-size: inherit;
				font-family: 'Material Symbols Outlined';
				font-weight: inherit;
			}
		}
	}

	input {
		display: none;
	}

	&[data-disabled='true'] {
		button {
			opacity: 0.5;
			pointer-events: none;
		}
	}

	&[data-error='true'] {
		div {
			outline-color: red;
		}

		& > span {
			align-self: flex-start;
			color: red;
			font-size: 0.6em;
			order: 2;
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

		button {
			display: none;
		}
	}
`
