import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/mainPage/MainPage'
import { DatabaseProvider } from './context/DatabaseContext'
import { ModalProvider } from './context/ModalContext'
import { PageProvider } from './context/PageContext'
import { ModalContainer } from './modules/ModalContainer'

export const App = () => {
	return (
		<BrowserRouter>
			<ModalProvider>
				<DatabaseProvider>
					<PageProvider>
						<MainPage />
						<ModalContainer />
					</PageProvider>
				</DatabaseProvider>
			</ModalProvider>
		</BrowserRouter>
	)
}
