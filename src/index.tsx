import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import './index.scss'
import axios from 'axios'
import { SessionProvider } from './contexts/SessionContext'
import { ConfigProvider } from './contexts/ConfigContext'
import { DataCacheProvider } from './contexts/DataCacheContext'

axios.defaults.baseURL = 'http://localhost:8080/api'

const container = document.getElementById('root')
createRoot(container!).render(
	<BrowserRouter>
		<DataCacheProvider>
			<ConfigProvider>
				<SessionProvider>
					<MainPage />
				</SessionProvider>
			</ConfigProvider>
		</DataCacheProvider>
	</BrowserRouter>
)
