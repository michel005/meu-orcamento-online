import React from 'react'
import style from './MainPage.module.scss'
import { Text } from '../components/Text'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Button } from '../components/Button'
import { Bag } from '../components/Bag'
import { DashboardPage } from './dashboard'
import { usePageData } from '../hook/usePageData'
import { ButtonToolbar } from '../components/ButtonToolbar'
import { EatingPage } from './eating'
import { GymPage } from './gym'

export const MainPage = () => {
	const { data, updateData } = usePageData<{
		showNotifications: boolean
		showUserOptions: boolean
	}>('main', {
		showNotifications: false,
		showUserOptions: false,
	})

	const activeCheck = ({ isActive }: any) => (isActive ? style.active : undefined)

	return (
		<main className={style.mainPage}>
			<div className={style.background} />
			<div className={style.navbar}>
				<Text leftIcon="shopping_cart" className={style.navbarLogo}>
					Grigo Training
				</Text>
				<div className={style.navbarOptions} data-navbar-options={true}>
					<NavLink to="/" className={activeCheck}>
						Dashboard
					</NavLink>
					<NavLink to="/eating" className={activeCheck}>
						Alimentação
					</NavLink>
					<NavLink to="/gym" className={activeCheck}>
						Academia
					</NavLink>
				</div>
				<div className={style.navbarNotification}>
					<Button
						leftIcon="notifications"
						onClick={() => {
							updateData({
								...data,
								showNotifications: !data.showNotifications,
							})
						}}
						variation="link"
					>
						<Bag color="red" fixed={true} side="right">
							+9
						</Bag>
					</Button>
					{data.showNotifications && (
						<>
							<div
								className={style.navbarNotificationListBackground}
								onClick={() => {
									updateData({
										...data,
										showNotifications: false,
									})
								}}
							/>
							<div className={style.navbarNotificationList}>
								<ButtonToolbar>
									<h3 style={{ flexGrow: 1 }}>Notificações</h3>
									<Button variation="link">Limpar Todas</Button>
								</ButtonToolbar>
							</div>
						</>
					)}
				</div>
				<div className={style.navbarUserOptions}>
					<div className={style.navbarFakeUserImage} />
					<div
						className={style.navbarUserInfo}
						onClick={() => {
							updateData({
								...data,
								showUserOptions: !data.showUserOptions,
							})
						}}
					>
						<div className={style.navbarUserFullName}>Michel Douglas Grigori</div>
						<div className={style.navbarUserEmail}>mdgrigoli@hotmail.com.br</div>
					</div>
					{data.showUserOptions && (
						<div className={style.navbarUserOptionsList}>
							<ButtonToolbar>
								<h3>Opções do Usuário</h3>
							</ButtonToolbar>
							<Button variation="link">Alterar Perfil</Button>
							<Button variation="link">Sair da Conta</Button>
						</div>
					)}
				</div>
				{data.showUserOptions && (
					<div
						className={style.navbarUserOptionsBackground}
						onClick={() => {
							updateData({
								...data,
								showUserOptions: false,
							})
						}}
					/>
				)}
			</div>
			<div className={style.content}>
				<Routes>
					<Route path={'/'} element={<DashboardPage />} />
					<Route path={'/eating'} element={<EatingPage />} />
					<Route path={'/gym'} element={<GymPage />} />
				</Routes>
			</div>
		</main>
	)
}
