import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ConfigContext } from './ConfigContext'

export type SessionContextType = {
	currentUser: any
	setCurrentUser: any
	status: 'idle' | 'loading' | 'loaded'
}

export const SessionContext = React.createContext<SessionContextType>({
	currentUser: null,
	setCurrentUser: () => null,
	status: 'idle',
})

export const SessionProvider = ({ children }: { children: any }) => {
	const { setLoading } = useContext(ConfigContext)
	const [currentUser, setCurrentUser] = useState(null)
	const [status, setStatus] = useState<'idle' | 'loading' | 'loaded'>('idle')

	useEffect(() => {
		if (status === 'idle') {
			setStatus('loading')
			setLoading(true)
			if (localStorage.getItem('auth_token')) {
				axios
					.post('user/me', null, {
						headers: {
							auth_token: localStorage.getItem('auth_token'),
						},
					})
					.then((response) => {
						setCurrentUser(response.data)
					})
					.catch((response) => {
						localStorage.removeItem('auth_token')
					})
					.finally(() => {
						setStatus('loaded')
						setLoading(false)
					})
			} else {
				setStatus('loaded')
			}
		}
	}, [status])

	useEffect(() => {
		if (status === 'loaded' && !currentUser) {
			localStorage.removeItem('auth_token')
		}
	}, [status, currentUser])

	return (
		<SessionContext.Provider value={{ currentUser, setCurrentUser, status }}>
			{children}
		</SessionContext.Provider>
	)
}
