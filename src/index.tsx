import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import './index.scss'
import axios from 'axios'
import { SessionProvider } from './contexts/SessionContext'
import { ConfigProvider } from './contexts/ConfigContext'

axios.defaults.baseURL = 'http://192.168.0.110:8080/api'

const container = document.getElementById('root')
createRoot(container!).render(
	<BrowserRouter>
		<ConfigProvider>
			<SessionProvider>
				<MainPage />
			</SessionProvider>
		</ConfigProvider>
	</BrowserRouter>
)
