import styled from 'styled-components'

export const ButtonGroupStyle = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 14px;

	&[data-align='left'] {
		justify-content: flex-start;
	}

	&[data-align='center'] {
		justify-content: center;
	}

	&[data-align='right'] {
		justify-content: flex-end;
	}
`
