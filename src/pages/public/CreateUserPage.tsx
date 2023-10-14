import style from './LoginPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import React, { useState } from 'react'
import { useFormLayout } from '../../hooks/useFormLayout'
import axios from 'axios'
import { CreateUserDefinition } from '../../definitions/CreateUserDefinition'
import { useNavigate } from 'react-router-dom'
import { ErrorUtils } from '../../utils/ErrorUtils'
import { CreateUser } from '../../types/AllTypes'

export const CreateUserPage = () => {
	const [value, setValue] = useState<CreateUser>({
		full_name: null,
		user_name: null,
		email: null,
		password: null,
		agree_terms: false,
	})
	const { fields, setErrors } = useFormLayout<CreateUser>({
		definition: CreateUserDefinition(),
		value: value,
		onChange: setValue,
	})
	const navigate = useNavigate()

	const createUser = () => {
		setErrors(null)
		if (!value.agree_terms) {
			setErrors(ErrorUtils.singleError('error', 'Aceite os termos de uso'))
			return
		}
		axios
			.post('user', {
				full_name: value.full_name,
				user_name: value.user_name,
				email: value.email,
				password: value.password,
			})
			.then((response) => {
				localStorage.setItem('saved_user', response.data.user_name)
				navigate('/')
			})
			.catch((errors) => {
				setErrors(ErrorUtils.convertErrors(errors.response.data))
			})
	}

	return (
		<div className={style.loginPage}>
			<div className={style.loginForm}>
				<h1>Crie um novo usuário</h1>
				{fields.full_name}
				{fields.user_name}
				{fields.email}
				{fields.password}
				<div style={{ alignSelf: 'flex-end' }}>{fields.agree_terms}</div>
				{fields.error}
				<div className={style.buttons}>
					<Button leftIcon="save" onClick={createUser}>
						Cadastrar
					</Button>
					<ButtonGhost
						leftIcon="keyboard_arrow_left"
						onClick={() => {
							navigate('/')
						}}
					>
						Voltar
					</ButtonGhost>
				</div>
			</div>
		</div>
	)
}
