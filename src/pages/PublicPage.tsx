import React from 'react'
import { LoginPage } from './public/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { CreateUserPage } from './public/CreateUserPage'

export const PublicPage = () => {
	return (
		<main>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/createUser" element={<CreateUserPage />} />
			</Routes>
		</main>
	)
}
