import styled from 'styled-components'

export const PaginationStyle = styled.div`
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: row;
	gap: 7px;

	.pages {
		display: flex;
		flex-direction: row;
		gap: 7px;

		button {
			align-items: center;
			border-radius: 50%;
			font-size: 12px;
			height: 24px;
			justify-content: center;
			padding: 0;
			width: 24px;
		}
	}

	button {
		align-self: center;
		padding: 7px 10px;
	}
`
