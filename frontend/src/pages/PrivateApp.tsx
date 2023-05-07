import React from 'react'
import styled from 'styled-components'
import { Sidebar } from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from './private/DashboardPage'
import { MenuBookPage } from './private/MenuBookPage'

export const PrivateAppStyle = styled.div`
	background-color: var(--background-color);
	display: flex;
	flex-direction: row;
	gap: 0 !important;
	height: 100%;
	left: 0;
	overflow-y: auto;
	position: fixed;
	top: 0;
	width: 100%;

	& > main {
		flex-grow: 1;
		height: 100%;
		max-height: 100%;
		overflow-y: auto;
		width: 100%;
	}
`

export const PrivateApp = () => {
	return (
		<PrivateAppStyle>
			<Sidebar />
			<main>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/menuBook" element={<MenuBookPage />} />
				</Routes>
			</main>
		</PrivateAppStyle>
	)
}
