import React, { useContext } from 'react'
import style from './MainPage.module.scss'
import { Sidebar } from '../modules/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from './DashboardPage'
import { AccountPage } from './AccountPage'
import { MovementPage } from './MovementPage'
import { SettingsPage } from './SettingsPage'
import { DatabaseContext } from '../context/DatabaseContext'
import { ModalByEntity, ModalContext } from '../context/ModalContext'

const ModalContainer = () => {
	const { modalCollection } = useContext(ModalContext)

	return (
		<>
			{modalCollection.map((modal) => {
				const Modal: any = ModalByEntity.find(([entity]) => {
					return entity === modal.entity
				})
				const ModalTag = Modal[1]
				return <ModalTag key={Modal[0]} entity={modal.modal} />
			})}
		</>
	)
}

export const MainPage = () => {
	const { settings } = useContext(DatabaseContext)

	return (
		<div className={style.mainPage} data-color-schema={settings?.colorSchema || 'blue'}>
			<Sidebar />
			<div className={style.content}>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/accounts" element={<AccountPage />} />
					<Route path="/movements" element={<MovementPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</div>
			<ModalContainer />
		</div>
	)
}
