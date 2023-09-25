import styled from 'styled-components'

export const DivRow = styled.div`
	align-items: flex-start;
	display: flex;
	flex-direction: row;
	gap: var(--gap, 10px);

	> div {
		flex-grow: 1;
	}
`
