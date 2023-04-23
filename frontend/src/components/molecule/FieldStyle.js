import styled from 'styled-components'

export const FieldStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 14px;
	gap: 4px;

	& > label {
		font-weight: bold;
	}

	& > input {
		background-color: #fff;
		border: 1px solid #aaa;
		border-radius: 7px;
		font-size: inherit;
		padding: 10px;
		transition: all 0.5s;

		&::placeholder {
			color: #ccc;
		}

		&:focus {
			border-color: var(--ACTIVE_COLOR);
		}
	}
`
