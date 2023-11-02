import style from './LoginPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import React, { useContext, useState } from 'react'
import { useFormLayout } from '../../hooks/useFormLayout'
import { LoginFormDefinition } from '../../definitions/LoginFormDefinition'
import axios from 'axios'
import { SessionContext } from '../../contexts/SessionContext'
import { useNavigate } from 'react-router-dom'
import { ErrorUtils } from '../../utils/ErrorUtils'
import { ConfigContext } from '../../contexts/ConfigContext'

export const LoginPage = () => {
	const { setLoading } = useContext(ConfigContext)
	const { setCurrentUser } = useContext(SessionContext)
	const [value, setValue] = useState({
		user_name: localStorage.getItem('saved_user'),
		password: '',
		remember_me: !!localStorage?.saved_user,
	})
	const { getField, setErrors } = useFormLayout<any>({
		definition: LoginFormDefinition(),
		value: value,
		onChange: setValue,
	})
	const navigate = useNavigate()

	const login = () => {
		setErrors(null)
		setLoading(true)
		axios
			.post('user/login', {
				user_name: value.user_name,
				password: value.password,
			})
			.then((response) => {
				setCurrentUser({
					...response.data,
					token: undefined,
				})
				localStorage.setItem('auth_token', response.data.token)
				if (value.remember_me) {
					localStorage.setItem('saved_user', value.user_name)
				} else {
					localStorage.removeItem('saved_user')
				}
			})
			.catch((errors) => {
				setErrors(ErrorUtils.convertErrors(errors.response.data))
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<div className={style.loginPage}>
			<div className={style.loginForm}>
				<h1>Acesse sua conta</h1>
				{getField('user_name')}
				{getField('password')}
				{getField('remember_me')}
				{getField('error')}
				<div className={style.buttons}>
					<Button leftIcon="login" onClick={login}>
						Entrar
					</Button>
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
		</div>
	)
}
