import React, { useContext, useEffect, useState } from 'react'
import style from './BudgetFormPage.module.scss'
import budgetStatus from '../../../copyDeck/BudgetStatus.json'
import { useData } from '../../../hooks/useData'
import { Budget, Customer, Service } from '../../../types/Entities.type'
import { useForm } from '../../../hooks/useForm'
import { InputGroup } from '../../../components/input/InputGroup'
import { useDatabase } from '../../../hooks/useDatabase'
import { useNavigate, useParams } from 'react-router-dom'
import { DivRow } from '../../../components/DivRow'
import { DivColumn } from '../../../components/DivColumn'
import { Table } from '../../../components/table/Table'
import { BudgetFormServiceModal } from './BudgetFormServiceModal'
import { Label } from '../../../components/Label.style'
import { ButtonGroup } from '../../../components/button/ButtonGroup'
import { Button } from '../../../components/button/Button'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { DateUtils } from '../../../utils/DateUtils'
import { StickyButtonGroup } from '../../../components/button/StickyButtonGroup'
import { useMessage } from '../../../hooks/useMessage'

export const BudgetFormPage = () => {
	const { status } = useContext(ConfigContext)
	const { showQuestion } = useMessage()
	const { budgetId } = useParams()
	const [loaded, setLoaded] = useState<boolean>(false)
	const formModalData = useData<Service | null>('budgetServiceModal', null)
	const formData = useData<Budget>('budgetForm', {
		date: DateUtils.dateToString(new Date()),
		status: 'pending',
	})
	const databaseBudget = useDatabase<Budget>('budget')
	const databaseCustomer = useDatabase<Customer>('customer')
	const { fields, validate } = useForm<Budget>({
		definition: {
			customerId: {
				type: 'select',
				options: [
					{ id: null, name: 'Nenhum cliente selecionado' },
					...databaseCustomer.data,
				],
				idModifier: (row) => row.id,
				valueModifier: (row) => row.id,
				labelModifier: (row) => row.name,
			},
			title: {
				label: 'Título',
				type: 'text',
			},
			description: {
				label: 'Descrição',
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
		},
		value: formData.data,
		onChange: formData.setData,
		validate: (value, errors) => {
			if (!value) {
				value = {}
			}
			if (!value.title) {
				errors.set('title', 'Título não informado')
			}
			if (!value.description) {
				errors.set('description', 'Descrição não informada')
			}
		},
	})
	const customer = formData.data?.customerId
		? databaseCustomer.findById(formData.data?.customerId)
		: undefined
	const address = Object.keys(customer?.address || {}).map(
		(x) => (customer?.address as any)?.[x] || ''
	)
	const navigate = useNavigate()

	useEffect(() => {
		if (!loaded && status.database) {
			setLoaded(true)
			if (budgetId) {
				const find = databaseBudget.findById(parseFloat('0.' + budgetId))
				if (find) {
					formData.setData(find)
				}
			}
		}
	}, [loaded, status])

	return (
		<div className={style.budgetFormPage}>
			<InputGroup
				icon="person"
				title="Cliente"
				subTitle="Pessoa no qual esse orçamento sera direcionado."
			>
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
				icon="description"
				title="Dados Principais"
				subTitle="Estas são as informações principais na hora de identificar seu orçamento."
			>
				{fields.title}
				{fields.description}
				{fields.status}
			</InputGroup>
			<InputGroup
				icon="list_alt"
				title="Produtos e Serviços"
				subTitle={
					<DivColumn>
						<span>Todos os produtos e serviços inclusos neste orçamento.</span>
						<ButtonGroup>
							<Button
								leftIcon="add"
								onClick={() => {
									formModalData.setData({
										amount: 1,
									})
								}}
							>
								Novo Produto / Serviço
							</Button>
						</ButtonGroup>
					</DivColumn>
				}
			>
				<div className={style.tableWrapper}>
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
							amount: {
								alignment: 'center',
								label: 'Quantidade',
							},
							price: {
								alignment: 'right',
								label: 'Valor',
								type: 'currency',
							},
							sum: {
								alignment: 'right',
								label: 'Total',
								type: 'currency',
								valueModifier: (row) => row.amount * row.price,
							},
						}}
						value={formData.data?.services || []}
					/>
				</div>
			</InputGroup>
			<StickyButtonGroup>
				<Button
					leftIcon="save"
					variation="primary"
					onClick={() => {
						if (!formData.data?.id) {
							databaseBudget.create(formData.data)
						} else {
							databaseBudget.update(formData.data?.id, formData.data)
						}
						formData.setData(null)
						navigate('/budgets')
					}}
				>
					Salvar
				</Button>
				{formData.data?.id && (
					<Button
						leftIcon="delete"
						variation="secondary"
						onClick={() => {
							showQuestion(
								'Deseja realmente excluir este orçamento?',
								'Esta operação não podera ser revertida.',
								() => {
									databaseBudget.remove(formData.data?.id as number)
									formData.setData(null)
									navigate('/budgets')
								}
							)
						}}
					>
						Excluir
					</Button>
				)}
				<Button
					leftIcon="keyboard_return"
					variation="secondary"
					onClick={() => {
						formData.setData(null)
						navigate('/budgets')
					}}
				>
					Voltar
				</Button>
			</StickyButtonGroup>
			{formModalData.data && <BudgetFormServiceModal />}
		</div>
	)
}
