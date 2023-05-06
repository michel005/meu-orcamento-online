import styled from 'styled-components'

export const CardGroup = styled.div`
	display: flex;
	flex-direction: row;
	gap: 14px;
	justify-content: center;
	padding: 14px;
	overflow-x: auto;
	max-width: 1000px;
	width: 100%;

	@media (max-width: 1000px) {
		justify-content: flex-start;
	}
`
