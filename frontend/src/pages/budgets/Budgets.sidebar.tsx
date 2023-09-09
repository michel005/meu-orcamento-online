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
import { useForm } from '../../hooks/useForm'
import { SortUtils } from '../../utils/SortUtils'
import { DivColumn } from '../../components/DivColumn'

export const BudgetsSidebar = () => {
	const formData = useData<Budget>('budgetForm')
	const customerDatabase = useDatabase<Customer>('customer')
	const filterData = useData<BudgetFilterType>('budgetFilter', {})
	const { fields: form } = useForm<BudgetFilterType>({
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

	const customerFilterCollection = useMemo(() => {
		let result: any[] = []
		result.push(
			<Button
				leftIcon="group"
				style={{ width: '100%' }}
				onClick={() => {
					filterData.setDataProp('customerId', null)
				}}
				variation={!filterData.data.customerId ? 'primary' : 'sidebar'}
			>
				Todos os Clientes
			</Button>
		)
		customerDatabase.data
			.sort((x, y) => SortUtils.sort(x, y, 'name'))
			.forEach((customer) => {
				result.push(
					<Button
						key={customer.id}
						leftIcon="person"
						style={{ width: '100%' }}
						onClick={() => {
							filterData.setDataProp('customerId', customer.id)
						}}
						variation={
							filterData.data.customerId === customer.id ? 'primary' : 'sidebar'
						}
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
						status: 'pending',
					})
					navigate('/budgets/newForm')
				}}
			>
				Novo Orçamento
			</Button>
			<DivColumn style={{ width: '100%' }}>
				{form.quickSearch}
				{form.date}
			</DivColumn>
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
