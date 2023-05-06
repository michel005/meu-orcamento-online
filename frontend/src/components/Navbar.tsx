import React from 'react'
import styled from 'styled-components'
import { FlexRow } from './FlexRow'
import { useState } from 'react'

export type NavbarType = {
	left?: any
	right?: any
	props?: {}
}

export const NavbarStyle = styled.nav`
	background-color: #111;
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: row;
	gap: 14px;
	height: 78px;
	min-height: 78px;
	justify-content: center;
	position: relative;
	z-index: 100;

	&[data-max-length] {
		.centered {
			max-width: none;
			padding-inline: 14px;
		}
	}

	a[data-link] {
		align-self: center;
		font-weight: normal;

		&:hover {
			font-weight: bold;
			opacity: 1;
		}

		&.active {
			color: #fff;
			font-weight: bold;
		}
	}

	.centered {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		padding-block: 14px;
		gap: 14px;
		max-width: var(--responsive-size);
		position: relative;

		.rightSide {
			flex-grow: 1;
			justify-content: flex-end;
		}

		.menuButton {
			display: none;
		}
	}

	@media (max-width: 1000px) {
		a[data-link] {
			color: var(--active-color);

			&.active {
				color: #333;
				font-weight: bold;
			}
		}
		.centered {
			padding-inline: 0px;

			.leftSide {
				margin-left: 14px;
			}

			.rightSide {
				background-color: #fff;
				box-shadow: #ccc 0 0 4px;
				flex-direction: column;
				opacity: 0;
				padding: 14px;
				pointer-events: none;
				position: absolute;
				right: 7px;
				top: 70%;
				transition: opacity 0.25s;
				z-index: 100;
			}

			.menuButton {
				display: block;
				font-size: 28px;
				margin-left: auto;
				margin-right: 14px;
			}
		}

		&[data-show-menu='true'] {
			.centered {
				.rightSide {
					opacity: 1;
					pointer-events: all;
				}
			}
		}
	}
`

export const Navbar = ({ left, right, ...props }: NavbarType) => {
	const [showMenu, setShowMenu] = useState(false)
	return (
		<NavbarStyle data-show-menu={showMenu} {...props}>
			<FlexRow className="centered">
				<FlexRow className="leftSide">{left}</FlexRow>
				<FlexRow className="rightSide">{right}</FlexRow>
				<button
					data-link
					data-icon="menu"
					className="menuButton"
					onClick={() => setShowMenu((x) => !x)}
				/>
			</FlexRow>
		</NavbarStyle>
	)
}
