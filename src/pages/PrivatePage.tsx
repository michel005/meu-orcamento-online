import React, { useContext, useState } from 'react'
import style from './PrivatePage.module.scss'
import { Icon } from '../components/Icon'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { ButtonWhite } from '../components/Button'
import { SessionContext } from '../contexts/SessionContext'
import { RoutesMap } from '../constants/RoutesMap'
import { UserPicture } from '../components/UserPicture'
import { LoadingPage } from './LoadingPage'
import { ConfigContext } from '../contexts/ConfigContext'

export const PrivatePage = () => {
	const { loading, setMessage } = useContext(ConfigContext)
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const [showUserMenu, setShowUserMenu] = useState(false)
	const navigate = useNavigate()

	return (
		<div className={style.privatePage}>
			<nav className={style.navbar}>
				<div className={style.appInfo}>
					<Icon icon="description" />
					<NavLink to="/">Meu Bazar Online</NavLink>
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
								>
									<Icon icon={routeDetails?.icon} className={style.icon} />
									<span>{routeDetails.name}</span>
								</NavLink>
							)
						})}
				</div>
				<div className={style.userInfo}>
					<UserPicture
						picture={currentUser?.picture}
						name={currentUser.full_name}
						size="var(--input-height)"
					/>
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
							<ButtonWhite
								leftIcon="edit"
								onClick={() => {
									navigate('/my-user')
									setShowUserMenu(false)
								}}
							>
								Alterar meus dados
							</ButtonWhite>
							<ButtonWhite
								leftIcon="logout"
								onClick={() => {
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
