import React from 'react'
import style from './FormTab.module.scss'
import { InputGroup } from '../../../../components/input/InputGroup'
import { DivRow } from '../../../../components/DivRow'
import { DivColumn } from '../../../../components/DivColumn'
import { ButtonGroup } from '../../../../components/button/ButtonGroup'
import { Button } from '../../../../components/button/Button'
import { Table } from '../../../../components/table/Table'
import { StickyButtonGroup } from '../../../../components/button/StickyButtonGroup'
import { useMessage } from '../../../../hooks/useMessage'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../../hooks/useData'
import { Budget, Customer, Service } from '../../../../types/Entities.type'
import { DateUtils } from '../../../../utils/DateUtils'
import { useDatabase } from '../../../../hooks/useDatabase'
import { useForm } from '../../../../hooks/useForm'
import budgetStatus from '../../../../copyDeck/BudgetStatus.json'
import { NumberUtils } from '../../../../utils/NumberUtils'
import { useModal } from '../../../../hooks/useModal'
import { SelectCustomerModalType } from '../../../customers/modal/SelectCustomerModal.type'

export const FormTab = () => {
	const { showQuestion } = useMessage()
	const { showModal } = useModal<SelectCustomerModalType>('selectCustomer')
	const formModalData = useData<Service | null>('budgetServiceModal', null)
	const formData = useData<Budget>('budgetForm', {
		date: DateUtils.dateToString(new Date()),
		status: 'pending',
	})
	const databaseCustomer = useDatabase<Customer>('customer')
	const databaseBudget = useDatabase<Budget>('budget')
	const { fields } = useForm<Budget>({
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
	const navigate = useNavigate()

	return (
		<>
			<InputGroup icon="person" title="Cliente">
				<DivRow className={style.customerInfo}>
					<img
						src={
							customer?.picture ||
							'https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg'
						}
					/>
					{customer && (
						<DivColumn className={style.customerInfoDetails} style={{ gap: '4px' }}>
							<h1>{customer?.name}</h1>
							{customer?.email && <p>{customer?.email}</p>}
							{customer?.phone && <p>{customer?.phone}</p>}
							<a
								onClick={() => {
									showModal({
										showModal: true,
										quickSearch: '',
										whenSelectionChange: (selectedCustomer) => {
											formData.setDataProp('customerId', selectedCustomer.id)
										},
									})
								}}
							>
								Alterar Cliente
							</a>
						</DivColumn>
					)}
					{!customer && (
						<a
							onClick={() => {
								showModal({
									showModal: true,
									quickSearch: '',
									whenSelectionChange: (selectedCustomer) => {
										formData.setDataProp('customerId', selectedCustomer.id)
									},
								})
							}}
						>
							Selecionar Cliente
						</a>
					)}
				</DivRow>
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
				subTitle="Todos os produtos e serviços inclusos neste orçamento."
			>
				<Table<
					Service & {
						sum?: any
					}
				>
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
							valueModifier: (row) => (row.amount || 0) * (row.price || 0),
						},
					}}
					footer={
						<tr>
							<th colSpan={3} data-alignment="left">
								Total Geral
							</th>
							<th data-alignment="right">
								{NumberUtils.numberToCurrency(
									(formData.data?.services || [])
										.map((row) => (row.amount || 0) * (row.price || 0))
										.reduce((x, y) => x + y, 0)
								)}
							</th>
						</tr>
					}
					pagination={false}
					value={formData.data?.services || []}
				/>
			</InputGroup>
		</>
	)
}
