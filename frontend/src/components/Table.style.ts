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
				}

				&[data-alignment='center'] {
					text-align: center;
				}

				&[data-alignment='right'] {
					text-align: right;
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
					border-radius: var(--border-radius);
					height: 32px;
					margin-inline-start: -4px;
					object-fit: cover;
					width: 32px;
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
`
