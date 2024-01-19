import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'
import { CustomerType, UserType } from '../types/AllTypes'

export const CustomerDefinition = (value: CustomerType): useFormLayoutDefinitionType => {
	return {
		picture: {
			label: 'Imagem do Cliente',
			leftSide: <ButtonGhost leftIcon="photo" disabled={true} />,
			type: 'file',
			pictureName: value?.full_name,
			placeholder: 'Seleione uma imagem',
			pictureType: 'square',
			size: '320px',
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
			placeholder: 'Ex: 01/01/1999',
		},
		phone: {
			label: 'Telefone',
			leftSide: <ButtonGhost leftIcon="phonelink_ring" disabled={true} />,
			placeholder: 'Ex: (99) 99999-9999',
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
			mask: value.document_type as any,
		},
	}
}
