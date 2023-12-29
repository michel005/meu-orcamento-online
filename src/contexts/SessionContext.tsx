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

	const getUserWithAuthToken = () => {
		setStatus('loading')
		setLoading(true)
		axios
			.get('user/me', {
				headers: {
					authorization: `Baerer ${localStorage.getItem('auth_token')}`,
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
	}

	useEffect(() => {
		if (status === 'idle') {
			if (localStorage.getItem('auth_token')) {
				getUserWithAuthToken()
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

	const saveUserSession = (
		userInfo: {
			user: UserType
			token: string
		},
		rememberMe: boolean
	) => {
		localStorage.setItem('auth_token', userInfo.token)
		getUserWithAuthToken()
		if (rememberMe) {
			localStorage.setItem('saved_user', userInfo.user.user_name)
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
