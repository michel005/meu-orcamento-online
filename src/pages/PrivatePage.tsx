import React, { useContext, useEffect, useMemo } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Bag } from '../components/Bag'
import { Button, ButtonGhost } from '../components/Button'
import { Icon } from '../components/Icon'
import { UserPicture } from '../components/UserPicture'
import { RoutesMap } from '../constants/RoutesMap'
import { ConfigContext } from '../contexts/ConfigContext'
import { SessionContext } from '../contexts/SessionContext'
import { usePage } from '../hooks/usePage'
import { LoadingPage } from './LoadingPage'
import style from './PrivatePage.module.scss'

const RedirectToDashboard = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/')
	}, [])

	return <></>
}

const RouteButton = ({ routeDetails, rightBag = undefined }) => {
	const navigate = useNavigate()

	const allRoutes = Object.keys(RoutesMap.private).map((route) => RoutesMap.private[route])
	const currentRoute = useMemo(
		() => allRoutes.find((route) => location.pathname === route.route),
		[location.pathname]
	)

	return (
		<ButtonGhost
			leftIcon={routeDetails?.icon}
			data-active={currentRoute?.route === routeDetails?.route}
			onClick={() => {
				navigate(routeDetails?.route)
			}}
			rightIcon={
				currentRoute?.route === routeDetails?.route ? 'keyboard_arrow_right' : undefined
			}
			rightBag={rightBag}
		>
			{routeDetails?.name}
		</ButtonGhost>
	)
}

export const PrivatePage = () => {
	const { formLayout } = usePage('main', () => ({
		sidebar_search: {
			leftSide: <ButtonGhost disabled={true} leftIcon="search" />,
			placeholder: 'Buscar',
			type: 'text',
		},
	}))
	const { loading, setMessage, showSidebar, setShowSidebar } = useContext(ConfigContext)
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const navigate = useNavigate()
	const location = useLocation()

	const allRoutes = Object.keys(RoutesMap.private).map((route) => RoutesMap.private[route])

	const currentRoute = useMemo(
		() => allRoutes.find((route) => location.pathname === route.route),
		[location.pathname]
	)

	return (
		<div className={style.privatePage}>
			<section className={style.header}>
				<Icon className={style.logo} icon="shopping_bag" />
				<div className={style.headerAppInfo}>
					<h1>Meu Bazar Online</h1>
				</div>
			</section>
			<section className={style.pageInfo}>
				<div className={style.pageInfoHeader}>
					<h1>{currentRoute?.name}</h1>
					<p>{currentRoute?.description}</p>
				</div>
				<div className={style.pageInfoUser}>
					<div className={style.pageInfoUserOptions}>
						<Button leftIcon="notifications" rightBag={''} />
						<Button leftIcon="settings" />
					</div>
					<hr />
					<Bag
						button={(show, setShow) => (
							<div
								className={style.pageInfoUserButton}
								onClick={() => {
									setShow((x) => !x)
								}}
							>
								<UserPicture
									picture={currentUser?.picture?.value}
									name={currentUser?.full_name}
									size="48px"
									randomId={Math.random()}
								/>
								<div className={style.pageInfoUserButtonInfo}>
									<h3>{currentUser.full_name}</h3>
									<p>{currentUser.email}</p>
								</div>
								<Icon icon={show ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
							</div>
						)}
						arrowPosition="top-right"
					>
						{(show, setShow) => (
							<>
								<ButtonGhost
									leftIcon="edit"
									onClick={() => {
										setShow(false)
										navigate('/my-user')
									}}
								>
									Alterar Perfil
								</ButtonGhost>
								<ButtonGhost
									leftIcon="logout"
									onClick={() => {
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
				</div>
			</section>
			<section className={style.sidebar}>
				{formLayout.getField('sidebar_search')}
				<label>Funcionalidades</label>
				<RouteButton routeDetails={RoutesMap.private.dashboard} />
				<RouteButton routeDetails={RoutesMap.private.customers} />
				<RouteButton routeDetails={RoutesMap.private.products} />
				<RouteButton routeDetails={RoutesMap.private.myUser} />
				<label>Produtos</label>
				<RouteButton routeDetails={RoutesMap.private.sells} />
				<RouteButton routeDetails={RoutesMap.private.payments} />
				<label>Redes Sociais</label>
				<RouteButton routeDetails={RoutesMap.private.facebook} />
				<RouteButton routeDetails={RoutesMap.private.instagram} />
				<RouteButton routeDetails={RoutesMap.private.mercadoLivre} />
				<div style={{ flexGrow: 1 }} />
				<label>Tópicos</label>
				<RouteButton routeDetails={RoutesMap.private.support} />
				<RouteButton routeDetails={RoutesMap.private.getStarted} />
			</section>
			<section className={style.content}>
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
			</section>
		</div>
	)
}
