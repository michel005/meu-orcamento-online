import style from './LoginPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import React, { useContext, useState } from 'react'
import { useFormLayout } from '../../hooks/useFormLayout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ErrorUtils } from '../../utils/ErrorUtils'
import { AddressType, CreateUser, UserType } from '../../types/AllTypes'
import { ConfigContext } from '../../contexts/ConfigContext'
import { ChangeUserDefinition } from '../../definitions/ChangeUserDefinition'
import { AddressDefinition } from '../../definitions/AddressDefinition'

export const CreateUserPage = () => {
	const { setLoading } = useContext(ConfigContext)
	const [value, setValue] = useState<{
		user: UserType
		address: AddressType
	}>({
		user: {
			picture: null,
			full_name: null,
			user_name: null,
			email: null,
			phone: null,
			password: null,
		},
		address: {},
	})
	const userFormLayout = useFormLayout<UserType>({
		definition: ChangeUserDefinition(),
		value: value.user,
		onChange: (x) => {
			setValue((y) => {
				y.user = { ...x }
				return { ...y }
			})
		},
	})
	const addressFormLayout = useFormLayout<AddressType>({
		definition: AddressDefinition(),
		value: value.address,
		onChange: (x) => {
			setValue((y) => {
				y.address = { ...x }
				return { ...y }
			})
		},
	})
	const [step, setStep] = useState(0)
	const navigate = useNavigate()

	const createUser = () => {
		userFormLayout.setErrors(null)
		addressFormLayout.setErrors(null)
		setLoading(true)
		axios
			.post('user', value)
			.then((response) => {
				localStorage.setItem('saved_user', response.data.user.user_name)
				navigate('/login')
			})
			.catch((errors) => {
				userFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data.user))
				addressFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data.address))
				if (Object.keys(errors.response.data.user).length > 0) {
					setStep(0)
				} else if (Object.keys(errors.response.data.address).length > 0) {
					setStep(1)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<div className={style.loginPage}>
			{step === 0 && (
				<div className={style.loginForm}>
					<h1>Informe seus dados</h1>
					<div className={style.formContent}>
						{userFormLayout.getField('full_name')}
						{userFormLayout.getField('user_name')}
						{userFormLayout.getField('email')}
						{userFormLayout.getField('birthday')}
						{userFormLayout.getField('phone')}
						{userFormLayout.getField('password')}
						{userFormLayout.getField('error')}
					</div>
					<div className={style.buttonsRow}>
						<ButtonGhost
							leftIcon="keyboard_arrow_left"
							onClick={() => {
								navigate('/')
							}}
						>
							Cancelar
						</ButtonGhost>
						<Button leftIcon="keyboard_arrow_right" onClick={() => setStep(1)}>
							Próximo
						</Button>
					</div>
				</div>
			)}
			{step === 1 && (
				<div className={style.loginForm}>
					<h1>Informe o seu endereço</h1>
					<div className={style.formContent}>
						{addressFormLayout.getField('zip_code')}
						{addressFormLayout.getField('street_name')}
						{addressFormLayout.getField('street_number')}
						{addressFormLayout.getField('complement')}
						{addressFormLayout.getField('city')}
						{addressFormLayout.getField('state')}
						{addressFormLayout.getField('country')}
						{addressFormLayout.getField('error')}
					</div>
					<div className={style.buttonsRow}>
						<ButtonGhost leftIcon="keyboard_arrow_left" onClick={() => setStep(0)}>
							Voltar
						</ButtonGhost>
						<Button leftIcon="keyboard_arrow_right" onClick={() => setStep(2)}>
							Próximo
						</Button>
					</div>
				</div>
			)}
			{step === 2 && (
				<div className={style.loginForm}>
					<h1>Selecione uma foto</h1>
					<div className={style.formContent}>
						<div className={style.userPicture}>
							{userFormLayout.getField('picture')}
						</div>
					</div>
					<div className={style.buttonsRow}>
						<ButtonGhost leftIcon="keyboard_arrow_left" onClick={() => setStep(1)}>
							Voltar
						</ButtonGhost>
						<Button leftIcon="save" onClick={() => createUser()}>
							Salvar
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
