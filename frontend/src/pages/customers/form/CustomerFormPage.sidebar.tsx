import React from 'react'
import { useData } from '../../../hooks/useData'
import { Customer } from '../../../types/Entities.type'
import { DivColumn } from '../../../components/DivColumn'
import { Label } from '../../../components/Label.style'

export const CustomerFormPageSidebar = () => {
	const formData = useData<Customer>('customerForm', {})

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
		</>
	)
}
