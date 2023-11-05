import React, { useContext, useEffect, useState } from 'react'
import style from './PrivatePage.module.scss'
import { Icon } from '../components/Icon'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { ButtonGhost, ButtonWhite } from '../components/Button'
import { SessionContext } from '../contexts/SessionContext'
import { RoutesMap } from '../constants/RoutesMap'
import { UserPicture } from '../components/UserPicture'
import { LoadingPage } from './LoadingPage'
import { ConfigContext } from '../contexts/ConfigContext'
import { Bag } from '../components/Bag'

const RedirectToDashboard = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/')
	}, [])

	return <></>
}

export const PrivatePage = () => {
	const { loading, setMessage } = useContext(ConfigContext)
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const [showMenu, setShowMenu] = useState(false)
	const navigate = useNavigate()

	return (
		<div className={style.privatePage} data-show-menu={showMenu}>
			<nav className={style.navbar}>
				<div className={style.appInfo}>
					<ButtonWhite
						className={style.showMenuButton}
						leftIcon="menu"
						onClick={() => {
							setShowMenu((x) => !x)
						}}
					/>
					<ButtonWhite
						leftIcon="description"
						onClick={() => {
							navigate('/')
						}}
					>
						Meu Bazar Online
					</ButtonWhite>
				</div>
				<div className={style.navbarOptions}>
					{Object.keys(RoutesMap.private)
						.filter((routeKey) => !RoutesMap.private[routeKey].hide)
						.map((routeKey) => {
							const routeDetails = RoutesMap.private[routeKey]
							return (
								<NavLink
									key={routeKey}
									to={routeDetails.route}
									className={({ isActive }) => (isActive ? style.active : '')}
									onClick={() => {
										setShowMenu(false)
									}}
								>
									<Icon icon={routeDetails?.icon} className={style.icon} />
									<span>{routeDetails.name}</span>
								</NavLink>
							)
						})}
				</div>
				<Bag
					button={(show, setShow) => (
						<UserPicture
							className={style.userInfoPicture}
							picture={currentUser.user?.picture}
							name={currentUser.user?.full_name}
							size="var(--input-height)"
							onClick={() => {
								setShow((x) => !x)
							}}
						/>
					)}
					arrowPosition="top-right"
				>
					{(show, setShow) => (
						<>
							<ButtonGhost
								leftIcon="edit"
								onClick={() => {
									navigate('/my-user')
									setShowMenu(false)
									setShow(false)
								}}
							>
								Alterar meus dados
							</ButtonGhost>
							<ButtonGhost
								leftIcon="logout"
								onClick={() => {
									setShowMenu(false)
									setShow(false)
									setMessage({
										header: 'Deseja realmente sair?',
										content: 'O dados não salvos poderão ser perdidos.',
										type: 'question',
										confirm: () => {
											navigate('/')
											setCurrentUser(null)
										},
									})
								}}
							>
								Sair
							</ButtonGhost>
						</>
					)}
				</Bag>
			</nav>
			<main className={style.mainContent}>
				<Routes>
					{Object.keys(RoutesMap.private).map((routeKey) => {
						const routeDetails = RoutesMap.private[routeKey]
						return (
							<Route
								key={routeKey}
								path={routeDetails.route}
								element={routeDetails.component}
							/>
						)
					})}
					<Route path="*" element={<RedirectToDashboard />} />
				</Routes>
				{loading && <LoadingPage />}
			</main>
		</div>
	)
}
