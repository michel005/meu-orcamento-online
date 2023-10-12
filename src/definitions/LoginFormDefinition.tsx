import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const LoginFormDefinition = (): useFormLayoutDefinitionType => {
	return {
		user_name: {
			label: 'Nome de Usuário',
			rightSide: <ButtonGhost leftIcon="verified_user" disabled={true} />,
		},
		password: {
			label: 'Senha de Acesso',
			type: 'password',
			rightSide: <ButtonGhost leftIcon="password">Recuperar</ButtonGhost>,
		},
		remember_me: {
			label: 'Lembrar meu acesso',
			type: 'checkbox',
		},
	}
}
