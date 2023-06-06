import React, { useContext } from 'react'
import style from './MainPage.module.scss'
import { Sidebar } from '../modules/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from './dashboard/DashboardPage'
import { AccountPage } from './account/AccountPage'
import { MovementPage } from './movement/MovementPage'
import { SettingsPage } from './settings/SettingsPage'
import { DatabaseContext } from '../context/DatabaseContext'
import { ModalContainer } from '../modules/ModalContainer'
import { TemplatePage } from './template/TemplatePage'
import { GoalPage } from './goal/GoalPage'
import { CSSProperties } from 'styled-components'
import { Button } from '../components/Button'

export const MainPage = () => {
	const { settings, loading } = useContext(DatabaseContext)

	const colorSchema = settings?.colorSchema || '#3399ff'

	return (
		<div
			className={style.mainPage}
			style={
				{
					'--active-color': colorSchema,
					'--active-color-aa': `${colorSchema}aa`,
					'--active-color-cc': `${colorSchema}cc`,
					'--active-color-99': `${colorSchema}99`,
					'--active-color-66': `${colorSchema}66`,
					'--active-color-33': `${colorSchema}33`,
					'--background-color': `${colorSchema}11`,
				} as CSSProperties
			}
		>
			<Sidebar />
			{loading && (
				<div className={style.loading}>
					<Button variation="link" disabled={true} leftIcon="refresh" />
				</div>
			)}
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
			<ModalContainer />
		</div>
	)
}
