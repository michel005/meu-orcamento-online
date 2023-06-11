import React from 'react'
import style from './MainPage.module.scss'
import { Sidebar } from '../modules/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { ProductPage } from './product/ProductPage'
import { ModalContainer } from '../modules/ModalContainer'
import { CSSProperties } from 'styled-components'
import { Navbar } from '../modules/Navbar'
import { ProductDetail } from './product/ProductDetail'
import { ProductOutput } from './product/ProductOutput'
import { CustomerPage } from './customer/CustomerPage'
import { CustomerDetail } from './customer/CustomerDetail'

export const MainPage = () => {
	const colorSchema = '#3399ff'

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
			<Navbar />
			<div className={style.sidebarAndContent}>
				<Sidebar />
				<div className={style.content}>
					<Routes>
						<Route path="/" element={<></>} />
						<Route path="/product" element={<ProductPage />} />
						<Route path="/product/output" element={<ProductOutput />} />
						<Route path="/product/details" element={<ProductDetail />} />
						<Route path="/customer" element={<CustomerPage />} />
						<Route path="/customer/details" element={<CustomerDetail />} />
					</Routes>
				</div>
				<ModalContainer />
			</div>
		</div>
	)
}
