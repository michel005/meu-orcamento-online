import React from 'react'
import style from '../Page.module.scss'
import personType from '../../copyDeck/PersonType.json'
import { Table } from '../../components/table/Table'
import { useData } from '../../hooks/useData'
import { Customer } from '../../types/Entities.type'
import { useDatabase } from '../../hooks/useDatabase'
import { useNavigate } from 'react-router-dom'
import { DivColumn } from '../../components/DivColumn'
import { DivRow } from '../../components/DivRow'
import { Text } from '../../components/input/Text'
import { Button } from '../../components/button/Button'
import { ButtonOptions } from '../../components/button/ButtonOptions'
import { DateUtils } from '../../utils/DateUtils'

export type CustomerFilterType = {
	quickSearch?: string
	personType?: string | null
	status?: string | null
}

export const CustomersPage = () => {
	const customerDatabase = useDatabase<Customer>('customer')
	const filterCustomerData = useData<CustomerFilterType>('customerFilter', {})
	const navigate = useNavigate()

	return (
		<div className={style.page}>
			<DivRow>
				<Text
					rightSpace={<Button leftIcon="search" variation="ghost" />}
					value={filterCustomerData.data?.quickSearch || null}
					onChange={(value) => {
						filterCustomerData.setDataProp('quickSearch', value)
					}}
					placeholder="Busque por campos do cliente..."
				/>
				<ButtonOptions
					options={{
						ALL: 'Todos',
						PF: 'Pessoa Física',
						PJ: 'Pessoa Jurídica',
					}}
					variation="secondary"
					value={filterCustomerData.data.personType || 'ALL'}
					onChange={(value) => {
						if (value === 'ALL') {
							filterCustomerData.setDataProp('personType', null)
						} else {
							filterCustomerData.setDataProp('personType', value)
						}
					}}
				/>
				<Button
					leftIcon="add"
					onClick={() => {
						navigate('/customers/newForm')
					}}
				>
					Novo Cliente
				</Button>
			</DivRow>
			<Table<Customer>
				header={{
					name: {
						label: 'Nome',
						valueModifier: (row) => (
							<DivRow>
								<img src={row.picture} />
								<DivColumn style={{ gap: '4px' }}>
									<a
										onClick={() => {
											if (row.id) {
												navigate(
													`/customers/form/${
														row.id.toString().split('.')[1]
													}`
												)
											}
										}}
									>
										{row.name || 'Sem nome'}
									</a>
									<small>{row.email || 'Sem e-mail'}</small>
								</DivColumn>
							</DivRow>
						),
					},
					created: {
						label: 'Cliente a',
						valueModifier: (row) =>
							row.created
								? `${DateUtils.daysBetween(
										DateUtils.dateToString(new Date()),
										row.created
								  )} dia(s)`
								: '',
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
				value={customerDatabase.data
					.filter(
						(customer) =>
							!filterCustomerData.data.personType ||
							filterCustomerData.data.personType === customer.personType
					)
					.filter(
						(customer) =>
							customer.name
								?.toUpperCase()
								.indexOf(
									filterCustomerData.data?.quickSearch?.toUpperCase() || ''
								) !== -1 ||
							customer.email
								?.toUpperCase()
								.indexOf(
									filterCustomerData.data?.quickSearch?.toUpperCase() || ''
								) !== -1
					)}
			/>
		</div>
	)
}
