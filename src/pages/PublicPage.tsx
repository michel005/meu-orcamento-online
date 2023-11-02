import React, { useContext, useEffect } from 'react'
import { LoginPage } from './public/LoginPage'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { CreateUserPage } from './public/CreateUserPage'
import { ConfigContext } from '../contexts/ConfigContext'
import { LoadingPage } from './LoadingPage'

const RedirectToLogin = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/login')
	}, [])

	return <></>
}

export const PublicPage = () => {
	const { loading } = useContext(ConfigContext)

	return (
		<main>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/createUser" element={<CreateUserPage />} />
				<Route path="*" element={<RedirectToLogin />} />
			</Routes>
			{loading && <LoadingPage />}
		</main>
	)
}
