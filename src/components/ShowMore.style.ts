import styled from 'styled-components'

export const ShowMoreStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	position: relative;
	width: 100%;

	.showMoreLessButton {
		inset-block-end: 0;
		position: sticky;
		width: 100%;
	}

	button {
		text-align: left;

		&:before {
			align-self: center;
		}
	}
`
