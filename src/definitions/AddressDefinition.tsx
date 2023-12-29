import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'

export const AddressDefinition = (): useFormLayoutDefinitionType => {
	return {
		zip_code: {
			label: 'CEP',
			leftSide: <ButtonGhost leftIcon="streetview" disabled={true} />,
			placeholder: 'Ex: 99999-999',
		},
		street_number: {
			label: 'Número',
			leftSide: <ButtonGhost leftIcon="numbers" disabled={true} />,
			placeholder: 'Ex: 9999',
		},
		street_name: {
			label: 'Nome da Rua',
			leftSide: <ButtonGhost leftIcon="pin" disabled={true} />,
			placeholder: 'Ex: Joaquim Moleirinho',
		},
		complement: {
			label: 'Complemento',
			leftSide: <ButtonGhost leftIcon="document_scanner" disabled={true} />,
			placeholder: 'Ex: Perto da padaria',
		},
		neighborhood: {
			label: 'Bairro',
			leftSide: <ButtonGhost leftIcon="maps_ugc" disabled={true} />,
			placeholder: 'Ex: Bairro 1',
		},
		city: {
			label: 'Cidade',
			leftSide: <ButtonGhost leftIcon="map" disabled={true} />,
			placeholder: 'Ex: Curitiba',
		},
		state: {
			label: 'Estado',
			leftSide: <ButtonGhost leftIcon="map" disabled={true} />,
			placeholder: 'Ex: Paraná',
		},
		country: {
			label: 'País',
			leftSide: <ButtonGhost leftIcon="map" disabled={true} />,
			placeholder: 'Ex: Brasil',
		},
	}
}
