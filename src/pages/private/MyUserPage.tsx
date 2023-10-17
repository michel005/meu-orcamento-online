import React, { useContext, useState } from 'react'
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
	const [user, setUser] = useState<UserType>({ ...currentUser })
	const [changePassword, setChangePassword] = useState<ChangePasswordType>({
		old_password: '',
		new_password: '',
		new_password_confirm: '',
	})
	const { fields, setErrors } = useFormLayout<UserType>({
		definition: ChangeUserDefinition(),
		value: user,
		onChange: setUser,
	})
	const { fields: addressFields, setErrors: setAddressErrors } = useFormLayout<AddressType>({
		definition: AddressDefinition(),
		value: user?.address || {},
		onChange: (value) => {
			setUser((x) => {
				x.address = value
				return { ...x }
			})
		},
	})
	const { fields: fieldsChangePassword, setErrors: setErrorsChangePassword } =
		useFormLayout<ChangePasswordType>({
			definition: ChangePasswordDefinition(),
			value: changePassword,
			onChange: setChangePassword,
		})

	return (
		<div className={style.myUserPage}>
			<div className={style.userInfoSidebar}>
				<UserPicture
					className={style.userPicture}
					picture={currentUser.picture}
					name={currentUser.full_name}
					type="square"
					size="270px"
				/>
				<div className={style.sidebarInfo}>
					<h3>{currentUser.full_name}</h3>
					<p>
						<Icon icon="mail" />
						{currentUser.email}
					</p>
					<p>
						<Icon icon="calendar_month" />
						{currentUser?.birthday}
					</p>
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
					{fields.picture}
					{fields.full_name}
					{fields.email}
					{fields.birthday}
					{fields.phone}
					{fields.error}
				</div>
				<header className={style.header}>
					<h3 id="address">Endereço</h3>
				</header>
				<div className={style.formContent}>
					{addressFields.zip_code}
					{addressFields.street_name}
					{addressFields.street_number}
					{addressFields.complement}
					{addressFields.city}
					{addressFields.state}
					{addressFields.country}
					{addressFields.error}
				</div>
				<Button
					leftIcon="save"
					onClick={() => {
						setErrors(null)
						setAddressErrors(null)
						setLoading(true)
						axios
							.put('user', user, {
								headers: {
									auth_token: localStorage.getItem('auth_token'),
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
								setErrors(ErrorUtils.convertErrors(error.response.data))
								setAddressErrors(
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
					{fieldsChangePassword.old_password}
					{fieldsChangePassword.new_password}
					{fieldsChangePassword.new_password_confirm}
					{fieldsChangePassword.error}
				</div>
				<Button
					leftIcon="save"
					onClick={() => {
						setErrorsChangePassword(null)
						setLoading(true)
						axios
							.post('user/changePassword', changePassword, {
								headers: {
									auth_token: localStorage.getItem('auth_token'),
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
								setErrorsChangePassword(
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
