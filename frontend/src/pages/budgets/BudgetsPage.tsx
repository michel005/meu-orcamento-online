import React from 'react'
import style from './BudgetsPage.module.scss'
import budgetStatus from '../../copyDeck/BudgetStatus.json'
import { Table } from '../../components/table/Table'
import { Budget, Customer } from '../../types/Entities.type'
import { useData } from '../../hooks/useData'
import { useDatabase } from '../../hooks/useDatabase'
import { useNavigate } from 'react-router-dom'

export type BudgetFilterType = {
	date?: string
	quickSearch?: string
	customerId?: number
}

export const BudgetsPage = () => {
	const databaseBudget = useDatabase<Budget>('budget')
	const databaseCustomer = useDatabase<Customer>('customer')
	const filterData = useData<BudgetFilterType>('budgetFilter')
	const navigate = useNavigate()

	return (
		<div className={style.budgetsPage}>
			<Table
				header={{
					created: {
						label: 'Data',
						valueModifier: (row) => row.created.replace(',', '').split(' ')[0],
						width: '150px',
					},
					title: {
						label: 'Orçamento',
						valueModifier: (row) => (
							<a
								onClick={() => {
									navigate(`/budgets/form/${row.id.toString().split('.')[1]}`)
								}}
							>
								{row.title}
							</a>
						),
					},
					customerId: {
						label: 'Cliente',
						valueModifier: (row) => databaseCustomer.findById(row.customerId)?.name,
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
				value={databaseBudget.data
					.filter(
						(budget) =>
							!filterData.data?.customerId ||
							budget.customerId === filterData.data.customerId
					)
					.filter(
						(budget) =>
							!filterData.data?.date || budget.created === filterData.data.date
					)
					.filter(
						(budget) =>
							!filterData.data?.quickSearch ||
							JSON.stringify(budget).indexOf(filterData.data.quickSearch) !== -1
					)}
			/>
		</div>
	)
}
