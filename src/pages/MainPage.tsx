import React, { useContext } from 'react'
import { PublicPage } from './PublicPage'
import { SessionContext } from '../contexts/SessionContext'
import { PrivatePage } from './PrivatePage'

export const MainPage = () => {
	const { status: statusSession, currentUser } = useContext(SessionContext)

	if (statusSession === 'loading') {
		return <h1>Carregando sessão...</h1>
	}

	return <div>{currentUser ? <PrivatePage /> : <PublicPage />}</div>
}
