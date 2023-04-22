import styled from 'styled-components'

export const LeftRightSideStyle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 21px;
	position: relative;

	.leftSide,
	.rightSide {
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		margin-inline: auto;
		width: 50%;

		h1 {
			margin-bottom: 4px;
			max-width: 80%;
		}

		p {
			color: #777;
			max-width: 80%;
		}

		img {
			height: 400px;
		}
	}

	.rightSide {
		margin-inline: auto 0;
		text-align: right;

		h1 {
			margin-inline-start: auto;
		}

		p {
			margin-inline-start: auto;
		}
	}

	@media (max-width: 1200px) {
		flex-direction: column;

		.leftSide,
		.rightSide {
			text-align: center;
			width: 100%;

			h1,
			p {
				max-width: none;
			}
		}
	}
`
