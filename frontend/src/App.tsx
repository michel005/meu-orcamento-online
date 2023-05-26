import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { DatabaseProvider } from './context/DatabaseContext'
import { ModalProvider } from './context/ModalContext'

export const App = () => {
	return (
		<BrowserRouter>
			<ModalProvider>
				<DatabaseProvider>
					<MainPage />
				</DatabaseProvider>
			</ModalProvider>
		</BrowserRouter>
	)
}
