import styled from 'styled-components'

export const LeftRightSideStyle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 21px;
	position: relative;
	min-height: 400px;
	z-index: 90;

	.leftSide,
	.rightSide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		width: 50%;

		h1 {
			margin-bottom: 4px;
			max-width: 80%;
		}

		p {
			color: #111;
			max-width: 80%;
		}

		img {
			height: 400px;
		}
	}

	&[data-inverted='true'] {
		filter: invert(1);

		img,
		button {
			filter: invert(1);
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
			text-align: left;
			width: 100%;

			h1,
			p {
				max-width: none;
			}
		}
	}

	&[data-modal='true'] {
		.leftSide,
		.rightSide {
			text-align: left;

			&:empty {
				display: none;
			}

			h1 {
				margin: 0;
				max-width: 100%;
				text-align: left;
			}

			p {
				margin: 0;
				max-width: 100%;
			}
		}

		@media (max-width: 1200px) {
			flex-direction: column;

			.leftSide,
			.rightSide {
				img {
					max-height: 200px;
				}
			}
		}
	}
`
