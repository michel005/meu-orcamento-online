import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const ChangeUserDefinition = (): useFormLayoutDefinitionType => {
	return {
		picture: {
			label: 'Imagem de Usuário',
			leftSide: <ButtonGhost leftIcon="photo" disabled={true} />,
			type: 'file',
		},
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
	}
}
