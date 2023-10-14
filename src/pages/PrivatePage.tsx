import React, { useContext, useState } from 'react'
import style from './PrivatePage.module.scss'
import { Icon } from '../components/Icon'
import { NavLink, Route, Routes } from 'react-router-dom'
import { ButtonWhite } from '../components/Button'
import { SessionContext } from '../contexts/SessionContext'
import { RoutesMap } from '../constants/RoutesMap'

export const PrivatePage = () => {
	const { currentUser } = useContext(SessionContext)
	const [showUserMenu, setShowUserMenu] = useState(false)
	const [reducedSidebar, setReducedSidebar] = useState(false)

	return (
		<div className={style.privatePage}>
			<nav className={style.navbar}>
				<div className={style.appInfo}>
					<Icon icon="description" />
					<NavLink to="/">Meu Orçamento Online</NavLink>
				</div>
				<div className={style.navbarOptions}>
					{Object.keys(RoutesMap.private).map((routeKey) => {
						const routeDetails = RoutesMap.private[routeKey]
						return (
							<NavLink
								key={routeKey}
								to={routeDetails.route}
								className={({ isActive }) => (isActive ? style.active : '')}
							>
								<Icon icon={routeDetails?.icon} className={style.icon} />
								<span>{routeDetails.name}</span>
							</NavLink>
						)
					})}
				</div>
				<div className={style.userInfo}>
					{currentUser?.picture && <img src={currentUser.picture} />}
					<ButtonWhite
						rightIcon={showUserMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
						onClick={() => {
							setShowUserMenu((x) => !x)
						}}
					>
						{currentUser.full_name}
					</ButtonWhite>
					{showUserMenu && (
						<div className={style.userInfoOptions}>
							<ButtonWhite leftIcon="edit">Alterar meus dados</ButtonWhite>
							<ButtonWhite leftIcon="logout">Sair</ButtonWhite>
						</div>
					)}
				</div>
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
				</Routes>
			</main>
		</div>
	)
}
