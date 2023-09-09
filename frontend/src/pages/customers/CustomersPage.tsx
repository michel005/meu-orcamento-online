import React from 'react'
import personType from '../../copyDeck/PersonType.json'
import style from './CustomersPage.module.scss'
import { Table } from '../../components/table/Table'
import { useData } from '../../hooks/useData'
import { Customer } from '../../types/Entities.type'
import { useDatabase } from '../../hooks/useDatabase'
import { useNavigate } from 'react-router-dom'
import { DivColumn } from '../../components/DivColumn'
import { DivRow } from '../../components/DivRow'

export type CustomerFilterType = {
	quickSearch?: string
	personType?: string | null
	status?: boolean | null
}

export const CustomersPage = () => {
	const database = useDatabase<Customer>('customer')
	const filterData = useData<CustomerFilterType>('customerFilter', {})
	const formData = useData<Customer>('customerForm')
	const navigate = useNavigate()

	return (
		<div className={style.customersPage}>
			<Table
				header={{
					name: {
						label: 'Nome',
						valueModifier: (row) => (
							<DivRow>
								<img
									src={
										row.picture ||
										'https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg'
									}
								/>
								<DivColumn style={{ gap: '4px' }}>
									<a
										onClick={() => {
											formData.setData(row)
											navigate(
												`/customers/form/${row.id.toString().split('.')[1]}`
											)
										}}
									>
										{row.name || 'Sem nome'}
									</a>
									<small>{row.email || 'Sem e-mail'}</small>
								</DivColumn>
							</DivRow>
						),
					},
					personType: {
						label: 'Tipo de Pessoa',
						valueModifier: (row) =>
							personType?.[row.personType as keyof typeof personType] || (
								<span style={{ color: '#ddd' }}>Não Informado</span>
							),
					},
					active: {
						alignment: 'right',
						label: 'Ativo',
						valueModifier: (row) => (row.active ? 'Sim' : 'Não'),
						width: '100px',
					},
				}}
				value={database.data
					.filter(
						(customer) =>
							!filterData.data.personType ||
							filterData.data.personType === customer.personType
					)
					.filter(
						(customer) =>
							filterData.data.status === null ||
							filterData.data.status === undefined ||
							filterData.data.status === customer.active
					)
					.filter(
						(customer) =>
							customer.name
								?.toUpperCase()
								.indexOf(filterData.data?.quickSearch?.toUpperCase() || '') !==
								-1 ||
							customer.email
								?.toUpperCase()
								.indexOf(filterData.data?.quickSearch?.toUpperCase() || '') !== -1
					)}
			/>
		</div>
	)
}
