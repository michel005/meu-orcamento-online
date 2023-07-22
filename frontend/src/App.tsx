import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { DatabaseProvider } from './context/DatabaseContext'
import { ModalProvider } from './context/ModalContext'
import { PageProvider } from './context/PageContext'
import { ModalContainer } from './modules/ModalContainer'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ModalProvider>
					<DatabaseProvider>
						<PageProvider>
							<MainPage />
							<ModalContainer />
						</PageProvider>
					</DatabaseProvider>
				</ModalProvider>
			</QueryClientProvider>
		</BrowserRouter>
	)
}
