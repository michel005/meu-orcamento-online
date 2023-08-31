import styled from 'styled-components'

export const TabsStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 14px;

	& > section {
		border-bottom: 1px solid #eee;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		& > button {
			background-color: transparent;
			border: none;
			border-bottom: 2px solid transparent;
			color: #ccc;
			cursor: pointer;
			font-size: 16px;
			margin-block-end: -1px;
			outline: transparent;
			padding: 10px 14px;
			transition: all 0.5s;

			&:hover {
				color: #999;
			}

			&[data-selected='true'] {
				border-bottom: 2px solid var(--active-color);
				color: #333;
			}
		}
	}

	& > div {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 10px;
		width: 100%;

		& > * {
			animation: fadeOut 0.5s linear;
		}
	}
`
