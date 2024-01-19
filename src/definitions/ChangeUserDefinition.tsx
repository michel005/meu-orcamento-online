import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'
import { UserType } from '../types/AllTypes'

export const ChangeUserDefinition = (user: UserType): useFormLayoutDefinitionType => {
	return {
		picture: {
			label: 'Imagem de Usuário',
			placeholder: 'Buscar Imagem',
			type: 'file',
			size: '350px',
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
			disabled: true,
		},
		birthday: {
			label: 'Data de Nascimento',
			type: 'date',
		},
		person_type: {
			label: 'Tipo de Pessoa',
			optionsPosition: 'top',
			options: [
				['PF', 'Pessoa Física'],
				['PJ', 'Pessoa Jurídica'],
			],
			type: 'select',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
			placeholder: 'PF / PJ',
		},
		document_type: {
			label: 'Tipo de Documento',
			optionsPosition: 'top',
			options: [
				['RG', 'RG'],
				['CPF', 'CPF'],
				['CNPJ', 'CNPJ'],
			],
			type: 'select',
			leftSide: <ButtonGhost leftIcon="cards" disabled={true} />,
			placeholder: 'RG / CPF / CNPJ',
		},
		document_number: {
			label: 'Número de Documento',
			leftSide: <ButtonGhost leftIcon="cards" disabled={true} />,
			placeholder: 'Seguir o formato do tipo de documento selecionado',
			mask: user.document_type as any,
		},
		password: {
			label: 'Senha de Acesso',
			type: 'password',
			leftSide: <ButtonGhost leftIcon="password" disabled={true} />,
		},
		phone: {
			label: 'Telefone',
			leftSide: <ButtonGhost leftIcon="phonelink_ring" disabled={true} />,
		},
	}
}
