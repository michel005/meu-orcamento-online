import React from 'react'
import style from './MainPage.module.scss'
import { Route, Routes } from 'react-router-dom'
import { SidebarOptions } from '../../constants/SidebarOptions'
import { MainPageNavbar } from './MainPageNavbar'
import { MainPageContextOptions } from './MainPageContextOptions'

export const MainPage = () => {
	return (
		<main className={style.mainPage}>
			<MainPageNavbar />
			<MainPageContextOptions />
			<div className={style.content}>
				<div className={style.centeredContent}>
					<Routes>
						{SidebarOptions.map((value) => {
							return (
								<Route key={value.path} path={value.path} element={value.option} />
							)
						})}
					</Routes>
				</div>
			</div>
		</main>
	)
}
