import styled from 'styled-components'

export const LoginStyle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 21px;
	flex-grow: 1;

	& > .form,
	& > .picture {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;

		p {
			color: #999;
		}

		& > .buttons {
			display: flex;
			flex-direction: row;
			gap: 14px;

			&.right {
				justify-content: flex-end;
			}
		}

		img {
			max-height: 400px;
		}
	}

	@media (max-width: 1200px) {
		flex-direction: column-reverse;

		& > .form,
		& > .picture {
			width: 100%;

			& > .buttons {
				flex-direction: column;

				&.right {
					align-items: flex-end;
				}
			}
		}

		& > .picture {
			height: 200px;

			img {
				height: 200px;
			}
		}
	}
`
