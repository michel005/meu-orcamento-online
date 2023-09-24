import React from 'react'
import style from '../Page.module.scss'
import budgetStatus from '../../copyDeck/BudgetStatus.json'
import { Table } from '../../components/table/Table'
import { Budget, Customer } from '../../types/Entities.type'
import { useData } from '../../hooks/useData'
import { useDatabase } from '../../hooks/useDatabase'
import { useNavigate } from 'react-router-dom'
import { DivRow } from '../../components/DivRow'
import { Button } from '../../components/button/Button'
import { DateUtils } from '../../utils/DateUtils'
import { useForm } from '../../hooks/useForm'

export type BudgetFilterType = {
	date?: string
	quickSearch?: string
	customerId?: number
}

export const BudgetsPage = () => {
	const budgetFormData = useData<Budget>('budgetForm', {})
	const budgetDatabase = useDatabase<Budget>('budget')
	const customerDatabase = useDatabase<Customer>('customer')
	const budgetFilterData = useData<BudgetFilterType>('budgetFilter')
	const { fields: form } = useForm<BudgetFilterType>({
		definition: {
			quickSearch: {
				rightSpace: <Button leftIcon="search" variation="ghost" />,
				placeholder: 'Produto, título ou qualquer parte do orçamento',
				type: 'text',
			},
			date: {
				type: 'date',
			},
		},
		value: budgetFilterData.data,
		onChange: budgetFilterData.setData,
	})
	const navigate = useNavigate()

	return (
		<div className={style.page}>
			<DivRow>
				{form.quickSearch}
				<div style={{ maxWidth: '300px' }}>{form.date}</div>
				<Button
					leftIcon="add"
					onClick={() => {
						budgetFormData.setData({
							date: DateUtils.dateToString(new Date()),
							status: 'pending',
						})
						navigate('/budgets/newForm')
					}}
				>
					Novo Orçamento
				</Button>
			</DivRow>
			<Table<Budget>
				header={{
					created: {
						label: 'Data',
						valueModifier: (row) =>
							row.created && row.created.replace(',', '').split(' ')[0],
						width: '150px',
					},
					title: {
						label: 'Orçamento',
						valueModifier: (row) => (
							<a
								onClick={() => {
									if (row.id) {
										navigate(`/budgets/form/${row.id.toString().split('.')[1]}`)
									}
								}}
							>
								{row.title || 'Orçamento sem título'}
							</a>
						),
					},
					customerId: {
						label: 'Cliente',
						valueModifier: (row) =>
							row.customerId && customerDatabase.findById(row.customerId)?.name,
					},
					amount: {
						alignment: 'right',
						label: 'Valor Total',
						type: 'currency',
						valueModifier: (row) =>
							(row.services || [])
								.map((x: any) => x.amount * x.price)
								.reduce((x: number, y: number) => x + y, 0),
						width: '200px',
					},
					status: {
						alignment: 'right',
						label: 'Situação',
						valueModifier: (row) =>
							budgetStatus[row.status as keyof typeof budgetStatus],
						width: '150px',
					},
				}}
				value={budgetDatabase.data
					.filter(
						(budget) =>
							!budgetFilterData.data?.customerId ||
							budget.customerId === budgetFilterData.data.customerId
					)
					.filter(
						(budget) =>
							!budgetFilterData.data?.date ||
							budget.created === budgetFilterData.data.date
					)
					.filter(
						(budget) =>
							!budgetFilterData.data?.quickSearch ||
							JSON.stringify(budget).indexOf(budgetFilterData.data.quickSearch) !== -1
					)}
			/>
		</div>
	)
}
