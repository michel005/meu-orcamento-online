import styled from 'styled-components'

export const InputAndButton = styled.div`
	display: flex;
	flex-direction: row;

	button {
		align-items: center;
		border: 1px solid #eee;
		border-width: 1px;
		box-shadow: none;
		height: 100%;

		&:hover {
			border-color: #ccc;
			box-shadow: none;
		}

		&:disabled {
			&:hover {
				border-color: #eee;
				box-shadow: none;
				cursor: initial;
			}
		}
	}

	& > .leftButtons,
	& > .rightButtons {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	& > .leftButtons {
		button {
			margin-right: -1px;
		}
	}
	& > .rightButtons {
		button {
			margin-left: -1px;
		}
	}
`
