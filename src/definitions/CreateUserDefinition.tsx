import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const CreateUserDefinition = (): useFormLayoutDefinitionType => {
	return {
		full_name: {
			label: 'Nome Completo',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
		},
		user_name: {
			label: 'Nome de Usuário',
			leftSide: <ButtonGhost leftIcon="verified_user" disabled={true} />,
		},
		email: {
			label: 'E-mail',
			leftSide: <ButtonGhost leftIcon="mail" disabled={true} />,
		},
		birthday: {
			label: 'Data de Nascimento',
			type: 'date',
			leftSide: <ButtonGhost leftIcon="calendar_month" disabled={true} />,
		},
		phone: {
			label: 'Telefone',
			leftSide: <ButtonGhost leftIcon="phonelink_ring" disabled={true} />,
		},
		password: {
			label: 'Senha de Acesso',
			type: 'password',
			leftSide: <ButtonGhost leftIcon="password" disabled={true} />,
		},
		agree_terms: {
			label: 'Aceitar os termos de uso',
			type: 'checkbox',
		},
	}
}
