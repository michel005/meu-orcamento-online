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
		max-width: 300px;
		min-width: 300px;
		text-align: left;
		transition: all 0.25s;

		a {
			color: #333;
			display: flex;
			flex-direction: row;

			h3 {
				font-weight: normal;
			}

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

	@media screen and (max-width: 1200px) {
		header {
			max-width: 200px;
			min-width: 200px;
		}
	}

	@media screen and (max-width: 1000px) {
		flex-direction: column;
		gap: 14px;

		header {
			max-width: none;
			min-width: auto;
		}

		.content {
			.row {
				flex-direction: column;
			}
		}
	}
`
