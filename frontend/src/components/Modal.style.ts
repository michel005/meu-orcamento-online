import styled from 'styled-components'

export const ModalStyle = styled.div`
	animation: fadeOut 0.25s linear;
	align-items: center;
	background-color: #1111;
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	inset-block-start: 0;
	inset-inline-start: 0;
	max-height: 100%;
	max-width: 100%;
	overflow-y: auto;
	position: fixed;
	width: 100%;
	z-index: 100;

	& > div {
		border: none;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: #ccc 0 0 4px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 21px;
		position: relative;
		width: 600px;

		hr {
			background-color: #eee;
			height: 1px;
			border: none;
			appearance: none;
		}

		& > button {
			background-color: transparent;
			border: none;
			color: #aaa;
			cursor: pointer;
			font-size: 18px;
			font-family: 'Material Symbols Outlined';
			font-weight: inherit;
			inset-block-start: 14px;
			inset-inline-end: 14px;
			position: absolute;

			&::before {
				content: 'close';
			}

			&:hover {
				opacity: 0.5;
			}
		}

		& > section {
			background-color: #fff;
			display: flex;
			flex-direction: column;
			gap: 14px;
		}
	}
`
