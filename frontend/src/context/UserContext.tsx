import * as React from 'react'
import { useState, useEffect } from 'react'
import { GoogleUser } from '../types/GoogleUser'
import axios, { AxiosResponse } from 'axios'
import { TokenResponse } from '@react-oauth/google'

type UserType = GoogleUser | null

type UserContextType = {
	user?: UserType
	setUser?: any
	logout?: () => void
}

export const UserContext = React.createContext<UserContextType>({})

export const UserProvider = ({ children }: any) => {
	const [user, setUser] = useState<UserType>(null)
	const [loaded, setLoaded] = useState<boolean>(false)

	const logout = () => {
		localStorage.removeItem('profile')
		setUser(null)
		setLoaded(false)
	}

	useEffect(() => {
		if (!loaded && user?.access_token) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: 'application/json',
						},
					}
				)
				.then((res) => {
					setLoaded(true)
					setUser((x: any) => ({
						...res.data,
						...x,
					}))
				})
				.catch((err: any) => console.log(err))
		}
	}, [loaded, user])

	useEffect(() => {
		if (!loaded && localStorage.getItem('profile')) {
			const loadedUser = JSON.parse(localStorage.getItem('profile') || '')
			setUser(loadedUser)
			setLoaded(true)
		} else if (user) {
			localStorage.setItem('profile', JSON.stringify(user))
		}
	}, [user, loaded])

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
