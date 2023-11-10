import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ConfigContext } from './ConfigContext'
import { UserType } from '../types/AllTypes'

export type SessionContextType = {
	currentUser: any
	setCurrentUser: any
	saveUserSession: any
	status: 'idle' | 'loading' | 'loaded'
}

export const SessionContext = React.createContext<SessionContextType>({
	currentUser: null,
	setCurrentUser: () => null,
	status: 'idle',
	saveUserSession: () => {},
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
						setCurrentUser(null)
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

	const saveUserSession = (userInfo: UserType & { token: string }, rememberMe: boolean) => {
		setCurrentUser({
			...userInfo,
			token: undefined,
		})
		localStorage.setItem('auth_token', userInfo.token)
		if (rememberMe) {
			localStorage.setItem('saved_user', userInfo.user_name)
		} else {
			localStorage.removeItem('saved_user')
		}
	}

	return (
		<SessionContext.Provider value={{ currentUser, setCurrentUser, status, saveUserSession }}>
			{children}
		</SessionContext.Provider>
	)
}
