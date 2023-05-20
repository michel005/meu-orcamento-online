import React from 'react'
import style from './MainPage.module.scss'
import { Sidebar } from '../modules/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from './DashboardPage'

export const MainPage = () => {
	return (
		<div className={style.mainPage}>
			<Sidebar />
			<div className={style.content}>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
				</Routes>
			</div>
		</div>
	)
}
