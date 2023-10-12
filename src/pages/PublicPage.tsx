import React from 'react'
import { LoginPage } from './public/LoginPage'
import { Route, Routes } from 'react-router-dom'

export const PublicPage = () => {
	return (
		<main>
			<Routes>
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</main>
	)
}
