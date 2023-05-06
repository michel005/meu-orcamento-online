import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { FlexRow } from './FlexRow'
import * as React from 'react'

export const FooterStyle = styled.nav`
	background-color: #111;
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: row;
	gap: 14px;
	justify-content: center;
	position: relative;
	z-index: 100;

	button[data-link] {
		&:hover {
			opacity: 1;
		}
	}

	.centered {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		padding: 50px 14px;
		gap: 14px;
		max-width: var(--responsive-size);
		position: relative;

		.rightSide {
			flex-grow: 1;
			justify-content: flex-end;
		}
	}

	.leftSide,
	.rightSide {
		color: #aaa;
		width: 100%;
	}

	.rightSide {
		& > div {
			flex-grow: 1;
			align-items: flex-end;
			width: 100%;
		}

		button[data-link] {
			color: #fff9;
			font-weight: normal;

			&:hover {
				color: #fffc;
			}
		}

		label {
			color: #fffc;
			font-size: 14px;
			font-weight: normal;
			margin: 0;
			text-align: right;
		}
	}

	@media (max-width: 1000px) {
		.centered {
			flex-direction: column;
			gap: 28px;
		}

		.rightSide {
			flex-wrap: wrap;
			gap: 28px;

			& > div {
				flex-grow: 1;
				align-items: flex-start;
				width: 150px;
			}

			label {
				text-align: left;
			}

			input {
				max-width: 200px;
			}
		}
	}
`

export type FooterType = HTMLAttributes<HTMLElement> & {
	left?: any
	right?: any
	centerProps?: any
}

export const Footer = ({ left, right, centerProps, ...props }: FooterType) => {
	return (
		<FooterStyle {...props}>
			<FlexRow style={{ ...centerProps }} className="centered">
				<FlexRow className="leftSide">{left}</FlexRow>
				{right && <FlexRow className="rightSide">{right}</FlexRow>}
			</FlexRow>
		</FooterStyle>
	)
}
