import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { ConfigProvider } from './contexts/ConfigContext'

export const App = () => {
	return (
		<BrowserRouter>
			<ConfigProvider>
				<MainPage />
			</ConfigProvider>
		</BrowserRouter>
	)
}
