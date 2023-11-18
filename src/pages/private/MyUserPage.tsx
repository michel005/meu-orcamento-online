import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../contexts/SessionContext'
import style from './MyUserPage.module.scss'
import { useFormLayout } from '../../hooks/useFormLayout'
import { AddressType, ChangePasswordType, UserType } from '../../types/AllTypes'
import { ChangeUserDefinition } from '../../definitions/ChangeUserDefinition'
import { Button, ButtonWhite } from '../../components/Button'
import axios from 'axios'
import { ErrorUtils } from '../../utils/ErrorUtils'
import { ChangePasswordDefinition } from '../../definitions/ChangePasswordDefinition'
import { Icon } from '../../components/Icon'
import { ConfigContext } from '../../contexts/ConfigContext'
import { UserPicture } from '../../components/UserPicture'
import { AddressDefinition } from '../../definitions/AddressDefinition'

export const MyUserPage = () => {
	const { setLoading, setMessage } = useContext(ConfigContext)
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const [user, setUser] = useState<{
		user: UserType
		address: AddressType
	}>({
		user: { ...currentUser.user },
		address: { ...currentUser.address },
	})
	const [changePassword, setChangePassword] = useState<ChangePasswordType>({
		old_password: '',
		new_password: '',
		new_password_confirm: '',
	})
	const userFormLayout = useFormLayout<UserType>({
		definition: ChangeUserDefinition(),
		value: user.user,
		onChange: (x) => {
			setUser((y) => {
				y.user = { ...x }
				return { ...y }
			})
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
			<div className={style.userInfoSidebar}>
				<UserPicture
					className={style.userPicture}
					picture={currentUser.user.picture}
					name={currentUser.user.full_name}
					type="square"
					size="270px"
					randomId={Math.random()}
				/>
				<div className={style.sidebarInfo}>
					<h3>{currentUser.user.full_name}</h3>
					<p>
						<Icon icon="mail" />
						{currentUser.user.email}
					</p>
					{currentUser.user?.birthday && (
						<p>
							<Icon icon="calendar_month" />
							{currentUser.user?.birthday}
						</p>
					)}
					<div className={style.separator} style={{ flexGrow: 1 }} />
					<ButtonWhite
						onClick={() => {
							document.location.hash = '#myData'
						}}
					>
						Meus Dados
					</ButtonWhite>
					<ButtonWhite
						onClick={() => {
							document.location.hash = '#address'
						}}
					>
						Endereço
					</ButtonWhite>
					<ButtonWhite
						onClick={() => {
							document.location.hash = '#changePassword'
						}}
					>
						Alterar Senha
					</ButtonWhite>
				</div>
			</div>
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
								setUser({
									user: { ...response.data.user },
									address: { ...response.data.address },
								})
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
								setUser({
									user: { ...response.data.user },
									address: { ...response.data.address },
								})
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
