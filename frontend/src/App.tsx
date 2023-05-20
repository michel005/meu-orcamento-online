import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'

export const App = () => {
	return (
		<BrowserRouter>
			<MainPage />
		</BrowserRouter>
	)
}
