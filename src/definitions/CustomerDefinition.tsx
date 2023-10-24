import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'
import { CustomerType } from '../types/AllTypes'
import { StringUtils } from '../utils/StringUtils'

export const CustomerDefinition = (value: CustomerType): useFormLayoutDefinitionType => {
	return {
		picture: {
			label: 'Imagem do Cliente',
			leftSide: <ButtonGhost leftIcon="photo" disabled={true} />,
			type: 'file',
			placeholder: value?.name
				? StringUtils.initialLetters(value.name || '').toUpperCase()
				: '',
			size: '200px',
		},
		name: {
			label: 'Nome Completo',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
		},
		created: {
			label: 'Cadastrado',
			leftSide: <ButtonGhost leftIcon="calendar_month" disabled={true} />,
			disabled: true,
		},
		updated: {
			label: 'Ultima Alteração',
			leftSide: <ButtonGhost leftIcon="calendar_month" disabled={true} />,
			disabled: true,
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
		person_type: {
			label: 'Tipo de Pessoa',
			options: [
				['PF', 'Pessoa Física'],
				['PJ', 'Pessoa Jurídica'],
			],
			type: 'select',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
		},
		document_type: {
			label: 'Tipo de Documento',
			options: [
				['RG', 'RG'],
				['CPF', 'CPF'],
				['CNPJ', 'CNPJ'],
			],
			type: 'select',
			leftSide: <ButtonGhost leftIcon="cards" disabled={true} />,
		},
		document_number: {
			label: 'Número de Documento',
			leftSide: <ButtonGhost leftIcon="cards" disabled={true} />,
		},
	}
}
