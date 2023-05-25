import React from 'react'
import style from './MainPage.module.scss'
import { Sidebar } from '../modules/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from './DashboardPage'
import { AccountPage } from './AccountPage'
import { MovementPage } from './MovementPage'

export const MainPage = () => {
	return (
		<div className={style.mainPage}>
			<Sidebar />
			<div className={style.content}>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/accounts" element={<AccountPage />} />
					<Route path="/movements" element={<MovementPage />} />
				</Routes>
			</div>
		</div>
	)
}
