import styled from 'styled-components'

export const FieldStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 14px;
	gap: 4px;
	position: relative;

	& > label {
		font-weight: bold;
	}

	& > input,
	& > textarea,
	& > .value {
		background-color: #fff;
		border: 1px solid #aaa;
		border-radius: 7px;
		font-size: inherit;
		max-width: 100%;
		min-width: 100%;
		padding: 10px;
		transition: all 0.5s;

		&::placeholder {
			color: #ccc;
		}

		&:focus {
			border-color: var(--ACTIVE_COLOR);
		}
	}

	& > .value {
		background-color: #f4f4f4;
	}
`
