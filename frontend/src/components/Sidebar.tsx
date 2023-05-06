import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { FlexColumn } from './FlexColumn'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppLogo } from './AppLogo'
import { FlexRow } from './FlexRow'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { RFLogo } from '../assets/RFLogo'
import { useModal } from '../hook/useModal'

export const SidebarStyle = styled.div`
	background-color: #111;
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	position: relative;
	transition: all 0.25s;
	width: 250px;

	&::-webkit-scrollbar {
		width: 0;
	}

	.menuButton {
		font-size: 20px;
		position: absolute;
		right: 14px;
		top: 14px;
		z-index: 100;
	}

	.userInfo {
		background-color: #333;
		border-bottom: 4px solid var(--active-color);
		padding: 21px 7px;
		transition: all 0.25s;
		width: 100%;

		img,
		.fallBack {
			background-color: #ccc;
			border-radius: 50%;
			box-shadow: #333 0 0 7px;
			color: transparent;
			height: 100px;
			margin-inline: auto;
			width: 100px;
		}

		.userDetails {
			align-items: center;
			color: var(--active-color);
			display: flex;
			flex-direction: column;
			text-align: center;

			b {
				font-size: 14px;
			}

			p {
				color: #fff;
				font-size: 14px;
			}
		}

		.buttons {
			justify-content: center;
			margin-top: -10px;
		}
	}

	.options {
		flex-grow: 1;
		gap: 7px;
		padding-block: 14px;

		a {
			background-color: transparent;
			border: none;
			border-left: 4px solid transparent;
			color: #fff;
			display: flex;
			gap: 10px;
			padding-block: 14px;
			transition: all 0.25s;

			&.active {
				background-color: #fff1;
				border-left: 4px solid var(--active-color-aa);
			}

			&:hover {
				background-color: #fff3;
				border-left: 4px solid var(--active-color);
				box-shadow: none;
			}
		}
	}

	.appLogo {
		padding: 21px 7px;
	}

	&[data-reduced='true'] {
		width: 70px;

		.menuButton {
			margin: 14px auto;
			position: initial;
		}

		.userInfo {
			background-color: transparent;
			border-bottom: none;
			padding: 0 10px;

			img,
			.fallBack {
				height: 50px;
				width: 50px;
			}

			.userDetails {
				display: none;
			}

			.buttons {
				flex-direction: column;
				margin-top: 0;
				text-align: center;

				button {
					justify-content: center;
				}
			}
		}

		.options {
			gap: 0;

			a {
				border-left: none;
				border-bottom: 4px solid transparent;
				flex-direction: column;
				font-size: 10px;
				justify-content: center;
				text-align: center;

				&::before {
					font-size: 20px;
				}

				&:hover {
					border-left: none;
					border-bottom: 4px solid var(--active-color);
				}

				&.active {
					border-left: none;
					border-bottom: 4px solid var(--active-color-aa);
				}
			}
		}

		.appLogo {
			svg {
				margin-inline: auto;
			}

			.text {
				display: none;
			}
		}
	}
`

export const Sidebar = () => {
	const { user, logout } = useContext(UserContext)

	const [reduced, setReduced] = useState<boolean>(false)
	const [haveImage, setHaveImage] = useState<boolean>(true)

	const navigate = useNavigate()
	const { question } = useModal()

	return (
		<SidebarStyle data-reduced={reduced}>
			<button
				data-icon="menu"
				data-link
				className="menuButton"
				onClick={() => setReduced((x) => !x)}
			/>
			<FlexColumn className="userInfo">
				{!haveImage ? (
					<RFLogo className="fallBack" />
				) : (
					<img
						referrerPolicy="no-referrer"
						src={user?.picture}
						onError={(e) => {
							setHaveImage(false)
						}}
					/>
				)}
				<div className="userDetails">
					<b>{user?.name}</b>
					<p>{user?.email}</p>
				</div>
				<FlexRow className="buttons">
					<button data-link>Meu Perfil</button>
					<button
						data-link
						onClick={() => {
							question({
								header: 'Deseja realmente sair do seu usuário?',
								confirm: () => {
									navigate('/')
									logout?.()
								},
							})
						}}
					>
						Sair
					</button>
				</FlexRow>
			</FlexColumn>
			<FlexColumn className="options">
				<NavLink data-icon="dashboard" to="/">
					Dashboard
				</NavLink>
				<NavLink data-icon="menu_book" to="/menuBook">
					Cardápio
				</NavLink>
				<NavLink data-icon="package" to="/delivery">
					Entregas e Aplicativos
				</NavLink>
				<NavLink data-icon="range_hood" to="/requests">
					Pedidos
				</NavLink>
				<NavLink data-icon="table_bar" to="/table">
					Mesas e Comandas
				</NavLink>
				<NavLink data-icon="star" to="/evaluations">
					Avaliações
				</NavLink>
			</FlexColumn>

			<AppLogo data-invert className="appLogo" />
		</SidebarStyle>
	)
}
