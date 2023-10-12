import style from './LoginPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import React, { useContext, useState } from 'react'
import { useFormLayout } from '../../hooks/useFormLayout'
import { LoginFormDefinition } from '../../definitions/LoginFormDefinition'
import axios from 'axios'
import { SessionContext } from '../../contexts/SessionContext'

export const LoginPage = () => {
	const { setCurrentUser } = useContext(SessionContext)
	const [error, setError] = useState(null)
	const [value, setValue] = useState({
		user_name: localStorage.getItem('saved_user'),
		password: '',
		remember_me: localStorage?.saved_user,
	})
	const { fields } = useFormLayout({
		definition: LoginFormDefinition(),
		value: value,
		onChange: setValue,
	})

	const login = () => {
		setError(null)
		axios
			.post('user/login', {
				user_name: value.user_name,
				password: value.password,
			})
			.then((response) => {
				setCurrentUser(response.data)
				localStorage.setItem('auth_token', response.data.token)
				localStorage.setItem('saved_user', response.data.user_name)
			})
			.catch((errors) => {
				setError(errors.response.data.message)
			})
	}

	return (
		<div className={style.loginPage}>
			<div className={style.loginForm}>
				<h1>Acesse sua conta</h1>
				{fields.user_name}
				{fields.password}
				{fields.remember_me}
				{error && <div className={style.error}>{error}</div>}
				<Button leftIcon="login" onClick={login}>
					Entrar
				</Button>
				<hr data-value="OU" />
				<ButtonGhost leftIcon="person_add">Cadastrar-se</ButtonGhost>
			</div>
		</div>
	)
}
