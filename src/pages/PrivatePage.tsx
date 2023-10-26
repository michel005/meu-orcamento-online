import React, { useContext, useState } from 'react'
import style from './PrivatePage.module.scss'
import { Icon } from '../components/Icon'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { Button, ButtonGhost, ButtonWhite } from '../components/Button'
import { SessionContext } from '../contexts/SessionContext'
import { RoutesMap } from '../constants/RoutesMap'
import { UserPicture } from '../components/UserPicture'
import { LoadingPage } from './LoadingPage'
import { ConfigContext } from '../contexts/ConfigContext'

export const PrivatePage = () => {
	const { loading, setMessage } = useContext(ConfigContext)
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const [showUserMenu, setShowUserMenu] = useState(false)
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
				<div className={style.userInfo}>
					<UserPicture
						className={style.userInfoPicture}
						picture={currentUser?.picture}
						name={currentUser.full_name}
						size="var(--input-height)"
						onClick={() => {
							setShowUserMenu((x) => !x)
						}}
					/>
					{showUserMenu && (
						<div className={style.userInfoOptions}>
							<ButtonWhite
								leftIcon="edit"
								onClick={() => {
									navigate('/my-user')
									setShowMenu(false)
									setShowUserMenu(false)
								}}
							>
								Alterar meus dados
							</ButtonWhite>
							<ButtonWhite
								leftIcon="logout"
								onClick={() => {
									setShowUserMenu(false)
									setShowMenu(false)
									setMessage({
										header: 'Deseja realmente sair?',
										content: 'O dados não salvos poderão ser perdidos.',
										type: 'question',
										confirm: () => {
											navigate('/')
											setCurrentUser(null)
											setShowUserMenu(false)
										},
									})
								}}
							>
								Sair
							</ButtonWhite>
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
				{loading && <LoadingPage />}
			</main>
		</div>
	)
}
