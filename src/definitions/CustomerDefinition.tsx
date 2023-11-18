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
			pictureName: value?.full_name,
			size: '200px',
		},
		full_name: {
			label: 'Nome Completo',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
			placeholder: 'Ex: João da Silva',
		},
		email: {
			label: 'E-mail',
			leftSide: <ButtonGhost leftIcon="mail" disabled={true} />,
			placeholder: 'Ex: joaosilva@email.com',
		},
		birthday: {
			label: 'Data de Nascimento',
			type: 'date',
			leftSide: <ButtonGhost leftIcon="calendar_month" disabled={true} />,
			placeholder: 'Ex: 01/01/1999',
		},
		phone: {
			label: 'Telefone',
			leftSide: <ButtonGhost leftIcon="phonelink_ring" disabled={true} />,
			placeholder: 'Ex: (99) 99999-9999',
		},
		person_type: {
			label: 'Tipo de Pessoa',
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
			options:
				value?.person_type === 'PF'
					? [
							['RG', 'RG'],
							['CPF', 'CPF'],
					  ]
					: value?.person_type === 'PJ'
					? [['CNPJ', 'CNPJ']]
					: [
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
		},
	}
}
