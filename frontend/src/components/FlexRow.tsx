import styled from 'styled-components'

export const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 14px;
	position: relative;

	hr {
		border: 1px solid #eee !important;
		height: 100% !important;
		width: 1px !important;
	}

	&[data-responsive] {
		@media (max-width: 700px) {
			flex-direction: column;
		}
	}
`
