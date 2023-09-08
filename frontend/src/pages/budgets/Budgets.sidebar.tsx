import React, { useMemo } from 'react'
import style from './Budgets.sidebar.module.scss'
import { Button } from '../../components/button/Button'
import { ShowMore } from '../../components/ShowMore'
import { useDatabase } from '../../hooks/useDatabase'
import { Budget, Customer } from '../../types/Entities.type'
import { useData } from '../../hooks/useData'
import { BudgetFilterType } from './BudgetsPage'
import { useNavigate } from 'react-router-dom'
import { DateUtils } from '../../utils/DateUtils'

export const BudgetsSidebar = () => {
	const formData = useData<Budget>('budgetForm')
	const customerDatabase = useDatabase<Customer>('customer')
	const filterData = useData<BudgetFilterType>('budgetFilter', {})

	const customerFilterCollection = useMemo(() => {
		let result: any[] = []
		result.push(
			<Button
				leftIcon="group"
				onClick={() => {
					filterData.setDataProp('customerId', null)
				}}
				variation={!filterData.data.customerId ? 'primary' : 'sidebar'}
			>
				Todos os Clientes
			</Button>
		)
		customerDatabase.data.forEach((customer) => {
			result.push(
				<Button
					key={customer.id}
					leftIcon="person"
					onClick={() => {
						filterData.setDataProp('customerId', customer.id)
					}}
					variation={filterData.data.customerId === customer.id ? 'primary' : 'sidebar'}
				>
					{customer.name}
				</Button>
			)
		})
		return result
	}, [customerDatabase.data, filterData.data])
	const navigate = useNavigate()

	return (
		<div className={style.budgetSidebar}>
			<Button
				leftIcon="add"
				variation="sidebar"
				onClick={() => {
					formData.setData({
						date: DateUtils.dateToString(new Date()),
						title: 'Novo Orçamento',
						status: 'pending',
					})
					navigate('/budgets/form')
				}}
			>
				Novo Orçamento
			</Button>
			<ShowMore
				label="Filtro por Cliente"
				options={customerFilterCollection}
				variation="ghost"
				visibleItems={3}
			/>
			{customerFilterCollection.length === 0 && (
				<span className={style.notFound}>Nenhum Cliente Cadastrado</span>
			)}
		</div>
	)
}
