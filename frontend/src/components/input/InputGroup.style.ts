import styled from 'styled-components'

export const InputGroupStyle = styled.div`
	border-top: 1px solid #eee;
	display: flex;
	flex-direction: row;
	gap: 50px;
	padding-block-start: 10px;

	header {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 4px;
		text-align: left;

		h3 {
			color: #666;
			width: 300px;
		}

		p {
			color: #aaa;
			width: 300px;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-block-start: 4px;
		width: 1000px;

		.row {
			display: flex;
			flex-direction: row;
			gap: 10px;

			& > div {
				flex-grow: 1;
			}
		}
	}
`
