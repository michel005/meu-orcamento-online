import styled from 'styled-components'

export const TableStyle = styled.div`
	background-color: #fff;
	box-shadow: #ccc 0 0 4px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	table {
		border-collapse: collapse;
		margin-block-end: auto;
		width: 100%;

		thead {
			background-color: #222;
			border-radius: var(--border-radius) var(--border-radius) 0 0;
			inset-block-start: 0;
			position: sticky;
			z-index: 10;

			tr {
				border-bottom: 1px solid #ccc;

				th {
					color: #fff;
					font-size: 16px;
					padding: 21px 21px;
					transition: all 0.25s;

					a {
						color: #fff;
					}

					&:hover {
						background-color: #fff2;
					}

					&[data-alignment='left'] {
						text-align: left;

						div {
							justify-content: flex-start;
						}
					}

					&[data-alignment='center'] {
						text-align: center;

						div {
							justify-content: center;
						}
					}

					&[data-alignment='right'] {
						text-align: right;

						div {
							justify-content: flex-end;
						}
					}
				}
			}
		}

		tbody {
			position: relative;

			tr {
				transition: all 0.25s;
				user-select: none;

				td {
					color: #333;
					font-size: 16px;
					padding: 21px;
					text-align: left;

					img {
						align-self: center;
						border-radius: var(--border-radius);
						box-shadow: #ccc 0 0 4px;
						height: 42px;
						margin-inline-start: -4px;
						object-fit: cover;
						width: 42px;
					}

					&[data-alignment='left'] {
						text-align: left;
					}

					&[data-alignment='center'] {
						text-align: center;
					}

					&[data-alignment='right'] {
						text-align: right;
					}
				}

				&:hover {
					background-color: #f4f4f4;

					&:nth-child(even) {
						background-color: #f4f4f4;
					}
				}

				&:nth-child(even) {
					background-color: #f8f8f8;
				}

				&[data-not-found='true'] {
					&:hover {
						background-color: transparent;
					}
				}
			}
		}
	}

	.pagination {
		align-self: stretch;
		background-color: #fff;
		border-block-start: 1px solid #ccc;
		display: flex;
		flex-direction: row;
		inset-block-end: 0;
		justify-content: flex-end;
		padding-block: 14px;
		position: sticky;
		width: 100%;
		z-index: 10;

		> span {
			align-self: center;
			color: #888;
			flex-grow: 1;
			margin-inline-start: 14px;
		}
	}
`
