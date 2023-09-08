import React, { useEffect } from 'react'
import style from './BudgetFormPage.module.scss'
import budgetStatus from '../../../copyDeck/BudgetStatus.json'
import { useData } from '../../../hooks/useData'
import { Budget, Customer, Service } from '../../../types/Entities.type'
import { useForm } from '../../../hooks/useForm'
import { InputGroup } from '../../../components/input/InputGroup'
import { useDatabase } from '../../../hooks/useDatabase'
import { useNavigate } from 'react-router-dom'
import { DivRow } from '../../../components/DivRow'
import { DivColumn } from '../../../components/DivColumn'
import { Table } from '../../../components/table/Table'
import { BudgetFormServiceModal } from './BudgetFormServiceModal'
import { Label } from '../../../components/Label.style'

export const BudgetFormPage = () => {
	const formModalData = useData<Service | null>('budgetServiceModal', null)
	const formData = useData<Budget | null>('budgetForm', null)
	const databaseCustomer = useDatabase<Customer>('customer')
	const fields = useForm<Budget>({
		definition: {
			customerId: {
				type: 'select',
				options: databaseCustomer.data,
				idModifier: (row) => row.id,
				valueModifier: (row) => row.id,
				labelModifier: (row) => row.name,
			},
			date: {
				label: 'Data',
				type: 'date',
			},
			title: {
				label: 'Título',
				type: 'text',
			},
			description: {
				label: 'Título',
				type: 'text',
				textArea: true,
			},
			status: {
				label: 'Situação',
				type: 'select',
				options: Object.keys(budgetStatus),
				idModifier: (row) => row,
				valueModifier: (row) => row,
				labelModifier: (row) => budgetStatus[row as keyof typeof budgetStatus],
			},
			created: {
				label: 'Cadastrado',
				type: 'text',
				disabled: true,
			},
			updated: {
				label: 'Alterado',
				type: 'text',
				disabled: true,
			},
		},
		value: formData.data,
		onChange: formData.setData,
	})
	const navigate = useNavigate()
	const customer = formData.data?.customerId
		? databaseCustomer.findById(formData.data?.customerId)
		: undefined
	const address = Object.keys(customer?.address || {}).map(
		(x) => (customer?.address as any)?.[x] || ''
	)

	useEffect(() => {
		if (!formData.data) {
			navigate('/budgets')
		}
	}, [formData.data])

	return (
		<div className={style.budgetFormPage}>
			<InputGroup title="Cliente" subTitle="Pessoa no qual esse orçamento sera direcionado.">
				{fields.customerId}
				{customer && (
					<DivRow className={style.customerInfo}>
						<img
							src={
								customer?.picture ||
								'https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg'
							}
						/>
						<DivColumn style={{ gap: '4px' }}>
							<h1>{customer?.name}</h1>
							<p>{customer?.email}</p>
							<p>{customer?.phone}</p>
							<Label>Endereço</Label>
							<p>{address.length === 0 ? 'Não Informado' : address.join(', ')}</p>
						</DivColumn>
					</DivRow>
				)}
			</InputGroup>
			<InputGroup
				title="Dados Principais"
				subTitle="Estas são as informações principais na hora de identificar seu orçamento."
			>
				{fields.date}
				{fields.title}
				{fields.description}
				{fields.status}
			</InputGroup>
			<InputGroup
				title="Produtos e Serviços"
				subTitle="Todos os produtos e serviços inclusos neste orçamento."
			>
				<Table
					header={{
						name: {
							label: 'Nome',
							valueModifier: (row, rowIndex) => (
								<DivRow>
									{row.picture && <img src={row.picture} />}
									<a
										style={{ alignSelf: 'center' }}
										onClick={() => {
											formModalData.setData({
												...row,
												id: rowIndex,
											})
										}}
									>
										{row.name}
									</a>
								</DivRow>
							),
						},
						price: {
							alignment: 'right',
							label: 'Valor',
							type: 'currency',
						},
					}}
					value={formData.data?.services || []}
				/>
			</InputGroup>
			<InputGroup
				title="Informações Complementares"
				subTitle="Estas são informações registradas pelo sistema."
			>
				<div className={'row'}>
					{fields.created}
					{fields.updated}
				</div>
			</InputGroup>
			{formModalData.data && <BudgetFormServiceModal />}
		</div>
	)
}
