import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { DatabaseProvider } from './context/DatabaseContext'
import { ModalProvider } from './context/ModalContext'
import { PageProvider } from './context/PageContext'

export const App = () => {
	return (
		<BrowserRouter>
			<ModalProvider>
				<DatabaseProvider>
					<PageProvider>
						<MainPage />
					</PageProvider>
				</DatabaseProvider>
			</ModalProvider>
		</BrowserRouter>
	)
}
