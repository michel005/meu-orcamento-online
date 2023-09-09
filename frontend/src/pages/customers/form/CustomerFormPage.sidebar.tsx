import React from 'react'
import { useData } from '../../../hooks/useData'
import { Customer } from '../../../types/Entities.type'
import { DivColumn } from '../../../components/DivColumn'
import { Toggle } from '../../../components/input/Toggle'
import { Label } from '../../../components/Label.style'

export const CustomerFormPageSidebar = () => {
	const formData = useData<Customer>('customerForm', {
		active: true,
	})

	return (
		<>
			{formData.data.created && (
				<DivColumn style={{ gap: '4px' }}>
					<Label>Data de Cadastro</Label>
					{formData.data.created}
				</DivColumn>
			)}
			{formData.data.updated && (
				<DivColumn style={{ gap: '4px' }}>
					<Label>Data de Alteração</Label>
					{formData.data.updated}
				</DivColumn>
			)}
			<div style={{ flexGrow: 1 }} />
			<Label>Indicadores</Label>
			<Toggle
				label="Cliente Ativo"
				disabled={!formData.data?.id}
				value={formData.data?.active}
				onChange={(value) => {
					formData.data.active = value
					formData.setDataProp('value', formData.data)
				}}
			/>
		</>
	)
}
