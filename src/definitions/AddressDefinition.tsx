import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const AddressDefinition = (): useFormLayoutDefinitionType => {
	return {
		zip_code: {
			label: 'CEP',
			leftSide: <ButtonGhost leftIcon="streetview" disabled={true} />,
		},
		street_number: {
			label: 'Número',
			leftSide: <ButtonGhost leftIcon="numbers" disabled={true} />,
		},
		street_name: {
			label: 'Nome da Rua',
			leftSide: <ButtonGhost leftIcon="pin" disabled={true} />,
		},
		complement: {
			label: 'Complemento',
			leftSide: <ButtonGhost leftIcon="document_scanner" disabled={true} />,
		},
		city: {
			label: 'Cidade',
			leftSide: <ButtonGhost leftIcon="map" disabled={true} />,
		},
		state: {
			label: 'Estado',
			leftSide: <ButtonGhost leftIcon="map" disabled={true} />,
		},
		country: {
			label: 'País',
			leftSide: <ButtonGhost leftIcon="map" disabled={true} />,
		},
	}
}
