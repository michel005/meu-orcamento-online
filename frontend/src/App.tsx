import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext'
import { UserContext, UserProvider } from './context/UserContext'
import { ModalModule } from './modules/ModalModule'
import { PrivateApp } from './pages/PrivateApp'
import { PublicApp } from './pages/PublicApp'

export const MainApp = () => {
	const { user } = useContext(UserContext)

	if (user) {
		return <PrivateApp />
	} else {
		return <PublicApp />
	}
}

export const App = () => {
	return (
		<BrowserRouter>
			<UserProvider>
				<GoogleOAuthProvider clientId="796877403322-qqueenna0o5vd8aupsdhguuda8acfpgs.apps.googleusercontent.com">
					<ModalProvider>
						<MainApp />
						<ModalModule />
					</ModalProvider>
				</GoogleOAuthProvider>
			</UserProvider>
		</BrowserRouter>
	)
}

