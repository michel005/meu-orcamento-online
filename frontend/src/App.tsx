import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { DatabaseProvider } from './context/DatabaseContext'

export const App = () => {
	return (
		<BrowserRouter>
			<DatabaseProvider>
				<MainPage />
			</DatabaseProvider>
		</BrowserRouter>
	)
}
