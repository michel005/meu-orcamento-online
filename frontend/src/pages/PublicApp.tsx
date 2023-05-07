import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { FlexColumn } from '../components/FlexColumn'
import { Navbar } from '../components/Navbar'
import { AppLogo } from '../components/AppLogo'
import { Footer } from '../components/Footer'
import { useContext } from 'react'
import React from 'react'
import styled from 'styled-components'
import { HomePage } from './public/HomePage'
import { PlansPage } from './public/PlansPage'
import { HirePage } from './public/HirePage'
import { LoginPage } from './public/LoginPage'

export const PublicAppStyle = styled.div`
	background-color: #333;
	display: flex;
	flex-direction: column;
	gap: 0 !important;
	height: 100%;
	left: 0;
	overflow-y: auto;
	position: fixed !important;
	top: 0;
	width: 100%;

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	& > main {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		gap: 0;
		padding-bottom: 21px;
		position: relative;
		margin-inline: auto;
		width: 100%;
	}

	.firstBlock {
		animation: firstBlock 0.5s linear;
		background: linear-gradient(
			45deg,
			var(--active-color),
			var(--active-color-aa),
			var(--active-color)
		);
		padding: 50px 50px;
		width: 100%;
		z-index: 1;

		@keyframes firstBlock {
			0% {
				translate: 0 -100%;
			}
		}

		h1 {
			animation: h1FirstBlock 0.5s linear;
			color: #fffe;
			filter: drop-shadow(var(--active-color) 0 0 4px);
			font-size: 48px;
			margin-inline: 0 auto;
			max-width: 40%;
			opacity: 1;
			text-align: left;

			&.right {
				margin-inline: auto 0;
				text-align: right;
			}

			@keyframes h1FirstBlock {
				0% {
					opacity: 0;
				}
				50% {
					opacity: 0;
				}

				100% {
					opacity: 1;
				}
			}
		}

		.centered {
			margin-inline: auto;
			max-width: var(--responsive-size);
		}
	}

	.plateLogo {
		animation: plateLogo 0.5s linear;
		bottom: 14px;
		height: 250px;
		left: 50%;
		position: absolute;
		translate: -50% 0;
		width: 250px;
		z-index: 100;

		@keyframes plateLogo {
			0% {
				opacity: 0;
				translate: -50% -20%;
				scale: 0;
			}

			100% {
				opacity: 1;
			}
		}
	}

	.secondBlock {
		flex-wrap: wrap;
		padding: 14px;
		position: relative;
		width: 100%;

		img {
			box-shadow: #333 0 0 4px;
			flex-grow: 1;
			height: 200px;
			min-width: min(100px, 100%);
			object-fit: cover;
			width: min(200px, 100%);

			&:nth-child(1),
			&:nth-child(6) {
				animation: imgSecondBlock 0.75s linear;
			}

			&:nth-child(2),
			&:nth-child(5) {
				animation: imgSecondBlock 0.5s linear;
			}

			&:nth-child(3),
			&:nth-child(4) {
				animation: imgSecondBlock 0.25s linear;
			}

			@keyframes imgSecondBlock {
				0% {
					opacity: 0;
					translate: 0 -100px;
				}
			}
		}
	}

	.thirdBlock {
		animation: thirdBlock 0.5s linear;
		margin-inline: auto;
		max-width: var(--responsive-size);
		padding: 14px;
		position: relative;
		width: 100%;
		z-index: 90;

		p {
			color: #aaa;
		}

		&:nth-child(even) {
			animation: thirdBlockEven 0.5s linear;
		}

		@keyframes thirdBlock {
			0% {
				opacity: 0;
				translate: -100px 0;
			}
		}

		@keyframes thirdBlockEven {
			0% {
				opacity: 0;
				translate: 100px 0;
			}
		}
	}

	@media (max-width: 1000px) {
		& > main {
			max-width: none;
			width: 100%;
		}

		.firstBlock {
			height: 400px;
			padding-inline: 21px;
			width: 100%;

			h1 {
				margin-top: auto;
				font-size: 28px;

				&.right {
					margin-top: 0;
				}
			}
		}

		.plateLogo {
			bottom: 25%;
			height: 200px;
			width: 200px;
		}

		.secondBlock {
			flex-wrap: wrap;
			margin-top: -36px;
			z-index: 100;

			img {
				min-height: 50px;
				width: 50px;
			}
		}
	}
`

export const PublicApp = () => {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()

	return (
		<PublicAppStyle className="main">
			<Navbar
				left={<AppLogo data-invert />}
				right={
					<>
						<NavLink data-link to="/">
							Início
						</NavLink>
						<NavLink data-link to="/plans">
							Planos
						</NavLink>
						<NavLink data-link to="/hire">
							Como Contratar?
						</NavLink>
						<FlexColumn style={{ justifyContent: 'center' }}>
							{user ? (
								<button
									data-primary
									onClick={() => {
										navigate('/login')
									}}
								>
									<img
										alt="Imagem do Usuário"
										referrerPolicy="no-referrer"
										className="userImage"
										src={user.picture}
										width="32px"
										style={{
											margin: '-10px 0 -10px -10px',
										}}
									/>
									{user.name}
								</button>
							) : (
								<button
									data-primary
									data-icon="login"
									onClick={() => {
										navigate('/login')
									}}
								>
									Entrar
								</button>
							)}
						</FlexColumn>
					</>
				}
			/>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/plans" element={<PlansPage />} />
					<Route path="/hire" element={<HirePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<HomePage />} />
				</Routes>
			</main>
			<Footer
				left={
					<FlexColumn>
						<AppLogo />
						<p>
							Sint Lorem nulla consequat consectetur ea deserunt esse. Nisi ut do non
							aliquip. Laboris sunt enim minim dolor deserunt cillum aliqua commodo
							pariatur aute Lorem mollit labore.
						</p>
					</FlexColumn>
				}
				right={
					<>
						<FlexColumn>
							<b>Exemplo 1</b>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
						</FlexColumn>
						<FlexColumn>
							<b>Exemplo 1</b>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
						</FlexColumn>
						<FlexColumn>
							<b>Exemplo 1</b>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
							<button data-link>Opção 1</button>
						</FlexColumn>
					</>
				}
			/>
			<Footer
				style={{
					backgroundColor: '#333',
				}}
				centerProps={{
					paddingBlock: '28px',
					textAlign: 'center',
				}}
				left={
					<p>
						Site desenvolvido por <b>Grigo Desenvolvimentos</b>. 2023. Todos os direitos
						reservados.
					</p>
				}
			/>
		</PublicAppStyle>
	)
}
