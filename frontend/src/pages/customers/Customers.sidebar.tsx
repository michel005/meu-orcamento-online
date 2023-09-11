import React from 'react'
import { Button } from '../../components/button/Button'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../hooks/useData'
import { Customer } from '../../types/Entities.type'
import { useForm } from '../../hooks/useForm'
import { CustomerFilterType } from './CustomersPage'
import { DivColumn } from '../../components/DivColumn'

export const CustomersSidebar = () => {
	const formData = useData<Customer>('customerForm')
	const filterData = useData<CustomerFilterType>('customerFilter', {})
	const { fields } = useForm<CustomerFilterType>({
		definition: {
			quickSearch: {
				label: 'Filtro Rápido',
				placeholder: 'Nome ou e-mail do cliente',
				type: 'text',
			},
			personType: {
				label: 'Tipo de Pessoa',
				type: 'select',
				options: [
					[null, 'Todos'],
					['PF', 'Pessoa Física'],
					['PJ', 'Pessoa Jurídica'],
				],
				idModifier: (row) => row[0],
				labelModifier: (row) => row[1],
				valueModifier: (row) => row[0],
			},
		},
		value: filterData.data,
		onChange: filterData.setData,
	})
	const navigate = useNavigate()

	return (
		<>
			<DivColumn style={{ gap: '4px' }}>
				<h1>Clientes</h1>
				<p>Gerencie seus clientes</p>
			</DivColumn>
			<hr />
			<Button
				leftIcon="add"
				style={{ width: '100%' }}
				onClick={() => {
					formData.setData({
						name: 'Novo Cliente',
						active: true,
					})
					navigate('/customers/newForm')
				}}
			>
				Novo Cliente
			</Button>
			<DivColumn style={{ width: '100%' }}>
				{fields.quickSearch}
				{fields.personType}
				{fields.status}
			</DivColumn>
		</>
	)
}
