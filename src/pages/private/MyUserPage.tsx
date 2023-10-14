import React, { useContext, useState } from 'react'
import { SessionContext } from '../../contexts/SessionContext'
import style from './MyUserPage.module.scss'
import { useFormLayout } from '../../hooks/useFormLayout'
import { UserType } from '../../types/AllTypes'
import { ChangeUserDefinition } from '../../definitions/ChangeUserDefinition'
import { Button } from '../../components/Button'
import axios from 'axios'
import { ErrorUtils } from '../../utils/ErrorUtils'

export const MyUserPage = () => {
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const [user, setUser] = useState({ ...currentUser })
	const { fields, setErrors } = useFormLayout<UserType>({
		definition: ChangeUserDefinition(),
		value: user,
		onChange: setUser,
	})

	return (
		<div className={style.myUserPage}>
			<header>
				<h1>Meu Usuário</h1>
				<Button
					leftIcon="save"
					onClick={() => {
						setErrors(null)
						axios
							.put('user', user, {
								headers: {
									auth_token: localStorage.getItem('auth_token'),
								},
							})
							.then((response) => {
								setCurrentUser(response.data)
								setUser(response.data)
							})
							.catch((error) => {
								setErrors(ErrorUtils.convertErrors(error.response.data))
							})
					}}
				>
					Salvar
				</Button>
			</header>
			{fields.picture}
			{fields.full_name}
			{fields.email}
			{fields.error}
		</div>
	)
}
