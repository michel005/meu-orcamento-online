import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const LoginFormDefinition = (): useFormLayoutDefinitionType => {
	return {
		user_name: {
			label: 'Usuário / E-mail',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
		},
		password: {
			label: 'Senha de Acesso',
			type: 'password',
			leftSide: <ButtonGhost leftIcon="password" disabled={true} />,
		},
		remember_me: {
			label: 'Lembrar meu acesso',
			type: 'checkbox',
		},
	}
}
