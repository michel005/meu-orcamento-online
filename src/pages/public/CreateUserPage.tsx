import style from './LoginPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import React, { useContext, useState } from 'react'
import { useFormLayout } from '../../hooks/useFormLayout'
import axios from 'axios'
import { CreateUserDefinition } from '../../definitions/CreateUserDefinition'
import { useNavigate } from 'react-router-dom'
import { ErrorUtils } from '../../utils/ErrorUtils'
import { CreateUser } from '../../types/AllTypes'
import { ConfigContext } from '../../contexts/ConfigContext'

export const CreateUserPage = () => {
	const { setLoading } = useContext(ConfigContext)
	const [value, setValue] = useState<CreateUser>({
		picture: null,
		full_name: null,
		user_name: null,
		email: null,
		phone: null,
		password: null,
		agree_terms: false,
	})
	const { getField, setErrors } = useFormLayout<CreateUser>({
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
		setLoading(true)
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
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<div className={style.loginPage}>
			<div className={style.loginForm}>
				<h1>Crie um novo usuário</h1>
				{getField('full_name')}
				{getField('user_name')}
				{getField('email')}
				{getField('birthday')}
				{getField('phone')}
				{getField('password')}
				<div style={{ alignSelf: 'flex-end' }}>{getField('agree_terms')}</div>
				{getField('error')}
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
