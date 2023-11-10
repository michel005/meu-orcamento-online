import style from './LoginPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import React, { useContext, useState } from 'react'
import { useFormLayout } from '../../hooks/useFormLayout'
import { LoginFormDefinition } from '../../definitions/LoginFormDefinition'
import { useNavigate } from 'react-router-dom'
import { useUserLogin } from '../../business/user/useUserLogin'
import { SessionContext } from '../../contexts/SessionContext'
import { UserType } from '../../types/AllTypes'

export const LoginPage = () => {
	const { saveUserSession } = useContext(SessionContext)
	const navigate = useNavigate()
	const [value, setValue] = useState({
		user_name: localStorage.getItem('saved_user'),
		password: '',
		remember_me: !!localStorage?.saved_user,
	})
	const { getField, setErrors } = useFormLayout({
		definition: LoginFormDefinition(),
		value: value,
		onChange: setValue,
	})
	const userLogin = useUserLogin({
		onSuccess: (userInfo: UserType & { token: string }) => {
			saveUserSession(userInfo, value.remember_me)
		},
		onError: (errors: any) => {
			setErrors(errors)
		},
	})

	const onClickLogin = () => {
		setErrors(null)
		userLogin.run({
			userName: value.user_name,
			password: value.password,
		})
	}

	const onClickCreateUser = () => {
		navigate('/createUser')
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
					<Button leftIcon="login" onClick={onClickLogin}>
						Entrar
					</Button>
					<ButtonGhost leftIcon="person_add" onClick={onClickCreateUser}>
						Cadastrar-se
					</ButtonGhost>
				</div>
			</div>
		</div>
	)
}
