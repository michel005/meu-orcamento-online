import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const ChangePasswordDefinition = (): useFormLayoutDefinitionType => {
	return {
		old_password: {
			label: 'Senha Atual',
			type: 'password',
			leftSide: <ButtonGhost leftIcon="password" disabled={true} />,
		},
		new_password: {
			label: 'Senha Nova',
			type: 'password',
			leftSide: <ButtonGhost leftIcon="password" disabled={true} />,
		},
		new_password_confirm: {
			label: 'Senha Nova (Confirmação)',
			type: 'password',
			leftSide: <ButtonGhost leftIcon="password" disabled={true} />,
		},
	}
}
