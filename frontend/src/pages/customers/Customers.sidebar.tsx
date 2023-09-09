import React from 'react'
import { Button } from '../../components/button/Button'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../hooks/useData'
import { Customer } from '../../types/Entities.type'
import { useForm } from '../../hooks/useForm'
import { CustomerFilterType } from './CustomersPage'
import { ShowMore } from '../../components/ShowMore'
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
					['PF', 'Pessoa Física'],
					['PJ', 'Pessoa Jurídica'],
				],
				nullableLabel: 'Todos',
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
			<Button
				leftIcon="add"
				variation="sidebar"
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
			</DivColumn>
			<ShowMore
				label="Filtro por Tipo de Pessoa"
				options={[
					<Button
						leftIcon="group"
						style={{ width: '100%' }}
						variation={!filterData.data.personType ? 'primary' : 'sidebar'}
						onClick={() => {
							filterData.setDataProp('personType', null)
						}}
					>
						Todos
					</Button>,
					<Button
						leftIcon="person"
						style={{ width: '100%' }}
						variation={filterData.data.personType === 'PF' ? 'primary' : 'sidebar'}
						onClick={() => {
							filterData.setDataProp('personType', 'PF')
						}}
					>
						Pessoa Física
					</Button>,
					<Button
						leftIcon="person"
						style={{ width: '100%' }}
						variation={filterData.data.personType === 'PJ' ? 'primary' : 'sidebar'}
						onClick={() => {
							filterData.setDataProp('personType', 'PJ')
						}}
					>
						Pessoa Jurídica
					</Button>,
				]}
				variation="ghost"
				visibleItems={3}
			/>
			<ShowMore
				label="Filtro por Situação"
				options={[
					<Button
						leftIcon="group"
						style={{ width: '100%' }}
						variation={
							filterData.data.status === null || filterData.data.status === undefined
								? 'primary'
								: 'sidebar'
						}
						onClick={() => {
							filterData.setDataProp('status', null)
						}}
					>
						Todos
					</Button>,
					<Button
						leftIcon="person_add"
						style={{ width: '100%' }}
						variation={filterData.data.status === true ? 'primary' : 'sidebar'}
						onClick={() => {
							filterData.setDataProp('status', true)
						}}
					>
						Ativos
					</Button>,
					<Button
						leftIcon="person_cancel"
						style={{ width: '100%' }}
						variation={filterData.data.status === false ? 'primary' : 'sidebar'}
						onClick={() => {
							filterData.setDataProp('status', false)
						}}
					>
						Inativos
					</Button>,
				]}
				variation="ghost"
				visibleItems={3}
			/>
		</>
	)
}
