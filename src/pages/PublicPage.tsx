import React, { useContext } from 'react'
import { LoginPage } from './public/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { CreateUserPage } from './public/CreateUserPage'
import { ConfigContext } from '../contexts/ConfigContext'
import { LoadingPage } from './LoadingPage'

export const PublicPage = () => {
	const { loading } = useContext(ConfigContext)

	return (
		<main>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/createUser" element={<CreateUserPage />} />
			</Routes>
			{loading && <LoadingPage />}
		</main>
	)
}
