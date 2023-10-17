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
			if (localStorage.getItem('auth_token')) {
				setStatus('loading')
				setLoading(true)
				axios
					.post('user/me', null, {
						headers: {
							auth_token: localStorage.getItem('auth_token'),
						},
					})
					.then((response) => {
						setStatus('loaded')
						setCurrentUser(response.data)
						setLoading(false)
					})
					.catch((response) => {
						setStatus('loaded')
						localStorage.removeItem('auth_token')
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
