import React from 'react'
import style from './BudgetsPage.module.scss'
import budgetStatus from '../../copyDeck/BudgetStatus.json'
import { Table } from '../../components/table/Table'
import { useForm } from '../../hooks/useForm'
import { Budget, Customer } from '../../types/Entities.type'
import { useData } from '../../hooks/useData'
import { useDatabase } from '../../hooks/useDatabase'
import { DateUtils } from '../../utils/DateUtils'
import { useNavigate } from 'react-router-dom'

export type BudgetFilterType = {
	date?: string
	quickSearch?: string
	customerId?: number
}

export const BudgetsPage = () => {
	const databaseBudget = useDatabase<Budget>('budget')
	const databaseCustomer = useDatabase<Customer>('customer')
	const formData = useData<Budget>('budgetForm')
	const filterData = useData<BudgetFilterType>('budgetFilter', {})
	const form = useForm<BudgetFilterType>({
		definition: {
			date: {
				label: 'Filtro por Data',
				type: 'date',
			},
			quickSearch: {
				label: 'Filtro Rápido',
				placeholder: 'Produto, título ou qualquer parte do orçamento',
				type: 'text',
			},
		},
		value: filterData.data,
		onChange: filterData.setData,
	})
	const navigate = useNavigate()

	return (
		<div className={style.budgetsPage}>
			<div className={style.filters}>
				{form.date}
				<div className={style.fullWidth}>{form.quickSearch}</div>
			</div>
			<Table
				header={{
					date: {
						label: 'Data',
						width: '150px',
					},
					title: {
						label: 'Orçamento',
						valueModifier: (row) => (
							<a
								onClick={() => {
									formData.setData(row)
									navigate('/budgets/form')
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
								.map((x: any) => x.price)
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
							!filterData.data.customerId ||
							budget.customerId === filterData.data.customerId
					)
					.filter(
						(budget) => !filterData.data.date || budget.date === filterData.data.date
					)
					.filter(
						(budget) =>
							!filterData.data.quickSearch ||
							JSON.stringify(budget).indexOf(filterData.data.quickSearch) !== -1
					)}
			/>
		</div>
	)
}
