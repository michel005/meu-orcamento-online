import styled from 'styled-components'

export const TableStyle = styled.table`
	border-collapse: collapse;
	width: 100%;

	thead {
		border-bottom: 1px solid #ccc;

		tr {
			th {
				font-size: 18px;
				font-weight: bolder;
				padding: 10px 14px;
				text-align: left;

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

				a {
					color: #333;
				}
			}
		}
	}

	tbody {
		tr {
			transition: all 0.25s;
			user-select: none;

			td {
				color: #333;
				font-size: 18px;
				padding: 10px 14px;
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
			}

			&[data-not-found='true'] {
				&:hover {
					background-color: transparent;
				}
			}
		}
	}

	.pagination {
		padding-block-start: 21px;

		div {
			margin-inline: auto;
		}
	}
`
