import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const CustomerDefinition = (): useFormLayoutDefinitionType => {
	return {
		picture: {
			label: 'Imagem do Cliente',
			leftSide: <ButtonGhost leftIcon="photo" disabled={true} />,
			type: 'file',
		},
		name: {
			label: 'Nome Completo',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
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
