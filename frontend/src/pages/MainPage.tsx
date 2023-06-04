import React, { useContext } from 'react'
import style from './MainPage.module.scss'
import { Sidebar } from '../modules/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from './dashboard/DashboardPage'
import { AccountPage } from './account/AccountPage'
import { MovementPage } from './movement/MovementPage'
import { SettingsPage } from './SettingsPage'
import { DatabaseContext } from '../context/DatabaseContext'
import { ModalContainer } from '../modules/ModalContainer'
import { TemplatePage } from './template/TemplatePage'
import { GoalPage } from './goal/GoalPage'

export const MainPage = () => {
	const { settings, loading } = useContext(DatabaseContext)

	return (
		<div className={style.mainPage} data-color-schema={settings?.colorSchema || 'blue'}>
			<Sidebar />
			{!loading && (
				<div className={style.content}>
					<Routes>
						<Route path="/" element={<DashboardPage />} />
						<Route path="/accounts" element={<AccountPage />} />
						<Route path="/movements" element={<MovementPage />} />
						<Route path="/template" element={<TemplatePage />} />
						<Route path="/goals" element={<GoalPage />} />
						<Route path="/settings" element={<SettingsPage />} />
					</Routes>
				</div>
			)}
			<ModalContainer />
		</div>
	)
}
