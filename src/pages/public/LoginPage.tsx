import style from './LoginPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import React, { useContext, useState } from 'react'
import { useFormLayout } from '../../hooks/useFormLayout'
import { LoginFormDefinition } from '../../definitions/LoginFormDefinition'
import axios from 'axios'
import { SessionContext } from '../../contexts/SessionContext'
import { useNavigate } from 'react-router-dom'
import { ErrorUtils } from '../../utils/ErrorUtils'

export const LoginPage = () => {
	const { setCurrentUser } = useContext(SessionContext)
	const [error, setError] = useState(null)
	const [value, setValue] = useState({
		user_name: localStorage.getItem('saved_user'),
		password: '',
		remember_me: localStorage?.saved_user,
	})
	const { fields, setErrors } = useFormLayout({
		definition: LoginFormDefinition(),
		value: value,
		onChange: setValue,
	})
	const navigate = useNavigate()

	const login = () => {
		setErrors(null)
		axios
			.post('user/login', {
				user_name: value.user_name,
				password: value.password,
			})
			.then((response) => {
				setCurrentUser(response.data)
				localStorage.setItem('auth_token', response.data.token)
				localStorage.setItem('saved_user', value.user_name)
			})
			.catch((errors) => {
				setErrors(ErrorUtils.convertErrors(errors.response.data))
			})
	}

	return (
		<div className={style.loginPage}>
			<div className={style.loginForm}>
				<h1>Acesse sua conta</h1>
				{fields.user_name}
				{fields.password}
				{fields.remember_me}
				{fields.error}
				<Button leftIcon="login" onClick={login}>
					Entrar
				</Button>
				<hr data-value="OU" />
				<ButtonGhost
					leftIcon="person_add"
					onClick={() => {
						navigate('/createUser')
					}}
				>
					Cadastrar-se
				</ButtonGhost>
			</div>
		</div>
	)
}
