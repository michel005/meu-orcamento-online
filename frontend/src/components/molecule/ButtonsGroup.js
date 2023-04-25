import styled from 'styled-components'

export const ButtonsGroup = styled.div`
	display: flex;
	flex-direction: row;
	gap: 14px;

	& > * {
		width: 100%;
	}

	&[data-grow='false'] > * {
		width: auto;
	}

	@media (max-width: 700px) {
		flex-direction: column;
	}
`
