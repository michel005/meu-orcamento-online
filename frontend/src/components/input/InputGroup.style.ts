import styled from 'styled-components'

export const InputGroupStyle = styled.div`
	border-top: 1px solid #eee;
	display: flex;
	flex-direction: row;
	padding-block-start: 14px;
	gap: 50px;

	header {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 7px;
		text-align: left;
		max-width: 300px;
		min-width: 300px;

		a {
			color: #333;
			display: flex;
			flex-direction: row;

			.icon {
				float: left;
				margin-inline-end: 4px;
			}
		}

		> .subTitle {
			color: #aaa;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 10px;
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

	&[data-show='false'] {
		header {
			max-width: none;

			> .subTitle {
				button {
					display: none;
				}
			}
		}
	}
`
