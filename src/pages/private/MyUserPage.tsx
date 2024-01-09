import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button } from '../../components/Button'
import { ConfigContext } from '../../contexts/ConfigContext'
import { SessionContext } from '../../contexts/SessionContext'
import { AddressDefinition } from '../../definitions/AddressDefinition'
import { ChangePasswordDefinition } from '../../definitions/ChangePasswordDefinition'
import { ChangeUserDefinition } from '../../definitions/ChangeUserDefinition'
import { useFormLayout } from '../../hooks/useFormLayout'
import { AddressType, ChangePasswordType, UserType } from '../../types/AllTypes'
import { ErrorUtils } from '../../utils/ErrorUtils'
import style from './MyUserPage.module.scss'

export const MyUserPage = () => {
	const { setLoading, setMessage } = useContext(ConfigContext)
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const [user, setUser] = useState<UserType>(currentUser)
	const [changePassword, setChangePassword] = useState<ChangePasswordType>({
		old_password: '',
		new_password: '',
		new_password_confirm: '',
	})
	const userFormLayout = useFormLayout<UserType>({
		definition: ChangeUserDefinition(currentUser),
		value: user,
		onChange: (x) => {
			setUser(x)
		},
	})
	const addressFormLayout = useFormLayout<AddressType>({
		definition: AddressDefinition(),
		value: user?.address || {},
		onChange: (value) => {
			setUser((x) => {
				x.address = value
				return { ...x }
			})
		},
	})
	const changePasswordFormLayout = useFormLayout<ChangePasswordType>({
		definition: ChangePasswordDefinition(),
		value: changePassword,
		onChange: setChangePassword,
	})

	return (
		<div className={style.myUserPage}>
			<div className={style.userForm}>
				<header className={style.header}>
					<h1 id="myData">Meus dados</h1>
				</header>
				<div className={style.formContent}>
					{userFormLayout.getField('picture')}
					{userFormLayout.getField('full_name')}
					{userFormLayout.getField('email')}
					{userFormLayout.getField('birthday')}
					{userFormLayout.getField('phone')}
					{userFormLayout.getField('error')}
				</div>
				<header className={style.header}>
					<h3 id="address">Endereço</h3>
				</header>
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
				<Button
					leftIcon="save"
					onClick={() => {
						userFormLayout.setErrors(null)
						addressFormLayout.setErrors(null)
						setLoading(true)
						axios
							.put('user', user, {
								headers: {
									authorization: `Baerer ${localStorage.getItem('auth_token')}`,
								},
							})
							.then((response) => {
								setCurrentUser(response.data)
								setUser(response.data)
								setMessage({
									header: 'Dados salvos com sucesso',
									content: 'Seus dados foram salvos com sucesso',
									type: 'confirm',
								})
							})
							.catch((error) => {
								userFormLayout.setErrors(
									ErrorUtils.convertErrors(error.response.data.user)
								)
								addressFormLayout.setErrors(
									ErrorUtils.convertErrors(error.response.data?.address)
								)
							})
							.finally(() => {
								setLoading(false)
							})
					}}
				>
					Salvar
				</Button>
				<header className={style.header}>
					<h3 id="changePassword">Alteração de Senha</h3>
				</header>
				<div className={style.formContent}>
					{changePasswordFormLayout.getField('old_password')}
					{changePasswordFormLayout.getField('new_password')}
					{changePasswordFormLayout.getField('new_password_confirm')}
					{changePasswordFormLayout.getField('error')}
				</div>
				<Button
					leftIcon="save"
					onClick={() => {
						changePasswordFormLayout.setErrors(null)
						setLoading(true)
						axios
							.post('user/changePassword', changePassword, {
								headers: {
									authorization: `Baerer ${localStorage.getItem('auth_token')}`,
								},
							})
							.then((response) => {
								setCurrentUser(response.data)
								setUser(response.data)
								setChangePassword({
									old_password: '',
									new_password: '',
									new_password_confirm: '',
								})
							})
							.catch((error) => {
								changePasswordFormLayout.setErrors(
									ErrorUtils.convertErrors(error.response.data)
								)
							})
							.finally(() => {
								setLoading(false)
							})
					}}
				>
					Alterar Senha Atual
				</Button>
			</div>
		</div>
	)
}
